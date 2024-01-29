import star from "../assets/star.png";
type PropType = {
  points: number;
  resetPoints: () => void;
};
export const ReadingPoints = ({ points, resetPoints }: PropType) => {
  const elements = Array.from({ length: points }, () => (
    <img
      className="reading-points-star"
      src={star}
      alt="Description of the image"
    />
  ));
  return (
    <div>
      <div className="reading-points-counter"> {points}</div>
      <div className="reading-points-star-container">{elements}</div>
      <button onClick={resetPoints}> RESET </button>
    </div>
  );
};
