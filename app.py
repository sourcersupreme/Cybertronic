from flask import Flask, request, jsonify
from optimized_model import predict_fast

app = Flask(__name__)

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
    app.run(host="0.0.0.0", port=5000)
    
    from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 🔥 THIS LINE IS REQUIRED
