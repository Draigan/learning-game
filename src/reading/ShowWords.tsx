import { useEffect, useState } from "react";
import "../css/reading.css";

const ShowWords = ({
  difficulty,
  currentWord,
  words,
  changeWord,
  setPoints,
  points,
}) => {
  const [choiceArray, setChoiceArray] = useState([]);

  function getRandomWord() {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    if (currentWord === randomWord) return getRandomWord();
    return randomWord;
  }

  function buildPossibleChoiceArray(currentWord: string) {
    // These are the other two choices besides the currentt word
    // We are going to make sure they are not the same before we move on
    let wordOne: string;
    let wordTwo: string;
    do {
      wordOne = getRandomWord();
      wordTwo = getRandomWord();
    } while (wordOne === wordTwo);
    const choiceArray = [currentWord, wordOne, wordTwo];

    //Shuffle the elements
    for (let i = choiceArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at i and j
      [choiceArray[i], choiceArray[j]] = [choiceArray[j], choiceArray[i]];
    }
    return setChoiceArray(choiceArray);
  }

  function handlePoints() {
    if (points > 99) return setPoints(0);
    return setPoints((prev: number) => prev + 1);
  }

  // When the word changes, get 2 other random words and shuffle them into an array
  useEffect(() => {
    buildPossibleChoiceArray(currentWord);
  }, [currentWord]);

  // Modes for difficulty: I have other projects so using inline styles to save time
  // Easy Mode
  if (difficulty === "easy") {
    return (
      <div className="reading-button-container">
        {choiceArray.map((element, index) => {
          if (currentWord === element) {
            return (
              <div
                key={index}
                style={{ backgroundColor: "green" }}
                className="reading-button"
                onClick={() => {
                  changeWord();
                  handlePoints();
                }}
              >
                {choiceArray[index]}
              </div>
            );
          } else {
            return (
              <div
                key={index}
                style={{ backgroundColor: "red" }}
                className="reading-button"
              >
                {choiceArray[index]}
              </div>
            );
          }
        })}
      </div>
    );
  }
  // Medium Mode
  if (difficulty === "medium") {
    return (
      <div className="reading-button-container">
        {choiceArray.map((element, index) => {
          if (currentWord === element) {
            return (
              <div
                key={index}
                style={{ backgroundColor: "gray" }}
                className="reading-button"
                onClick={() => {
                  changeWord();
                  handlePoints();
                }}
              >
                {choiceArray[index]}
              </div>
            );
          } else {
            return (
              <div
                key={index}
                style={{ backgroundColor: "gray" }}
                className="reading-button"
              >
                {choiceArray[index]}
              </div>
            );
          }
        })}
      </div>
    );
  }
  // Hard Mode
  if (difficulty === "hard") {
    return (
      <div className="reading-button-container">
        {choiceArray.map((element, index) => {
          if (currentWord === element) {
            return (
              <div
                key={index}
                style={{ backgroundColor: "green" }}
                className="reading-button"
                onClick={() => {
                  changeWord();
                  handlePoints();
                }}
              >
                {choiceArray[index]}
              </div>
            );
          } else {
            return (
              <div
                key={index}
                style={{ backgroundColor: "red" }}
                className="reading-button"
              >
                {choiceArray[index]}
              </div>
            );
          }
        })}
      </div>
    );
  }
};

export default ShowWords;
