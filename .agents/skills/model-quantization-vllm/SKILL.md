---
name: model-quantization-vllm
description: High-throughput LLM deployment with vLLM, TensorRT-LLM, GGUF/llama.cpp, AWQ/GPTQ quantization, continuous batching, and PagedAttention.
---

# LLM Inference Optimization & vLLM Serving

Deploying high-concurrency LLM inference services with vLLM PagedAttention, KV-cache quantization, and speculative decoding.

## vLLM Production Server Launch
```bash
python3 -m vllm.entrypoints.openai.api_server     --model meta-llama/Meta-Llama-3-8B-Instruct     --tensor-parallel-size 1     --gpu-memory-utilization 0.90     --max-model-len 8192     --enable-chunked-prefill     --kv-cache-dtype auto     --port 8000
```

## Python Client Async Streaming
```python
from openai import AsyncOpenAI

client = AsyncOpenAI(base_url="http://localhost:8000/v1", api_key="EMPTY")

async def stream_analysis(prompt: str):
    response = await client.chat.completions.create(
        model="meta-llama/Meta-Llama-3-8B-Instruct",
        messages=[{"role": "user", "content": prompt}],
        stream=True,
        temperature=0.2
    )
    async for chunk in response:
        content = chunk.choices[0].delta.content
        if content:
            print(content, end="", flush=True)
```
