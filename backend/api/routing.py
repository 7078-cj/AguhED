from django.urls import path
from .consumer import VideoConsumer,SignLanguageConsumer

wsPattern = [
    path("ws/video",VideoConsumer.as_asgi()),
    path("ws/sign_language",SignLanguageConsumer.as_asgi())
]