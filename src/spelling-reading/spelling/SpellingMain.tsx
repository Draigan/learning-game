import { useEffect, useState } from "react";
import SpellingButtons from "./SpellingButtons";
import { SpellingInput } from "./SpellingInput";
import { useIsWinCondition } from "./utils/isWinCondition";
import "../../css/spelling.css";
import { SpellingHeader } from "./SpellingHeader";
import { SpellingImage } from "./SpellingImage";
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
};
export const SpellingMain = (props: Props) => {
  const {
    lockedTo,
    setGameState,
    setIsNewTurn,
    picData,
    currentWord,
    currentWordSound,
  } = props;
  const [inputValue, setInputValue] = useState<string>("");
  console.log("Currentword from main", currentWord);
  console.log("inputValue from main", inputValue);
  const isWin = useIsWinCondition(currentWord.toUpperCase(), inputValue);

  useEffect(() => {
    if (isWin) {
      setTimeout(() => new Audio(currentWordSound).play(), 400);
      setTimeout(() => {
        if (lockedTo !== "spelling") {
          setGameState("reading");
        }
        setIsNewTurn((prev) => !prev);
      }, 1300);
    }
  }, [inputValue]);

  if (true) {
    return (
      <div className="spelling-main">
        <SpellingImage picData={picData} currentWordSound={currentWordSound} />
        <SpellingHeader currentWord={currentWord} inputValue={inputValue} />
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
