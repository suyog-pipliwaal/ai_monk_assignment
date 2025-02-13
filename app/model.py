from fastapi import FastAPI, File, UploadFile
from PIL import Image
import torch
import io
import json
from fastapi.middleware.cors import CORSMiddleware
import base64

model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/detect/")
async def detect_objects(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read()))
    results = model(image)
    results.render()
    img_with_boxes = Image.fromarray(results.ims[0])  # Convert to PIL Image
    img_bytes = io.BytesIO()

    img_with_boxes.save(img_bytes, format="JPEG")
    
    img_base64 = base64.b64encode(img_bytes.getvalue()).decode("utf-8")
    data = results.pandas().xyxy[0].to_json()
    return {"image": img_base64, "data": data}