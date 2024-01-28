import { useEffect, useState } from "react";
import "../css/reading.css";

const ShowWords = ({ currentWord, words }) => {
  const [choiceArray, setChoiceArray] = useState([]);

  function getRandomWord() {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    if (currentWord === randomWord) return getRandomWord();
    return randomWord;
  }

  function buildPossibleChoiceArray(currentWord) {
    // These are the other two choices besides the currentt word
    // We are going to make sure they are not the same before we move on
    let wordOne;
    let wordTwo;
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
  console.log(choiceArray);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
        fontSize: 50,
      }}
    >
      {choiceArray.map((element, index) => {
        if (currentWord === element) {
          return (
            <div
              style={{ backgroundColor: "green" }}
              className="reading-button"
            >
              {choiceArray[index]}
            </div>
          );
        } else {
          return (
            <div style={{ backgroundColor: "red" }} className="reading-button">
              {choiceArray[index]}
            </div>
          );
        }
      })}
    </div>
  );
};

export default ShowWords;
