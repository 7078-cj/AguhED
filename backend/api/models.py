from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserFolder(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='userFolder')
    folderName = models.CharField(max_length=50)
    
class Slides(models.Model):
    folder = models.ForeignKey(UserFolder,on_delete=models.CASCADE,related_name="folder")
    slides = models.ImageField(default="null.jpg",upload_to='./slides')
    created = models.DateTimeField(auto_now_add=True)
