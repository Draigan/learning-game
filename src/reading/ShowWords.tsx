import "../css/reading.css";
const ShowWords = ({
  difficulty,
  currentWord,
  changeWord,
  setPoints,
  choices,
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
    if (!clickable) return;
    clickable = false;
    if (isChangeWord)
      setTimeout(() => {
        AddPoint();
        changeWord();
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
