import cv2
import numpy as np
import mediapipe as mp
import base64
import io
from PIL import Image
import fitz

from collections import deque

def get_gesture(landmarks):
    index_tip = landmarks[8]
    middle_tip = landmarks[12]
    ring_tip = landmarks[16]
    pinky_tip = landmarks[20]
    thumb_tip = landmarks[4]
    index_finger_mcp = landmarks[5]
    middle_finger_mcp = landmarks[9] 

    # Determine which fingers are extended
    fingers = [
        index_tip.y < landmarks[6].y,   # Index finger
        middle_tip.y < landmarks[10].y, # Middle finger
        ring_tip.y < landmarks[14].y,   # Ring finger
        pinky_tip.y < landmarks[18].y,  # Pinky
        thumb_tip.x > index_finger_mcp.x 
    ]

    # Determine hand orientation
    is_right_hand = thumb_tip.x > index_finger_mcp.x
    is_right_hand_2 = thumb_tip.x > middle_finger_mcp.x

   
    dist_thumb_index = abs(index_tip.x - thumb_tip.x) * 100
    dist_thumb_middle = abs(middle_tip.x - thumb_tip.x) * 100

    # Gesture conditions
    if fingers == [1, 1, 0, 0, 0]:  
        return "ERASE"  # Only index & middle extended
    elif fingers == [1, 1, 1, 0, 0]:  
        return "ADD_SHAPE"  # Thumb, index & middle extended
    elif fingers == [0, 0, 0, 0, 0]:  
        return "DELETE_SHAPE"  # All fingers closed
    elif dist_thumb_index < 1:  
        return "Next"  # Thumb & index finger close together
    elif dist_thumb_middle < 1:  
        return "Previous"  # Thumb & middle finger close together

    return "None"

def get_gestureSL(landmarks):
    index_tip = landmarks[8]
    middle_tip = landmarks[12]
    ring_tip = landmarks[16]
    pinky_tip = landmarks[20]
    thumb_tip = landmarks[4]
    index_finger_mcp = landmarks[5]
    

    # Determine which fingers are extended
    fingers = [
        index_tip.y < landmarks[6].y,   # Index finger
        middle_tip.y < landmarks[10].y, # Middle finger
        ring_tip.y < landmarks[14].y,   # Ring finger
        pinky_tip.y < landmarks[18].y,  # Pinky
        thumb_tip.x > index_finger_mcp.x 
    ]


    if fingers == [0, 0, 0, 0, 0]:  
        return "Next"  # All fingers closed


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

            # Get current gesture
            current_gesture = get_gesture(hand_landmarks.landmark)
            print("Detected Gesture:", current_gesture)

            # State transition logic
            if current_gesture in ["Next", "Previous"] and self.gesture_state != current_gesture:
                gesture = current_gesture
                self.gesture_state = current_gesture
            elif current_gesture != self.gesture_state:
                self.gesture_state = current_gesture

    return gesture

def process_signLanguage(self, frame_data):
    labels_dict = {
        0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 
        10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S', 
        19: 'T', 20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z',
        26: 'Hello', 27: 'Good Bye', 28: 'I love you'
    }
    
    frame_bytes = base64.b64decode(frame_data)
    np_arr = np.frombuffer(frame_bytes, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    frame = cv2.flip(frame, 1)  
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = self.mp_hands.process(rgb_frame)
    
    H, W, _ = frame.shape
    
    predicted_character = "none"

    if result.multi_hand_landmarks:
        for hand_landmarks in result.multi_hand_landmarks:
            self.mp_draw.draw_landmarks(frame, hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS)
            
            # Check for navigation gestures first
            sign = get_gestureSL(hand_landmarks.landmark)
            if sign == "Next":
                return sign
            
            # Process for sign language recognition
            x_ = []
            y_ = []
            data_aux = []
            
            # Collect coordinates
            for landmark in hand_landmarks.landmark:
                x_.append(landmark.x)
                y_.append(landmark.y)
            
            # Normalize coordinates
            for landmark in hand_landmarks.landmark:
                data_aux.append(landmark.x - min(x_))
                data_aux.append(landmark.y - min(y_))
            
            # Manage sequence buffer (add new, remove old if needed)
            self.sequence_buffer.append(data_aux)
            if len(self.sequence_buffer) > self.SEQUENCE_LENGTH:
                self.sequence_buffer.pop(0)
            
            # Make prediction if we have enough frames
            if len(self.sequence_buffer) == self.SEQUENCE_LENGTH:
                features = np.array([data_aux])  # For static model
                # For sequence models: features = np.array([self.sequence_buffer])
                prediction = self.model.predict(features)[0]
                predicted_character = labels_dict[int(prediction)]
                print(predicted_character)
        
    return predicted_character