import ShowWords from "./ShowWords";
import "../../css/reading.css";
import ShowPictures from "./ShowPictures";
import { SetStateAction } from "react";
import { ReadingRewardPages } from "./ReadingRewardPages.js";

type Props = {
  difficulty: string;
  setGameState: React.Dispatch<SetStateAction<string>>;
  currentWord: string;
  lockedTo: string;
  setPoints: React.Dispatch<SetStateAction<number>>;
  points: number;
  changeWord: React.Dispatch<SetStateAction<string>>;
  choices: Choices;
  setIsNewTurn: React.Dispatch<SetStateAction<boolean>>;
};

type Choices = {
  firstWord: string;
  secondWord: string;
  firstWordURL: string;
  secondWordURL: string;
  picData: PicDataType[];
  currentWordURL: string;
  choiceArray: string[];
};

type PicDataType = {
  webformatURL: string;
};
const ReadingMain = (props: Props) => {
  const {
    difficulty,
    setGameState,
    currentWord,
    lockedTo,
    points,
    setPoints,
    choices,
    setIsNewTurn,
  } = props;

  if (points === 100) {
    return (
      <div>
        <ReadingRewardPages setPoints={setPoints} />
      </div>
    );
  }
  return (
    <div className="reading-main">
      <div className="reading-main-wordnpic">
        <div className="reading-pictures">
          <ShowPictures
            imageSize="large"
            currentWordSound={choices.currentWordURL}
            picData={choices.picData}
          />
        </div>
        <div className="reading-main-buttons">
          <ShowWords
            setIsNewTurn={setIsNewTurn}
            lockedTo={lockedTo}
            setGameState={setGameState}
            difficulty={difficulty}
            currentWord={currentWord}
            choices={choices}
            setPoints={setPoints}
          />
        </div>
      </div>
    </div>
  );
};

export default ReadingMain;
