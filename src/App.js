import React, { useState } from 'react';
import './App.css';

function App() {
const images = [
  "/images/img1.jpg", "/images/img2.jpg", "/images/img3.jpg",
  "/images/img4.jpg", "/images/img5.jpg", "/images/img6.jpg",
  "/images/img7.jpg", "/images/img8.jpg", "/images/img9.jpg",
  "/images/img10.jpg", "/images/img11.jpg", "/images/img12.jpg",
  "/images/img13.jpg", "/images/img14.jpg", "/images/img15.jpg",
  "/images/img16.jpg", "/images/img17.jpg", "/images/img18.jpg",
  "/images/img19.jpg", "/images/img20.jpg", "/images/img21.jpg",
  "/images/img22.jpg", "/images/img23.jpg", "/images/img24.jpg",
  "/images/img25.jpg", "/images/img26.jpg", "/images/img27.jpg",
  "/images/img28.jpg", "/images/img29.jpg", "/images/img30.jpg",
  "/images/img31.jpg", "/images/img32.jpg", "/images/img33.jpg",
  "/images/img34.jpg", "/images/img35.jpg", "/images/img36.jpg",
  "/images/img37.jpg", "/images/img38.jpg", "/images/img39.jpg",
  "/images/img40.jpg", "/images/img41.jpg", "/images/img42.jpg",
  "/images/img43.jpg", "/images/img44.jpg", "/images/img45.jpg",
  "/images/img46.jpg", "/images/img47.jpg", "/images/img48.jpg",
  "/images/img49.jpg", "/images/img50.jpg", "/images/img51.jpg",
  "/images/img52.jpg", "/images/img53.jpg", "/images/img54.jpg",
  "/images/img55.jpg", "/images/img56.jpg", "/images/img57.jpg",
  "/images/img58.jpg", "/images/img59.jpg", "/images/img60.jpg",
  "/images/img61.jpg"
];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state

  // Function to load a random image and play sound
  const loadRandomImage = () => {
    const audio = new Audio('/click-sound.mp3'); // Path to the sound file
    audio.play(); // Play the sound effect

    setLoading(true); // Set loading state to true

    // Simulate a 1 second delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setCurrentIndex(randomIndex); // Update the image
      setLoading(false); // Reset loading state
    }, 200); // 1-second delay
  };

  return (
    <div className="App">
      <h2>Practice Your Words - {currentIndex + 1}</h2>

      <div className="image-wrapper">
        {loading && <div className="loading-spinner"></div>} {/* Spinner overlay */}
        <img
          src={images[currentIndex]}
          alt="Random"
          style={{ width: '325px', height: '500px' }}
        />
      </div>

      <button onClick={loadRandomImage}>Refresh Image</button>
    </div>
  );
}

export default App;
