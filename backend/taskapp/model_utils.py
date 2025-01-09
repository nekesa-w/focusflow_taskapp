from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Model configuration
CHECKPOINT = "HuggingFaceTB/SmolLM2-135M-Instruct"
DEVICE = "cpu"  # Use "cuda" if a GPU is available

# Initialize model and tokenizer as singletons
tokenizer = AutoTokenizer.from_pretrained(CHECKPOINT)
model = AutoModelForCausalLM.from_pretrained(CHECKPOINT).to(DEVICE)

# Set the tokenizer's padding token if needed
tokenizer.pad_token = tokenizer.eos_token
