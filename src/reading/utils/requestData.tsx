import axios from "axios";
// import { getChoices } from "./processWords";

export async function getPicData(keyword: string) {
  let api = "19800860-fd81fde52b5686725fdcf6309";
  let data;
  try {
    data = await axios.get(
      `https://pixabay.com/api/?key=${api}&q=${keyword}&image_type=photo`,
    );
    data = data.data.hits;
  } catch (err) {
    console.error(err);
  }
  return data;
}

export async function getDefData(keyword: string) {
  let data;
  try {
    data = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`,
    );
  } catch (err) {
    console.error(err);
  }
  return data;
}

// Here we are going to fetch ALL the data necessary for a single round in the reading game
// Then we are going to sanitize the data
// export async function getAllReadingData(currentWord: string, words: string[]) {
//   const {
//     firstWordURL,
//     secondWordURL,
//     currentWordURL,
//     firstWord,
//     choiceArray,
//   } = getChoices(currentWord, words);
//   const rawPicData = await getPicData(currentWord);
//
//   return {};
// }
