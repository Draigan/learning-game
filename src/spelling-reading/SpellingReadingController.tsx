import { useEffect, useState } from "react";
import ReadingMain from "./reading/ReadingMain";
import { SpellingMain } from "./spelling/SpellingMain";
import { wordList } from "./reading/data/wordList";
import { getAllReadingData } from "./reading/utils/requestData";
import { PointsMain } from "./points/PointsMain";
import { useStoreDataOnMount } from "./hooks/useStoreDataOnMount";

function SpellingReadingController() {
  // Array of words to use
  const words = wordList;
  // Endpoints to get the points from local storage and store them
  const { points, setPoints } = useStoreDataOnMount();
  const [gameState, setGameState] = useState<"spelling" | "reading">(
    "spelling",
  );
  type ChoiceArrayType = {
    firstWord: string;
    secondWord: string;
    firstWordURL: string;
    secondWordURL: string;
    picData: picDataType[];
    currentWordURL: string;
    choiceArray: string[];
  };
  type picDataType = {
    webformatURL: string;
  };
  const [difficulty, setDifficulty] = useState("hard");
  const [currentWord, setCurrentWord] = useState("Cheese");

  const [choices, setChoices] = useState<ChoiceArrayType>({
    firstWord: "dog",
    secondWord: "cat",
    firstWordURL: null,
    secondWordURL: null,
    picData: [{ webformatURL: "" }],
    currentWordURL: null,
    choiceArray: ["dog", "cat", "bir ed"],
  });
  const [loading, setLoading] = useState(false);
  const [lockedTo, setLockedTo] = useState(null);
  const [isNewTurn, setIsNewTurn] = useState(false);

  function playSoundWord(url: string) {
    return new Audio(url).play();
  }

  function setGameMode(mode: string) {
    if (mode === "reading") {
      setLockedTo("reading");
      setGameState("reading");
    } else if (mode === "spelling") {
      setLockedTo("spelling");
      setGameState("spelling");
    } else if (mode === "dual") {
      setLockedTo(null);
      setGameState("reading");
    }
  }
  function getRandomWord() {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    if (currentWord === randomWord) return getRandomWord();
    return randomWord;
  }
  function changeWord() {
    return setCurrentWord(getRandomWord());
  }
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
  // Fetch data for a new word
  useEffect(() => {
    getTurnData();
  }, [currentWord]);

  // New turn
  useEffect(() => {
    changeWord();
  }, [isNewTurn]);

  if (!loading && gameState === "reading" && lockedTo !== "spelling") {
    return (
      <div className="app-main">
        <PointsMain
          points={points}
          setDifficulty={setDifficulty}
          difficulty={difficulty}
          setPoints={setPoints}
          setLockedTo={setLockedTo}
          setGameMode={setGameMode}
        />
        <ReadingMain
          points={points}
          setPoints={setPoints}
          currentWord={currentWord}
          setGameState={setGameState}
          changeWord={changeWord}
          choices={choices}
          setIsNewTurn={setIsNewTurn}
          lockedTo={lockedTo}
          difficulty={difficulty}
        />
      </div>
    );
  }
  if (!loading && gameState === "spelling" && lockedTo !== "reading") {
    return (
      <div className="app-main">
        <div className="reading-main-points">
          <PointsMain
            points={points}
            setDifficulty={setDifficulty}
            difficulty={difficulty}
            setLockedTo={setLockedTo}
            setPoints={setPoints}
            setGameMode={setGameMode}
          />
        </div>
        <SpellingMain
          picData={choices.picData}
          setPoints={setPoints}
          currentWord={currentWord}
          setGameState={setGameState}
          setIsNewTurn={setIsNewTurn}
          currentWordSound={choices.currentWordURL}
          lockedTo={lockedTo}
        />
      </div>
    );
  }
}
export default SpellingReadingController;
