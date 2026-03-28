from flask import Flask, request, jsonify
from flask_cors import CORS
from optimized_model import predict_fast
import os

app = Flask(__name__)
CORS(app)  # ✅ Apply CORS correctly

@app.route("/")
def home():
    return "✅ Phishing Detection API Running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text = data.get("text", "")
    
    result = predict_fast(text)
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))# 🔥 THIS LINE IS REQUIRED
