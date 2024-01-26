import ShowWords from "./ShowWords";
import "../css/reading.css";
import ShowPictures from "./ShowPictures";
import { useState } from "react";

const ReadingMain = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [words] = useState([
    "Dog",
    "Cat",
    "Tree",
    "House",
    "Book",
    "Fork",
    "Leaf",
    "Star",
    "Banana",
    "Carrot",
    "Toy",
    "Train",
    "Car",
  ]);

  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  function changeWord() {
    return setCurrentWord(getRandomWord());
  }

  return (
    <div className="reading-main">
      {currentWord}
      <ShowWords />
      <ShowPictures />
      <div onClick={changeWord} style={{ backgroundColor: "black" }}>
        change word
      </div>
    </div>
  );
};

export default ReadingMain;
