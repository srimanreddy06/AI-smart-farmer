# Smart Farmer AI

A modern, full-stack agriculture assistant web application tailored for Indian farmers. The application provides practical, AI-driven advice on crops, fertilizers, pest control, irrigation, and more. 

Built with a custom HTML/CSS/JS frontend and a Python Flask backend connected to the Google Gemini AI.

## Features
- **AI-Powered Advice**: Uses the modern `gemini-2.5-flash` model via the new `google-genai` SDK to provide tailored agricultural recommendations.
- **Multi-Language Support**: Choose from English, Hindi (हिन्दी), Telugu (తెలుగు), or Tamil (தமிழ்) using the built-in dropdown selector.
- **Handcrafted UI**: A responsive, premium nature-inspired design with earthy green gradients and smooth animations. No generic bootstrap or tailwind templates.
- **Theme Toggle**: Light and Dark mode support out-of-the-box.
- **RESTful Backend**: Flask API backend (`/` for status, `/chat` for AI communication).
- **Interactive Dashboard**: Suggested chips, daily tips, and quick-action cards.
- **Voice UI Placeholder**: Setup for future voice-to-text integration.

## Project Structure
```text
smart-farmer-ai/
│
├── backend/
│   ├── app.py             # Flask application & routes (/ and /chat)
│   ├── agent.py           # Gemini SDK integration
│   ├── requirements.txt   # Python dependencies
│   ├── .env               # Environment variables (API Key)
│   └── utils/             # Helper modules (placeholder)
│
├── frontend/
│   ├── index.html         # Main layout & structure
│   ├── style.css          # Custom CSS & animations
│   ├── script.js          # Chatbot logic & interactions
│   ├── assets/            # Static assets (images, icons)
│   └── components/        # Frontend components (placeholder for future use)
│
└── README.md
```

## Setup & Installation

### 1. Prerequisites
- Python 3.8+
- [Google Gemini API Key](https://aistudio.google.com/)

### 2. Backend Setup
Navigate into the `backend` folder and install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory (if it doesn't exist) and add your Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. Run the Flask Server
Start the backend server:
```bash
python app.py
```
*The server will start on http://127.0.0.1:5000. You can visit this URL to see the health check JSON message.*

### 4. Frontend Setup
The frontend is completely static and uses Vanilla HTML/JS/CSS. Simply open `frontend/index.html` in your web browser. 
For a better experience (to avoid strict local file cors policies), you can use a local server like VS Code's "Live Server" extension.

## Usage
- Click on the dashboard cards or suggested chips to quickly ask a question.
- Select your preferred language from the sidebar before asking a question to get advice in your local tongue.
- Type in your own queries about crop rotation, fertilizers, or pest control.
- Toggle dark mode using the 🌙 icon in the sidebar.

## Screenshots
*(Add screenshots of the Light and Dark modes here)*
