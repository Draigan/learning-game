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
    let currentPoints: string | void | number = localStorage.getItem("points");
    console.log("Storage", currentPoints);
    if (parseInt(currentPoints) > 99) return setPoints(0);
    if (!currentPoints) {
      let pointsForStorage = 0;
      currentPoints = localStorage.setItem(
        "points",
        pointsForStorage.toString(),
      );
    }
    let getPoints = localStorage.getItem("points");
    let pointsInInt = parseInt(getPoints);
    let pointsForStorage = pointsInInt + 1;
    // If the local storage doesnt exist, create it

    localStorage.setItem("points", pointsForStorage.toString());
    setPoints(pointsForStorage);
    console.log(getPoints);
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
