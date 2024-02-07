import "../../css/spelling.css";
export const SpellingImage = ({ picData, currentWordSound }) => {
  function playSound() {
    return new Audio(currentWordSound).play();
  }
  return (
    <div className="spelling-image-container">
      <img
        onClick={playSound}
        className="spelling-image"
        src={`${picData[0].webformatURL}`}
      />
    </div>
  );
};
