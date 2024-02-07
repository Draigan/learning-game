import "../../css/spelling.css";
type Props = {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  currentWord: string;
};
const SpellingButtons = (props: Props) => {
  const { setInputValue, inputValue, currentWord } = props;

  const handleButtonClick = (letter: string) => {
    const expectedLetter = currentWord[inputValue.length]?.toUpperCase();
    playSound(letter);
    if (letter === expectedLetter) {
      setInputValue((prevValue: string) => `${prevValue}${letter}`);
    }
  };

  function playSound(letter: string) {
    return new Audio(
      `../../../public/letters/${letter.toUpperCase()}.wav`,
    ).play();
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <div>
      <div className="buttons-container">
        {alphabet.split("").map((letter) => {
          const expectedLetter = currentWord[inputValue.length]?.toUpperCase();
          if (expectedLetter !== undefined && letter === expectedLetter) {
            return (
              <div
                className="button"
                style={{ backgroundColor: "green" }}
                key={letter}
                onClick={() => handleButtonClick(letter)}
              >
                {letter}
              </div>
            );
          } else {
            return (
              <div
                className="button"
                key={letter}
                onClick={() => handleButtonClick(letter)}
              >
                {letter}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SpellingButtons;
