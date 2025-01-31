import { useState, useEffect } from 'react';




export default function AlphabetTest2() {
  const [letter, setLetter] = useState('');
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState(null); 
  const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    // Check if the browser supports the Web Speech API
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + event.results[i][0].transcript);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(interimTranscript);
    };

    // Start or stop listening
    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    // Clean up on component unmount
    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const handleToggleListening = () => {
    setIsListening((prev) => !prev);
  };

  // Generate a random letter
  const generateRandomLetter = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    setLetter(randomLetter);
    setFeedback(null);
    setRecognizedText('');
    console.log('Generated new letter:', randomLetter);
  };

  return (
    <div className="App">
      <h1 style={{ fontSize: '24px', marginBottom: '16px', textAlign: 'center' }}>Pronounce the Letter</h1>

<div
  style={{
    width: '80%',
    maxWidth: '300px',
    height: '80vw',
    maxHeight: '300px',
    backgroundColor: '#e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    fontSize: '100px',
    fontWeight: 'bold',
  }}
>
  {letter}
</div>
<button
          onClick={generateRandomLetter}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          Next Letter
        </button>
      <button onClick={handleToggleListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>{transcript}</p>
    </div>
  );
}