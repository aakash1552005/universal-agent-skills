---
name: computer-vision-multimodal
description: Computer vision pipelines: YOLOv10 object detection, Segment Anything (SAM), CLIP zero-shot classification, OCR with PaddleOCR, and multimodal Vision-Language Models (VLM).
---

# Multimodal AI & Computer Vision Engineering

Patterns for integrating vision models into autonomous analytics workflows (document parsing, chart interpretation, spatial object detection).

## CLIP Zero-Shot Image Classification
```python
import torch
from PIL import Image
from transformers import CLIPProcessor, CLIPModel

device = "cuda" if torch.cuda.is_available() else "cpu"
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32").to(device)
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

def classify_chart_type(image_path: str, candidate_labels: list[str]) -> dict:
    image = Image.open(image_path)
    inputs = processor(text=candidate_labels, images=image, return_tensors="pt", padding=True).to(device)
    
    with torch.no_grad():
        outputs = model(**inputs)
        probs = outputs.logits_per_image.softmax(dim=1)[0]
        
    return {label: float(prob) for label, prob in zip(candidate_labels, probs)}
```
