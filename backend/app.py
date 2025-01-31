from flask import Flask, request, jsonify
import whisper
import os

app = Flask(__name__)

# Enable CORS so React can access this API
from flask_cors import CORS
CORS(app)

# Load the Whisper model
model = whisper.load_model("base")

@app.route("/transcribe", methods=["POST"])
def transcribe_audio():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = "audio_input.mp3"
    file.save(file_path)

    # Transcribe the audio
    result = model.transcribe(file_path)

    # Remove the audio file after processing
    os.remove(file_path)

    return jsonify({"transcription": result["text"]})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
