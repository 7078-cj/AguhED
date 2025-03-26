import cv2
import numpy as np
import mediapipe as mp
import base64
import io
from PIL import Image
import fitz

from collections import deque





def process_image(self, frame_data):
    frame_bytes = base64.b64decode(frame_data)
    np_arr = np.frombuffer(frame_bytes, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    frame = cv2.flip(frame, 1)  

    
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = self.mp_hands.process(rgb_frame)
    
    gesture = "none"

    if result.multi_hand_landmarks:
        for hand_landmarks in result.multi_hand_landmarks:
            self.mp_draw.draw_landmarks(frame, hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS)
            
            # Get finger position
            index_finger_tip = hand_landmarks.landmark[8]
            x, y = int(index_finger_tip.x * frame.shape[1]), int(index_finger_tip.y * frame.shape[0])

            # Get current gesture self.model.predict(features)[0]
            current_gesture = self.model.predict(hand_landmarks.landmark)
            print("Detected Gesture:", current_gesture)

            # State transition logic
            if current_gesture in ["Next", "Previous"] and self.gesture_state != current_gesture:
                gesture = current_gesture
                self.gesture_state = current_gesture
            elif current_gesture != self.gesture_state:
                self.gesture_state = current_gesture

    return gesture

import base64
import numpy as np
import cv2
import mediapipe as mp

def process_signLanguage(self, frame_data):
    labels_dict = {
        0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 
        10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S', 
        19: 'T', 20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z',
        26: 'Hello', 27: 'Good Bye', 28: 'I love you'
    }
    
    # Decode the base64 frame
    try:
        frame_bytes = base64.b64decode(frame_data)
        np_arr = np.frombuffer(frame_bytes, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        
    except Exception as e:
        print(f"Error decoding frame: {e}")
        return "error"

    if frame is None:
        return "error"

    frame = cv2.flip(frame, 1)  
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    # Process hand landmarks
    result = self.mp_hands.process(rgb_frame)
    
    if not result.multi_hand_landmarks:
        return "none"  # No hand detected

    predicted_character = "none"
    
    for hand_landmarks in result.multi_hand_landmarks:
        self.mp_draw.draw_landmarks(frame, hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS)
        
        # Check for navigation gestures first
        
        
        # Collect normalized hand landmark coordinates
        x_, y_ = [], []
        data_aux = []
        
        for landmark in hand_landmarks.landmark:
            x_.append(landmark.x)
            y_.append(landmark.y)
        
        min_x, min_y = min(x_), min(y_)
        
        for landmark in hand_landmarks.landmark:
            data_aux.append(landmark.x - min_x)
            data_aux.append(landmark.y - min_y)
        
        # Maintain sequence buffer
        self.sequence_buffer.append(data_aux)
        if len(self.sequence_buffer) > self.SEQUENCE_LENGTH:
            self.sequence_buffer.pop(0)
        
        # Make prediction when sequence is ready
        if len(self.sequence_buffer) == self.SEQUENCE_LENGTH:
            try:
                features = np.array([data_aux])  # Static model input
                # For sequence models: features = np.array([self.sequence_buffer])
                
                prediction = self.model.predict(features)[0]
                predicted_character = labels_dict.get(int(prediction), "unknown")
                print(f"Predicted: {predicted_character}")
            except Exception as e:
                print(f"Prediction error: {e}")
                return "error"
        
    return predicted_character