from django.contrib import admin
from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh',TokenRefreshView.as_view(), name='token_refresh'),
    path('registerUser/',views.registerUser),
    path('getuserfolder/<str:pk>/',views.userFolder),
    path('createuserfolder/<str:pk>/',views.createUserFolder),
    path('upload_frame/',views.imageToText)
]
