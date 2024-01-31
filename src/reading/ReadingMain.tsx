import ShowWords from "./ShowWords";
import { wordList } from "./data/wordList.js";
import "../css/reading.css";
import ShowPictures from "./ShowPictures";
import { useEffect, useState } from "react";
import { getAllReadingData } from "./utils/requestData.jsx";
import { ReadingPoints } from "./ReadingPoints.js";

type ChoiceArrayType = {
  firstWord: string;
  secondWord: string;
  firstWordURL: string;
  secondWordURL: string;
  currentWordURL: string;
  picData: PicDataType[];
  choiceArray: string[];
};

type PicDataType = {
  webformatURL: string;
};

const ReadingMain = () => {
  const [currentWord, setCurrentWord] = useState("Cheese");
  const [points, setPoints] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [choices, setChoices] = useState<ChoiceArrayType>({
    firstWord: "dog",
    secondWord: "cat",
    firstWordURL: null,
    secondWordURL: null,
    picData: [{ webformatURL: "" }],
    currentWordURL: null,
    choiceArray: ["dog", "cat", "bird"],
  });
  const [loading, setLoading] = useState(false);
  const words = wordList;

  function changeWord() {
    return setCurrentWord(getRandomWord());
  }
  function resetPoints() {
    return setPoints(0);
  }

  function playSoundWord(url: string) {
    return new Audio(url).play();
  }
  function getRandomWord() {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    if (currentWord === randomWord) return getRandomWord();
    return randomWord;
  }
  useEffect(() => {
    let temp = localStorage.getItem("points");
    let points = parseInt(temp);
    setPoints(points);
  }, []);

  useEffect(() => {
    async function getTurnData() {
      setLoading(true);
      let data = await getAllReadingData(currentWord, words);
      if (data.noErrors) {
        console.log(data, "DATTTTTTTA");
        setChoices(data);
        // setChoiceArray(data);
        setTimeout(() => {
          playSoundWord(data.currentWordURL);
        }, 500);
        setLoading(false);
      } else {
        changeWord();
      }
    }
    getTurnData();
  }, [currentWord]);

  if (!loading) {
    return (
      <div className="reading-main">
        <div className="reading-main-points">
          <ReadingPoints
            resetPoints={resetPoints}
            setPoints={setPoints}
            setDifficulty={setDifficulty}
            difficulty={difficulty}
            points={points}
          />
        </div>
        <div className="reading-main-wordnpic">
          <div className="reading-pictures">
            <ShowPictures
              currentWordSound={choices.currentWordURL}
              picData={choices.picData}
            />
          </div>
          <div className="reading-main-buttons">
            <ShowWords
              difficulty={difficulty}
              currentWord={currentWord}
              choices={choices}
              changeWord={changeWord}
              setPoints={setPoints}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default ReadingMain;
