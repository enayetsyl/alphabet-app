import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";

const AlphabetTest = () => {
  const [letter, setLetter] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [recognizedText, setRecognizedText] = useState("");

  const letterRef = useRef(""); // ✅ Store latest letter value

  useEffect(() => {
    console.log("letter state updated:", letter);
    letterRef.current = letter; // ✅ Update ref whenever letter changes
  }, [letter]);

  useEffect(() => {
    // Initialize SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = "en-US";
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;

      recognitionInstance.onstart = () => {
        setIsRecognizing(true);
      };

      recognitionInstance.onend = () => {
        setIsRecognizing(false);
      };

      recognitionInstance.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        console.log("Recognized text:", spokenText);
        setRecognizedText(spokenText);
        checkPronunciation(spokenText);
      };

      setRecognition(recognitionInstance);
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  }, []);

  // ✅ Fix: Use `letterRef.current` instead of `letter`
  const checkPronunciation = (spokenText) => {
    const firstWord = spokenText.trim().toLowerCase();
    console.log("First word:", firstWord);
    console.log("Expected letter (from ref):", letterRef.current);

    if (firstWord === letterRef.current.toLowerCase()) {
      setFeedback("correct");
      console.log("✅ Correct pronunciation!");
    } else {
      setFeedback("incorrect");
      console.log("❌ Incorrect pronunciation. Playing correct audio...");
      playLetterAudio();
    }
  };

  const playLetterAudio = () => {
    const audioElement = document.getElementById("letterSound");
    audioElement.src = `audio/${letterRef.current}.mp3`;
    audioElement.play();
  };

  const startRecognition = () => {
    if (recognition && !isRecognizing) {
      recognition.start();
    }
  };

  const generateRandomLetter = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    setLetter(randomLetter);
    letterRef.current = randomLetter; // ✅ Update ref immediately
    setFeedback(null);
    setRecognizedText("");
    console.log("Generated new letter:", randomLetter);
  };

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <h1>Pronounce the Letter</h1>

        <div style={{ fontSize: "100px", fontWeight: "bold", margin: "20px" }}>{letter}</div>

        <button
          onClick={startRecognition}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#FB923C",
            cursor: "pointer",
            borderRadius: "8px",
            color: "white",
          }}
        >
          🎤 Pronounce
        </button>

        <button
          onClick={generateRandomLetter}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#f3f4f6",
            cursor: "pointer",
            borderRadius: "8px",
          }}
        >
          Next Letter
        </button>

        <div style={{ marginTop: "20px", fontSize: "18px" }}>
          <strong>Recognized:</strong> {recognizedText}
        </div>

        {feedback === "correct" && <div style={{ color: "green", fontSize: "24px" }}>✔️ Correct!</div>}
        {feedback === "incorrect" && <div style={{ color: "red", fontSize: "24px" }}>❌ Try Again!</div>}

        <audio id="letterSound"></audio>
      </div>
    </>
  );
};

export default AlphabetTest;
