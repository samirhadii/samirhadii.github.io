# Quantization

### What is Quantization?

In machine learning, quantization is a mathematical process that maps high precision data to low precision data in an attempt to reduce the cost of computation while still maintaining a reasonable amount of accuracy in the data. Quantization can map high precision continuous 32-bit floating point numbers to 8-bit discrete integers (with some extreme quantization methods mapping to as low as 1-bit or 2-bit). The great thing about quantization is that you can significantly reduce the size of the data while only seeing single digit percentage loss in accuracy for the data's applications.

For example, instead of storing a data point as:

```
0.123456789  # 32-bit floating point number
```

it can be approximated as:

```
0.12  # lower precision representation
```

Even though some precision is lost, modern quantization techniques are often able to maintain surprisingly strong performance.

### Why do I care about Quantization

Among a few other techniques, Quantization makes machine learning models significantly cheaper and faster to run.

Recently, I've been inspired to run LLM's locally on my consumer hardware. I have been fascinated to find that the smaller, quantized models run almost as well as the large models that are impossible to run on my hardware because they are too computationally intensive.

Without quantization, large models require enormous amounts of VRAM and computational resources. Inference costs (the cost associated with a model generating an output) scales rapidly with model size. Many production systems rely heavily on quantized inference to remain economically viable. Quantization allows developers to:

- Run models on consumer hardware
- Reduce inference costs
- Increase throughput
- Lower latency
- Deploy models on edge devices and mobile phones
- Fit larger models into limited GPU memory

I'm also interested in finding ways to make production AI run more efficiently at scale. The major LLM providers process billions of requests per day. Each request traverses through billions of parameters in the model to generate a response that is computationally very expensive. So any optimization like this has a huge impact. Performing lower-precision arithmetic requires significantly less electricity so Quantization allows the model to use less power to generate an output. At scale, this helps reduce emissions and saves money for everyone.

### Ways Quantization is being applied in Machine Learning

Machine learning researchers have developed several ways to apply quantization, depending on their application's need for speed or accuracy:

**Post-Training Quantization (PTQ)**: This is the most common and accessible method. You take a model that has already been fully trained normmally in high precision (FP32 or FP16) and smush it down to a lower precision (like INT8 or INT4) after the fact. There are some open source techniques like GPTQ, AWQ, and GGUF that help you do post training quantization, allowing huge models to be run on consumer hardware with minimal loss in reasoning ability.

**Quantization-Aware Training (QAT)**: Sometimes, shrinking a model after it’s trained causes it to lose too much accuracy. QAT solves this by simulating the effects of quantization during the initial training process. The model essentially learns to adapt to the lower precision as it trains, resulting in a much more accurate quantized model. This technique requires more training time and compute to do efffectively, and is ususally done for models that are intended to be open sourced or meant to run on consumer hardware.

**KV Cache Quantization**: When language models generate long responses or process huge documents, they have to store the context of the conversation in memory (known as the Key-Value or KV cache). This cache can get very large very quick. Quantizing the KV cache specifically allows models to handle massive context windows (like reading whole books) without crashing.

**Parameter-Efficient Fine-Tuning (QLoRA)**: Quantization isn't just for running models more efficiently, it can be used to training models more efficiently too. Techniques like QLoRA (Quantized Low-Rank Adaptation) freeze a massive model in 4-bit precision and only train a tiny, high-precision adapter on top of it. This allows developers to fine-tune massive foundation models on a single consumer GPU.
