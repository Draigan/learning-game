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
  function handlePoints() {
    if (points > 99) return setPoints(0);
    return setPoints((prev: number) => prev + 1);
  }

  function handleButtonClick(url: string) {
    return new Audio(url).play();
  }

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
                  handleButtonClick(currentWordURL);
                  handlePoints();
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
                onClick={() => handleButtonClick(firstWordURL)}
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
                onClick={() => handleButtonClick(secondWordURL)}
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
                  handleButtonClick(currentWordURL);
                  handlePoints();
                }}
              >
                {choiceArray[index]}
              </div>
            );
          } else if (element === firstWord) {
            return (
              <div
                key={index}
                style={{ backgroundColor: "gray" }}
                className="reading-button"
                onClick={() => handleButtonClick(firstWordURL)}
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
                onClick={() => handleButtonClick(secondWordURL)}
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
