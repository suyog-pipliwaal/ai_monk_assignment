from fastapi import FastAPI, File, UploadFile
from PIL import Image
import torch
import io
import json
from fastapi.middleware.cors import CORSMiddleware

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
    response = results.pandas().xyxy[0].to_json()
    return json.loads(response)