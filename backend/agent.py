import os
import time
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()


def get_ai_response(user_message, language="en"):
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        return "GEMINI_API_KEY not found."

    client = genai.Client(api_key=api_key)

    system_prompt = (
        "You are Smart Farmer AI, a helpful agriculture assistant for Indian farmers. "
        "Give short, practical, and easy-to-understand farming advice. "
        f"Respond only in language: {language}."
    )

    models = [
        "gemini-2.5-flash",
        "gemini-2.5-flash-lite",
    ]

    for model in models:
        for attempt in range(3):
            try:
                response = client.models.generate_content(
                    model=model,
                    contents=user_message,
                    config=types.GenerateContentConfig(
                        system_instruction=system_prompt,
                        temperature=0.7,
                    ),
                )

                return response.text

            except Exception as e:
                error = str(e)
                print(f"{model} Attempt {attempt+1}: {error}")

                if "503" in error or "UNAVAILABLE" in error:
                    time.sleep(2 ** attempt)
                    continue

                break

    return "AI service is busy. Please try again in a few moments."