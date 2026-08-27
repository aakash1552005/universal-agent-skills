---
name: machine-learning-pytorch
description: Master deep learning with PyTorch 2.x: custom nn.Module architectures, mixed precision (torch.cuda.amp), distributed training (DDP), and torch.compile optimization.
---

# Production PyTorch 2.x Engineering

Architecting, training, and compiling custom deep learning models for production computer vision, tabular modeling, and sequence tasks.

## PyTorch 2.0 Fast Training Loop Template

```python
import torch
import torch.nn as nn
from torch.utils.data import DataLoader

class DeepTabularClassifier(nn.Module):
    def __init__(self, in_features: int, num_classes: int):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_features, 256),
            nn.BatchNorm1d(256),
            nn.SiLU(),
            nn.Dropout(0.3),
            nn.Linear(256, 128),
            nn.BatchNorm1d(128),
            nn.SiLU(),
            nn.Linear(128, num_classes)
        )
        
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.net(x)

def train_model(model: nn.Module, loader: DataLoader, epochs: int = 10, lr: float = 1e-3):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)
    
    # PyTorch 2.x speedup via Inductor compiler
    if torch.cuda.is_available():
        model = torch.compile(model)
        
    optimizer = torch.optim.AdamW(model.parameters(), lr=lr, weight_decay=1e-2)
    criterion = nn.CrossEntropyLoss()
    scaler = torch.cuda.amp.GradScaler(enabled=(device.type == "cuda"))
    
    model.train()
    for epoch in range(epochs):
        for batch_x, batch_y in loader:
            batch_x, batch_y = batch_x.to(device), batch_y.to(device)
            optimizer.zero_grad(set_to_none=True)
            
            # Automatic Mixed Precision (AMP)
            with torch.cuda.amp.autocast(enabled=(device.type == "cuda")):
                outputs = model(batch_x)
                loss = criterion(outputs, batch_y)
                
            scaler.scale(loss).backward()
            scaler.step(optimizer)
            scaler.update()
```
