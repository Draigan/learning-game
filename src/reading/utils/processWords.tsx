// import { wordList } from "../data/wordList";
// const words = wordList;

function getRandomWord(currentWord: string, words: string[]) {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  if (currentWord === randomWord) return getRandomWord(currentWord, words);
  return randomWord;
}

export function getChoices(currentWord: string, words: string[]) {
  // These are the other two choices besides the currentt word
  // We are going to make sure they are not the same before we move on
  let wordOne: string;
  let wordTwo: string;
  do {
    wordOne = getRandomWord(currentWord, words);
    wordTwo = getRandomWord(currentWord, words);
  } while (wordOne === wordTwo);
  const choiceArray = [currentWord, wordOne, wordTwo];

  //Shuffle the elements
  for (let i = choiceArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at i and j
    [choiceArray[i], choiceArray[j]] = [choiceArray[j], choiceArray[i]];
  }
  return {
    currentWord: currentWord,
    firstWord: wordOne,
    secondWord: wordTwo,
    currentWordURL: null,
    firstWordURL: null,
    secondWordURL: null,
    choiceArray: choiceArray,
    picData: null,
    noErrors: true,
  };
}
