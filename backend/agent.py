import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

def get_ai_response(user_message, language="en"):
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        return "Error: GEMINI_API_KEY not found."

    try:
        client = genai.Client(api_key=api_key)

        system_prompt = (
            "You are Smart Farmer AI, a helpful agriculture assistant for Indian farmers. "
            "Give short, practical, and easy-to-understand farming advice. "
            f"You MUST respond ONLY in the language code: '{language}'."
        )

        models_to_try = [
            "gemini-2.5-flash",
            "gemini-2.5-flash-lite",
            "gemini-flash-latest",
            "gemini-flash-lite-latest"
        ]
        last_error = None
        
        for model_name in models_to_try:
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=user_message,
                    config=types.GenerateContentConfig(
                        system_instruction=system_prompt,
                        temperature=0.7
                    )
                )
                return response.text
            except Exception as e:
                print(f"Model {model_name} failed: {str(e)}")
                last_error = e
                
        # If all models fail, raise the last exception
        raise last_error

    except Exception as e:
        print("Gemini Error:", str(e))
        return f"Error calling Gemini API: {str(e)}"