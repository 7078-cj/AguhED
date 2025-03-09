import cv2
import numpy as np
import mediapipe as mp
import base64
import io
from PIL import Image
import fitz

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


def process_image(self,frame_data):
           
    
    frame_bytes = base64.b64decode(frame_data)
    np_arr = np.frombuffer(frame_bytes, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    frame = cv2.flip(frame, 1)  

    if self.canvas is None:
        self.canvas = np.zeros_like(frame)

    
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = self.mp_hands.process(rgb_frame)
    
    gesture = "none"

    if result.multi_hand_landmarks:
        for hand_landmarks in result.multi_hand_landmarks:
            self.mp_draw.draw_landmarks(frame, hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS)

            
            index_finger_tip = hand_landmarks.landmark[8]
            x, y = int(index_finger_tip.x * frame.shape[1]), int(index_finger_tip.y * frame.shape[0])

           
            smooth_x, smooth_y = self.kf.predict(x, y)

           
            gesture = get_gesture(hand_landmarks.landmark)
            print("Detected Gesture:", gesture)

            if gesture == "Next" and self.gesture_state != "Next":
                    gesture = "Next"
                    self.gesture_state = "Next"  
            elif gesture != "Next":
                    self.gesture_state = gesture
            elif gesture == "Previous" and self.gesture_state != "Previous":
                    gesture = "Previous"
                    self.gesture_state = "Previous"  
            elif gesture != "Previous":
                    self.gesture_state = gesture    
                


    frame = cv2.addWeighted(frame, 0.7, self.canvas, 0.3, 0)
   
    _, buffer = cv2.imencode(".jpg", frame)
    encoded_frame = base64.b64encode(buffer).decode("utf-8")
    

    return encoded_frame, gesture