import star from "../assets/star.png";
type PropType = {
  points: number;
  setDifficulty: (param: string) => void;
  difficulty: string;
  resetPoints: () => void;
};
export const ReadingPoints = ({
  difficulty,
  points,
  // resetPoints,
  setDifficulty,
}: PropType) => {
  function handleDifficulty() {
    if (difficulty === "easy") {
      return setDifficulty("medium");
    } else if (difficulty === "medium") {
      return setDifficulty("hard");
    } else {
      setDifficulty("easy");
    }
  }

  function playNumberSound(number: number) {
    if (number === 0) {
      return new Audio(`../../public/numbers/en_num_0.mp3`).play();
    }
    if (number < 10) {
      return new Audio(`../../public/numbers/en_num_0${number}.mp3`).play();
    }
    return new Audio(`../../public/numbers/en_num_${number}.mp3`).play();
  }

  const elements = Array.from({ length: points }, () => (
    <img
      className="reading-points-star"
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
      <div>
        <button onClick={handleDifficulty}> {difficulty} </button>
      </div>
    </div>
  );
};
// <button onClick={resetPoints}> RESET </button>
