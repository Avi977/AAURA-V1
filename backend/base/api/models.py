
from django.db import models
from django.contrib.auth import get_user_model

User=get_user_model()

class UserFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='files')
    file = models.FileField(upload_to='user_uploads/')
    filename=models.CharField(max_length=255)
    uploaded_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.filename

