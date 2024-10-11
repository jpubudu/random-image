import React, { useState } from 'react';
import './App.css';

function App() {
  // Store the image paths in an array
  const images = [
      "/images/img1.jpeg",
      "/images/img2.jpeg",
      "/images/img3.jpeg",
      "/images/img4.jpeg",
      "/images/img5.jpeg",
      "/images/img6.jpeg",
      "/images/img7.jpeg",
      "/images/img8.jpeg",
      "/images/img9.jpeg",
      "/images/img10.jpeg",
      "/images/img11.jpeg",
      "/images/img12.jpeg",
      "/images/img13.jpeg",
      "/images/img14.jpeg",
      "/images/img15.jpeg",
      "/images/img16.jpeg",
      "/images/img17.jpeg",
      "/images/img18.jpeg",
      "/images/img19.jpeg",
      "/images/img20.jpeg",
      "/images/img21.jpeg",
      "/images/img22.jpeg",
      "/images/img23.jpeg",
      "/images/img24.jpeg",
      "/images/img25.jpeg"
  ];

  // Set the initial state for the current image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to pick a random image
  const loadRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length); // Get a random index
    setCurrentIndex(randomIndex); // Update the current index
  };

  return (
    <div className="App">
      <h2>
        Practice Your Words - {currentIndex + 1} {/* Display the current image ID */}
      </h2>

      {/* Display the current image */}
      <div>
        <img
          src={images[currentIndex]} // Use the current index to display the image
          alt="Random"
          style={{ width: '325px', height: '500px' }} // You can change size as needed
        />
      </div>

      {/* Button to load a new random image */}
      <button onClick={loadRandomImage}>Refresh Image</button>
    </div>
  );
}

export default App;
