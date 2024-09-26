import { useState, useEffect } from 'react';

const AlphabetDisplay = () => {
  const [letter, setLetter] = useState('');
  const [isCapsLock, setIsCapsLock] = useState(false);

  useEffect(() => {
    // Event listener for physical keyboard
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if (key >= 'a' && key <= 'z') {
        playLetter(key);
      }

      // Check if Caps Lock is on
      if (event.getModifierState('CapsLock')) {
        setIsCapsLock(true);
      } else {
        setIsCapsLock(false);
      }
    };

    // Add keydown listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCapsLock]);

  // Function to play the letter sound and update the letter state
  const playLetter = (key) => {
    setLetter(key);

    // Play the sound for the letter
    const audioElement = document.getElementById('letterSound');
    audioElement.src = `audio/${key}.mp3`;
    audioElement.play();
  };

  // Function to toggle Caps Lock for on-screen keyboard
  const toggleCapsLock = () => {
    setIsCapsLock(!isCapsLock);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '40px',
        padding: '0 16px',
      }}
    >
      <h1 style={{ fontSize: '24px', marginBottom: '16px', textAlign: 'center' }}>Press a key to see the letter!</h1>

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
        }}
      >
        {letter && (
          <img
            src={`/${isCapsLock ? 'image-capital' : 'image-small'}/${isCapsLock ? letter.toUpperCase() : letter}.jpg`}
            alt={`Letter ${isCapsLock ? letter.toUpperCase() : letter}`}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        )}
      </div>

      {/* On-screen keyboard */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '500px' }}>
        {'abcdefghijklmnopqrstuvwxyz'.split('').map((char) => (
          <button
            key={char}
            onClick={() => playLetter(char)}
            style={{
              width: '40px',
              height: '40px',
              margin: '5px',
              fontSize: '18px',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {isCapsLock ? char.toUpperCase() : char}
          </button>
        ))}
      </div>

      {/* Caps Lock button */}
      <button
        onClick={toggleCapsLock}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: isCapsLock ? '#4ade80' : '#f3f4f6',
          border: '1px solid #d1d5db',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Toggle Caps Lock
      </button>

      <audio id="letterSound"></audio>
    </div>
  );
};

export default AlphabetDisplay;
