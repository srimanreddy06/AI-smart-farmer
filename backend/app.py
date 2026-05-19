import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from agent import get_ai_response

app = Flask(__name__)

# Enable CORS for all domains so frontend can hit the API
CORS(app)

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        "message": "Smart Farmer AI Backend Running"
    }), 200

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    
    if not data or 'message' not in data:
        return jsonify({'error': 'Invalid request format. Expected JSON with a "message" field.'}), 400
    
    user_input = data['message'].strip()
    if not user_input:
        return jsonify({'error': 'Message cannot be empty.'}), 400
    
    language = data.get('language', 'en')
    
    # Get response from AI (Gemini)
    reply = get_ai_response(user_input, language)
    
    return jsonify({'reply': reply}), 200

if __name__ == '__main__':
    # Starts the local development server at port 5000
    app.run(port=5000, debug=True)
