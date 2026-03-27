from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import torch

MODEL_NAME = "distilbert-base-uncased"

tokenizer = DistilBertTokenizer.from_pretrained(MODEL_NAME)
model = DistilBertForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=2)

def predict_fast(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)

    with torch.no_grad():
        outputs = model(**inputs)

    probs = torch.softmax(outputs.logits, dim=1)
    confidence = probs[0][1].item()

    score = confidence * 100

    # Rule boost
    if "http" in text:
        score += 10
    if "urgent" in text.lower():
        score += 10

    score = min(score, 100)

    return {
        "prediction": "Phishing" if score > 60 else "Safe",
        "confidence": round(score, 2)
    }
