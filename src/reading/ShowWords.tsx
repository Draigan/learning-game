// import { useRef } from "react";
import "../css/reading.css";
const ShowWords = ({
  difficulty,
  currentWord,
  changeWord,
  setPoints,
  choiceArrayObject,
  points,
}) => {
  const {
    firstWordURL,
    secondWordURL,
    currentWordURL,
    firstWord,
    choiceArray,
  } = choiceArrayObject;
  // const clickable = useRef(true);

  function AddPoint() {
    if (points > 99) return setPoints(0);
    return setPoints((prev: number) => prev + 1);
  }

  function handleButtonClick(url: string, isChangeWord: boolean) {
    // if (!clickable.current) return;
    // clickable.current = false;
    if (isChangeWord)
      setTimeout(() => {
        // clickable.current = true;
        AddPoint();
        changeWord();
      }, 1000);
    return new Audio(url).play();
  }

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
                  handleButtonClick(currentWordURL, true);
                }}
              >
                {choiceArray[index]}
              </div>
            );
          } else if (element === firstWord) {
            return (
              <div
                key={index}
                style={{ backgroundColor: "red" }}
                className="reading-button"
                onClick={() => handleButtonClick(firstWordURL, false)}
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
                onClick={() => handleButtonClick(secondWordURL, false)}
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
                // style={{ backgroundColor: "#300045" }}
                style={{ backgroundColor: "green" }}
                className="reading-button"
                onClick={() => {
                  handleButtonClick(currentWordURL, true);
                }}
              >
                {choiceArray[index]}
              </div>
            );
          } else if (element === firstWord) {
            return (
              <div
                key={index}
                style={{ backgroundColor: "blue" }}
                className="reading-button"
                onClick={() => handleButtonClick(firstWordURL, false)}
              >
                {choiceArray[index]}
              </div>
            );
          } else {
            return (
              <div
                key={index}
                style={{ backgroundColor: "purple" }}
                className="reading-button"
                onClick={() => handleButtonClick(secondWordURL, false)}
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
