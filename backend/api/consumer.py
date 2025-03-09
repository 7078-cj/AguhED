import json
import cv2
import numpy as np
import mediapipe as mp
import base64
import fitz  
import io
from PIL import Image
import asyncio
import threading
import time  
from channels.generic.websocket import AsyncWebsocketConsumer
from .KalmanFilter import KalmanFilter
from .utils import get_gesture, process_image

class VideoConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.mp_hands = mp.solutions.hands.Hands()
        self.mp_draw = mp.solutions.drawing_utils
        self.kf = KalmanFilter()
        self.draw_color = (0, 255, 0)
        self.canvas = None
        self.prev_point = None
        self.shapes = []
        self.lines = []  
        self.pptSlides = []
        self.current_slide = 0
        self.gesture_state = "None"
        self.gesture_cooldown = 0 

    async def disconnect(self, code):
        await self.close(code)

    async def receive(self, text_data):
        data = json.loads(text_data)

        if data["type"] == "image":
            frame_data = data["image"]
            asyncio.create_task(self.process_and_send(frame_data))
            
    async def process_and_send(self, frame_data):
        encodedFrame, action = process_image(self, frame_data)
        current_time = time.time()  

        
        if action in ["Next", "Previous"]:
   
            if self.gesture_state != action or (current_time - self.gesture_cooldown) > 1.0:
                self.gesture_cooldown = current_time  
                self.gesture_state = action
                await self.send(text_data=json.dumps({"type": "image", "image": encodedFrame, "action": action}))
        else:
            
            if self.gesture_state != action:
                self.gesture_state = action
                await self.send(text_data=json.dumps({"type": "image", "image": encodedFrame, "action": action}))

        
        if action == "None":
            await self.send(text_data=json.dumps({"type": "image", "image": encodedFrame, "action": "None"}))
