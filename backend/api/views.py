from django.shortcuts import render
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import Token
from rest_framework import status

import base64
import io
import fitz  # PyMuPDF
from PIL import Image
from django.http import JsonResponse
import logging
logger = logging.getLogger(__name__)
from django.shortcuts import get_object_or_404

import google.generativeai as genai
from google.genai import types

import PIL.Image

from dotenv import load_dotenv
import os

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")



# Create your views here.
# CustomToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializer import UserSerializer, UserFolderSerializer, SlidesSerializer
from django.contrib.auth.models import User
from .models import UserFolder, Slides

# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username'] = user.username
        
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    
@api_view(['POST'])
def registerUser(request):
     if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            
            return Response({'message': 'User registered successfully'})
        return Response(serializer.errors, status=400)
    
@api_view(['GET'])
def userAllFolder(request,pk):
    user = User.objects.get(id=pk)
    userFolder = user.userFolder.all()
    serializer = UserFolderSerializer(userFolder,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def userFolder(request,pk):
    userFolder = get_object_or_404(UserFolder, id=pk)
    slides = userFolder.folder.all()
    serializer = SlidesSerializer(slides,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createUserFolder(request,pk):
        print(request.data)

        try:
          
            user = get_object_or_404(User, id=pk)

            # Create a user folder
            folder_name = request.data.get("folderName", "default_folder")
            userFolder = UserFolder.objects.create(user=user, folderName=folder_name)

            return Response({"message": "Folder created successfully!", "folderName": userFolder.folderName}, status=201)

        except Exception as e:
            return Response({"error": str(e)}, status=400)
        
@api_view(['POST'])
def createUserSlides(request, pk):
    try:
        userFolder = UserFolder.objects.get(id=pk)
        images = request.FILES.getlist("images")
        print(images)

        if not images:
            return Response({"error": "No images received."}, status=400)

        slides_to_create = []
        for slide in images:
            
            if not Slides.objects.filter(folder=userFolder, slides=slide.name).exists():
                slides_to_create.append(Slides(folder=userFolder, slides=slide))

        if slides_to_create:
            Slides.objects.bulk_create(slides_to_create)
            return Response({"message": "Slides created successfully!"}, status=201)
        else:
            return Response({"message": "No new slides to add."}, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=400)
    
        
@api_view(["POST"])
def imageToText(request):
    genai.configure(api_key=SECRET_KEY)
    image_file = request.FILES.get("image")
    language = request.POST.get("language", "English") 

    if not image_file:
        return Response({"error": "No image provided"}, status=400)

    
    image_data = image_file.read()
    base64_image = base64.b64encode(image_data).decode("utf-8")

    
    model = genai.GenerativeModel("gemini-1.5-pro")

   
    response = model.generate_content([
        f"Translate to {language} the texts found in the image",
        {"mime_type": "image/png", "data": base64_image}  
    ])

    return Response({"Response": response.text})

@api_view(["DELETE"])
def delete_folder(request, pk):
    folder = get_object_or_404(UserFolder, id=pk) 
    folder.delete()
    return Response({"message": "Folder deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
