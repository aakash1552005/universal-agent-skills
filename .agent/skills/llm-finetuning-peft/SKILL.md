---
name: llm-finetuning-peft
description: Parameter-Efficient Fine-Tuning (PEFT), LoRA/QLoRA, Unsloth, HuggingFace SFTTrainer, Axolotl, DPO, and benchmark evaluation for open-weights LLMs (Llama 3, Mistral, Qwen).
---

# LLM Fine-Tuning: LoRA, QLoRA & SFT

Complete workflow for preparing datasets, configuring 4-bit quantization, applying LoRA adapters, and fine-tuning language models with HuggingFace TRL and PEFT.

## QLoRA SFT Training Script with HuggingFace TRL

```python
import torch
from datasets import load_dataset
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig, TrainingArguments
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from trl import SFTTrainer

# 1. 4-bit NormalFloat Quantization Config
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,
)

model_id = "meta-llama/Meta-Llama-3-8B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_id)
tokenizer.pad_token = tokenizer.eos_token

model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=bnb_config,
    device_map="auto"
)
model = prepare_model_for_kbit_training(model)

# 2. LoRA Target Modules
lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)
model = get_peft_model(model, lora_config)

# 3. Supervised Fine-Tuning
training_args = TrainingArguments(
    output_dir="./results_llama3_lora",
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    logging_steps=10,
    max_steps=500,
    fp16=False,
    bf16=True,
    optim="paged_adamw_8bit"
)

trainer = SFTTrainer(
    model=model,
    train_dataset=load_dataset("json", data_files="train.jsonl")["train"],
    peft_config=lora_config,
    dataset_text_field="text",
    max_seq_length=2048,
    args=training_args
)

trainer.train()
```
