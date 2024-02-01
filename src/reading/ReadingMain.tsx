import ShowWords from "./ShowWords";
import { wordList } from "./data/wordList.js";
import "../css/reading.css";
import ShowPictures from "./ShowPictures";
import { useEffect, useState } from "react";
import { getAllReadingData } from "./utils/requestData.jsx";
import { ReadingPoints } from "./ReadingPoints.js";
import { ReadingRewardPages } from "./ReadingRewardPages.js";

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
        setChoices(data);
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

  useEffect(() => {
    function StoreDataOnMount() {
      let currentPoints: string | void | number =
        localStorage.getItem("points");
      if (!currentPoints) {
        let pointsForStorage = 0;
        setPoints(0);
        return (currentPoints = localStorage.setItem(
          "points",
          pointsForStorage.toString(),
        ));
      }
      console.log("Storage", typeof currentPoints);
      setPoints(parseInt(currentPoints));
    }
    StoreDataOnMount();
  }, []);

  // This is where we store to local storage before leaving page
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    // Your data to be stored
    const dataToStore = points;

    // Convert the data to a string (localStorage can only store strings)
    localStorage.setItem("points", JSON.stringify(dataToStore));

    const confirmationMessage = "Are you sure you want to leave?";
    event.returnValue = confirmationMessage;
    return confirmationMessage;
  };

  useEffect(() => {
    // Add event listener when the component is mounted
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [points]);

  if (!loading) {
    if (points === 100) {
      return (
        <div>
          <ReadingRewardPages setPoints={setPoints} />
        </div>
      );
    }
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
