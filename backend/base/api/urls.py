from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views
from . views import MyTokenObtainPairView, UserView,get_presigned_url,UserFileViewSet

from rest_framework_simplejwt.views import (

    TokenRefreshView,
)
router = DefaultRouter()
router.register(r'files', UserFileViewSet, basename='userfile')
urlpatterns = [
    path('', include(router.urls)),
    path('presigned-url/', get_presigned_url, name='get_presigned_url'),
    path('register-s3-file/', views.register_s3_file, name='register-s3-file'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', UserView.as_view(), name='user'),

]