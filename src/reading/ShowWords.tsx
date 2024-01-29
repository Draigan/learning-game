import { useEffect, useState } from "react";
import "../css/reading.css";

const ShowWords = ({ currentWord, words, changeWord, setPoints }) => {
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

    for (let i = choiceArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at i and j
      [choiceArray[i], choiceArray[j]] = [choiceArray[j], choiceArray[i]];
    }
    return setChoiceArray(choiceArray);
  }
  useEffect(() => {
    buildPossibleChoiceArray(currentWord);
  }, [currentWord]);
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
                setPoints((prev: number) => prev + 1);
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
};

export default ShowWords;
