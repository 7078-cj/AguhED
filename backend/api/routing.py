from django.urls import path
from .consumer import VideoConsumer

wsPattern = [
    path("ws/video",VideoConsumer.as_asgi())
]