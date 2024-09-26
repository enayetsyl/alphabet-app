import { useState, useEffect } from 'react';

const AlphabetDisplay = () => {
  const [letter, setLetter] = useState('');
  const [isCapsLock, setIsCapsLock] = useState(false);

  useEffect(() => {
    // Event listener for keydown
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if (key >= 'a' && key <= 'z') {
        setLetter(key);

        // Play the sound for the letter
        const audioElement = document.getElementById('letterSound');
        audioElement.src = `audio/${key}.mp3`;
        audioElement.play();
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
      <audio id="letterSound"></audio>
    </div>
  );
};

export default AlphabetDisplay;
