export const SpellingHeader = ({
  inputValue,
  currentWord,
  currentWordSound,
}) => {
  const expectedLetter = currentWord[inputValue.length]?.toUpperCase();

  function isCurrentLetter(letter: string, index: number) {
    if (letter.toUpperCase() === expectedLetter && inputValue.length === index)
      return true;
    else return false;
  }

  function handleClick() {
    return new Audio(currentWordSound).play();
  }

  return (
    <div onClick={handleClick}>
      <h1>
        {currentWord.split("").map((letter: string, index: number) => {
          if (isCurrentLetter(letter, index))
            return (
              <span style={{ color: "green" }}>{letter.toUpperCase()}</span>
            );
          else return letter.toUpperCase();
        })}
      </h1>
    </div>
  );
};
