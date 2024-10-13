import React, { useState } from 'react';
import './App.css';
import { categories } from './SwedishPhrases'; // Ensure this file exports a correctly structured categories array

function App() {
  const generateImageArray = (count) => {
    const images = [];
    for (let i = 1; i <= count; i++) {
      images.push(`${process.env.PUBLIC_URL}/images/img${i}.jpg`);
    }
    return images;
  };

  const images = generateImageArray(61);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [challengeWord, setChallengeWord] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllWords, setShowAllWords] = useState(false);
  const [categorySetIndex, setCategorySetIndex] = useState(0); // Track current category set

  const playSound = () => {
    const audio = new Audio('/click-sound.mp3');
    audio.play();
  };

  const loadRandomImage = () => {
    playSound();
    setLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setCurrentIndex(randomIndex);
      setLoading(false);
    }, 200);
  };

  const loadFirstImage = () => {
    playSound();
    setCurrentIndex(0);
  };

  const loadPreviousImage = () => {
    if (currentIndex > 0) {
      playSound();
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const loadNextImage = () => {
    if (currentIndex < images.length - 1) {
      playSound();
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const getRandomWord = () => {
    playSound();
    if (selectedCategory) {
      setIsLoading(true);
      setTimeout(() => {
        const randomWord = selectedCategory.words[Math.floor(Math.random() * selectedCategory.words.length)];
        setChallengeWord(randomWord);
        setShowTranslation(false);
        setIsLoading(false);
      }, 200);
    }
  };

  const handleWordClick = () => {
    getRandomWord(); // Fetch a new random word
    setShowTranslation(true); // Show the translation when clicked
  };

  const toggleTranslation = () => {
    setShowTranslation((prevState) => !prevState);
  };

  const handleShowAllWords = () => {
    playSound();
    setShowAllWords((prevState) => !prevState);
  };

  const renderTabContent = () => {
    if (activeTab === 'tab1') {
      return (
        <>
          <h3>Practice Your Words - {currentIndex + 1}</h3>
          <div className="image-wrapper">
            {loading && <div className="loading-spinner"></div>}
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              style={{ width: '325px', height: '500px' }}
            />
          </div>
          <div className="button-container">
            <button onClick={loadFirstImage}>1</button>
            <button onClick={loadPreviousImage} disabled={currentIndex === 0}>←</button>
            <button onClick={loadRandomImage}>Challenge</button>
            <button onClick={loadNextImage} disabled={currentIndex === images.length - 1}>→</button>
          </div>
        </>
      );
    } else if (activeTab === 'tab2') {
      const categoriesToShow = categories.slice(categorySetIndex * 2, categorySetIndex * 2 + 2); // Show 2 categories

      return (
        <div className="word-sections">
          <div className="button-navigation-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => setCategorySetIndex((prev) => Math.max(prev - 1, 0))}
              disabled={categorySetIndex === 0}
              style={{ marginRight: '10px' }}
            >  ←
            </button>

            <div className="button-container" style={{ display: 'flex', flexGrow: 1 }}>
              {categoriesToShow.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedCategory(category);
                    setChallengeWord(null);
                    setShowTranslation(false);
                    setShowAllWords(false);
                    playSound();
                  }}
                  style={{
                    border: selectedCategory && selectedCategory.name === category.name ? '2px solid limegreen' : '2px solid transparent',
                    color: 'white',
                    backgroundColor: 'transparent',
                    padding: '5px 10px',
                    margin: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCategorySetIndex((prev) => Math.min(prev + 1, Math.floor(categories.length / 2) - 1))}
              disabled={categorySetIndex >= Math.floor(categories.length / 2) - 1}
              style={{ marginLeft: '10px' }}
            > →
            </button>
          </div>

          {selectedCategory && (
            <>
              <div className="challenge-word">
                {isLoading ? (
                  <h3>Loading...</h3>
                ) : (
                  <h3 onClick={handleWordClick} style={{ cursor: 'pointer' }}>
                    {challengeWord ? challengeWord.english : 'Click Challenge to get a statement'}
                  </h3>
                )}
                {showTranslation && challengeWord && (  // Check if challengeWord is defined before accessing it
                  <p>{challengeWord.swedish}</p>
                )}
              </div>
              <div className="button-container">
                <button onClick={getRandomWord}>Challenge</button>
                <button onClick={toggleTranslation}>Show</button>
                <button onClick={handleShowAllWords}>
                  {showAllWords ? 'Hide All' : 'Show All'}
                </button>
              </div>
              {showAllWords && (
                <div className="all-words">
                  <h4>All Words in {selectedCategory.name}</h4>
                  <ul>
                    {selectedCategory.words.map((word, index) => (
                      <li key={index}>
                        <strong>{word.english}</strong>: {word.swedish}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      );
    }
  };

  return (
    <div className="App">
      <div className="tabs">
        <button onClick={() => setActiveTab('tab1')} className={activeTab === 'tab1' ? 'active' : ''}>
          Duolingo
        </button>
        <button onClick={() => setActiveTab('tab2')} className={activeTab === 'tab2' ? 'active' : ''}>
          Statements
        </button>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}

export default App;
