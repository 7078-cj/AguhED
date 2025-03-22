from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Slides, UserFolder

class UserSerializer(serializers.ModelSerializer):
    class Meta:
       model = User
       fields = ('id', 'username', 'email', 'password','profile')
       extra_kwargs = {'password': {'write_only': True}}
       
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            
        )
        return user

class SlidesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slides
        fields = '__all__'

class UserFolderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    folder = SlidesSerializer(read_only=True)
    
    class Meta:
        model = UserFolder
        fields = '__all__'
    