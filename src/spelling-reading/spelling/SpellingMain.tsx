import { useEffect, useState } from "react";
import SpellingButtons from "./SpellingButtons";
import { SpellingInput } from "./SpellingInput";
import { checkForWinCondition } from "./utils/checkForWinCondition";
import "../../css/spelling.css";
import { SpellingHeader } from "./SpellingHeader";
type ImageType = {
  webformatURL: string;
};
type Props = {
  setGameState: React.Dispatch<React.SetStateAction<string>>;
  picData: ImageType[];
  currentWord: string;
  lockedTo: string;
  currentWordSound: string;
  setIsNewTurn: React.Dispatch<React.SetStateAction<boolean>>;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
};
export const SpellingMain = (props: Props) => {
  const {
    lockedTo,
    setGameState,
    setIsNewTurn,
    currentWord,
    currentWordSound,
    setPoints,
  } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const isWin = checkForWinCondition(currentWord.toUpperCase(), inputValue);

  useEffect(() => {
    if (isWin) {
      setTimeout(() => new Audio(currentWordSound).play(), 800);
      setTimeout(() => {
        if (lockedTo !== "spelling") {
          setGameState("reading");
        }
        setIsNewTurn((prev) => !prev);
        setPoints((prev) => prev + 1);
      }, 1300);
    }
  }, [inputValue]);

  if (true) {
    return (
      <div className="spelling-main">
        <SpellingHeader
          currentWordSound={currentWordSound}
          currentWord={currentWord}
          inputValue={inputValue}
        />
        <SpellingInput inputValue={inputValue} />
        <SpellingButtons
          inputValue={inputValue}
          currentWord={currentWord}
          setInputValue={setInputValue}
        />
      </div>
    );
  }
};
