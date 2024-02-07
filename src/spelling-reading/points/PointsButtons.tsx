import { SetStateAction } from "react";
import LongPressButton from "./LongPressButton";

type Props = {
  difficulty: string;
  setDifficulty: React.Dispatch<SetStateAction<string>>;
  setGameMode: React.Dispatch<SetStateAction<string>>;
  setPoints: (param: number) => void;
};

export const PointsButtons = (props: Props) => {
  const { difficulty, setDifficulty, setPoints, setGameMode } = props;

  function handleDifficulty() {
    if (difficulty === "easy") {
      return setDifficulty("hard");
    } else {
      return setDifficulty("easy");
    }
  }
  return (
    <div>
      <LongPressButton
        buttonText={difficulty}
        functionToRun={() => {
          handleDifficulty();
        }}
      />
      <LongPressButton
        buttonText="Set to 100"
        functionToRun={() => {
          setPoints(100);
        }}
      />
      <LongPressButton
        buttonText="CLEAR"
        functionToRun={() => {
          setPoints(0);
        }}
      />
      <LongPressButton
        buttonText="reading"
        functionToRun={() => {
          setGameMode("reading");
        }}
      />
      <LongPressButton
        buttonText="DUAL"
        functionToRun={() => {
          setGameMode("dual");
        }}
      />
      <LongPressButton
        buttonText="spelling"
        functionToRun={() => {
          setGameMode("spelling");
        }}
      />
    </div>
  );
};
