import "../../css/reading.css";
const ShowWords = ({
  difficulty,
  currentWord,
  setPoints,
  choices,
  setGameState,
  lockedTo,
  setIsNewTurn,
}) => {
  const {
    firstWordURL,
    secondWordURL,
    currentWordURL,
    firstWord,
    choiceArray,
  } = choices;
  let clickable = true;

  function AddPoint() {
    setPoints((prev) => prev + 1);
  }

  function handleButtonClick(url: string, isChangeWord: boolean) {
    console.log("FROM READING locked too", lockedTo);
    if (!clickable) return;
    clickable = false;
    if (isChangeWord)
      setTimeout(() => {
        AddPoint();
        if (lockedTo === "reading") {
          console.log("FROM READING");
          setIsNewTurn((prev) => !prev);
        } else {
          console.log("FROM asdasdasdREADING");
          setGameState("spelling");
        }
      }, 1000);
    setTimeout(() => {
      clickable = true;
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
                style={{ backgroundColor: "#314266" }}
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
                style={{ backgroundColor: "#314266" }}
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
                style={{ backgroundColor: "#314266" }}
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
