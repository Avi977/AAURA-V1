from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
import os
import uuid
import boto3
from .models import UserFile
from .serializers import UserFileSerializer
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes
from rest_framework.decorators import action
from rest_framework import status



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username


        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(['GET'])
def getRoutes(request):
    routes=[
        'api/token',
        'api/token/refresh',

    ]
    return Response(routes)
class UserView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view

    def get(self, request):
        user = request.user  # This gets the current authenticated user
        user_data = {
            'username': user.username,
            'email': user.email,
            # Add more user details here as needed
        }
        return Response(user_data, status=status.HTTP_200_OK)

class UserFileViewSet(viewsets.ModelViewSet):
    serializer_class = UserFileSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def get_queryset(self):
        return UserFile.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['post'])
    def upload(self, request):
        if 'file' not in request.FILES:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
            
        file_obj = request.FILES['file']
        serializer = self.get_serializer(data={
            'file': file_obj,
            'filename': file_obj.name
        })
        
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def get_presigned_url(request):
    filename = request.data.get('filename')
    content_type = request.data.get('content_type')  # Make sure the name matches here

    
    if not filename or not content_type:
        return Response({'error': 'Filename and content_type are required'}, 
                      status=status.HTTP_400_BAD_REQUEST)
    
    # Generate a unique file key
    unique_filename = f"{uuid.uuid4()}-{filename}"
    key = f"user_uploads/{request.user.id}/{unique_filename}"
    
    # Generate presigned URL
    s3_client = boto3.client(
        's3',
        aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
        region_name=os.environ.get('AWS_S3_REGION_NAME')
    )
    try:
        presigned_url = s3_client.generate_presigned_url(
            ClientMethod='put_object',
            Params={
                'Bucket': os.environ.get('AWS_STORAGE_BUCKET_NAME'),
                'Key': key,
                'ContentType': content_type,
            },
            ExpiresIn=3600,# URL expires in 1 hour
        )
    
        return Response({
            'presigned_url': presigned_url,
            'key': key
        })
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
import logging
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status

# Set up logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def register_s3_file(request):
    """Register a file that was uploaded directly to S3"""
    try:
        key = request.data.get('key')
        filename = request.data.get('filename')
        content_type = request.data.get('content_type', '')  # Optional, default to empty string
        size = request.data.get('size', 0)  # Optional, default to 0
        
        if not key or not filename:
            logger.error("Missing parameters: key or filename")  # Log missing parameters
            return Response({'error': 'File key and filename are required'}, 
                            status=status.HTTP_400_BAD_REQUEST)
        
        # Create file record pointing to S3 object
        user_file = UserFile(
            user=request.user,
            file=key,  # Django-storages will handle this correctly
            filename=filename,
            content_type=content_type,
            size=size
        )
        user_file.save()

        # Log success
        logger.info(f"File registered successfully: {filename} by user {request.user}")

        # Return serialized data
        serializer = UserFileSerializer(user_file)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        logger.exception(f"Error registering file: {str(e)}")
        return Response({'error': 'An error occurred while processing the file.'}, 
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
