import { SetStateAction } from "react";
import star from "../../assets/star.png";
import { PointsButtons } from "./PointsButtons";
import "../../css/points.css";
type PropType = {
  points: number;
  setDifficulty: (param: string) => void;
  setPoints: (param: number) => void;
  difficulty: string;
  setLockedTo: React.Dispatch<SetStateAction<string>>;
  setGameMode: React.Dispatch<SetStateAction<string>>;
};
export const PointsMain = ({
  difficulty,
  points,
  setPoints,
  setDifficulty,
  setGameMode,
}: PropType) => {
  function playNumberSound(number: number) {
    if (number === 0) {
      return new Audio(`../numbers/en_num_0.mp3`).play();
    }
    if (number < 10) {
      return new Audio(`../numbers/en_num_0${number}.mp3`).play();
    }
    return new Audio(`../numbers/en_num_${number}.mp3`).play();
  }

  const elements = Array.from({ length: points }, (_, index) => (
    <img
      className="reading-points-star"
      key={index}
      src={star}
      alt="Description of the image"
    />
  ));

  return (
    <div className="points-container">
      <div
        className="reading-points-counter"
        onClick={() => playNumberSound(points)}
      >
        {points}
      </div>
      <div className="reading-points-star-container">{elements}</div>
      <PointsButtons
        setDifficulty={setDifficulty}
        difficulty={difficulty}
        setPoints={setPoints}
        setGameMode={setGameMode}
      />
    </div>
  );
};
