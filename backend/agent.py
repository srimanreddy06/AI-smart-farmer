import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def get_ai_response(user_message, language="en"):
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        return "Error: GEMINI_API_KEY not found."

    try:
        # Initialize the client using the new SDK
        client = genai.Client(api_key=api_key)

        system_prompt = (
            "You are Smart Farmer AI, a helpful agriculture assistant for Indian farmers. "
            "Give short, practical, and easy-to-understand farming advice. "
            f"You MUST respond ONLY in the language code: '{language}'."
        )

        # Using gemini-2.5-flash which has a generous free tier limit
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=user_message,
            config=types.GenerateContentConfig(
                system_instruction=system_prompt,
                temperature=0.7
            )
        )

        return response.text

    except Exception as e:
        print("Gemini Error:", str(e))
        return f"Error calling Gemini API: {str(e)}"