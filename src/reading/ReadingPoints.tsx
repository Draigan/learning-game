import star from "../assets/star.png";
import LongPressButton from "./LongPressButton";
type PropType = {
  points: number;
  setDifficulty: (param: string) => void;
  setPoints: (param: number) => void;
  difficulty: string;
  resetPoints: () => void;
};
export const ReadingPoints = ({
  difficulty,
  points,
  setPoints,
  setDifficulty,
}: PropType) => {
  function handleDifficulty() {
    if (difficulty === "easy") {
      return setDifficulty("hard");
    } else {
      return setDifficulty("easy");
    }
  }

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
    <div>
      <div
        className="reading-points-counter"
        onClick={() => playNumberSound(points)}
      >
        {points}
      </div>
      <div className="reading-points-star-container">{elements}</div>
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
    </div>
  );
};
