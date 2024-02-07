import axios, { AxiosResponse } from "axios";
import { getChoices } from "./processWords";

type PicDataType = {
  hits: PicItem[];
  data: [];
};
type PicItem = {
  webformatURL: string;
};

// Basic fetches for pic data and defenition data
export async function getPicData(
  keyword: string,
): Promise<PicItem[] | undefined> {
  let api = "19800860-fd81fde52b5686725fdcf6309";
  let data: AxiosResponse<PicDataType>;
  try {
    data = await axios.get<PicDataType>(
      `https://pixabay.com/api/?key=${api}&q=${keyword}&image_type=photo`,
    );
    return data.data.hits;
  } catch (err) {
    console.error(err);
  }
  return undefined;
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
export async function getAllReadingData(keyword: string, words: string[]) {
  const choices = getChoices(keyword, words);
  let rawPicData; //: AxiosResponse<>;
  let rawCurrentWordDefData; //: AxiosResponse<>;
  let rawFirstWordDefData; //: AxiosResponse<>;
  let rawSecondWordDefData; //: AxiosResponse<>;

  try {
    rawPicData = await getPicData(choices.currentWord);
    rawCurrentWordDefData = await getDefData(choices.currentWord);
    rawFirstWordDefData = await getDefData(choices.firstWord);
    rawSecondWordDefData = await getDefData(choices.secondWord);
  } catch (err) {
    console.error(
      "Exception in intial request\n",
      err,
      "The choices were:\n",
      choices,
    );
    choices.noErrors = false;
    return choices;
  }
  console.log(
    "HEADDDDER:",
    rawPicData,
    rawFirstWordDefData,
    rawSecondWordDefData,
    rawCurrentWordDefData,
  );
  // Check for missing elements
  if (
    rawPicData.length < 8 ||
    !rawFirstWordDefData ||
    !rawCurrentWordDefData ||
    !rawSecondWordDefData ||
    !rawCurrentWordDefData.data ||
    !rawFirstWordDefData.data ||
    !rawSecondWordDefData.data ||
    !rawCurrentWordDefData.data[0].phonetics ||
    !rawSecondWordDefData.data[0].phonetics ||
    !rawFirstWordDefData.data[0].phonetics
  ) {
    console.log("picData had a length of 0");
    choices.noErrors = false;
    return choices;
  }

  // Check for missing audio
  if (
    rawCurrentWordDefData &&
    !rawCurrentWordDefData?.data[0].phonetics.some(
      (element) => element.audio !== "",
    )
  ) {
    console.log("Missing audio for currentWord");
    choices.noErrors = false;
    return choices;
  }

  if (
    rawFirstWordDefData &&
    !rawFirstWordDefData?.data[0].phonetics.some(
      (element) => element.audio !== "",
    )
  ) {
    console.log("Missing audio for firstword");
    choices.noErrors = false;
    return choices;
  }

  if (
    rawSecondWordDefData &&
    !rawSecondWordDefData?.data[0].phonetics.some(
      (element) => element.audio !== "",
    )
  ) {
    console.log("Missing audio for secondword");
    choices.noErrors = false;
    return choices;
  }

  // Set the picture data
  choices.picData = rawPicData;

  // Set the audio data

  // If we can find the US version, choose it, otherwise pick what we have
  function setAudio(current, choices, key) {
    let usVersion = current.data[0].phonetics.find(
      (element) => element.audio !== "" && element.audio.slice(-6) === "us.mp3",
    );

    let altVersion = current.data[0].phonetics.find(
      (element) => element.audio !== "",
    );

    if (usVersion) {
      choices[key] = usVersion.audio;
      console.log("Using Us version", usVersion);
    } else {
      choices[key] = altVersion.audio;
    }
  }
  setAudio(rawCurrentWordDefData, choices, "currentWordURL");
  setAudio(rawFirstWordDefData, choices, "firstWordURL");
  setAudio(rawSecondWordDefData, choices, "secondWordURL");

  return choices;
}
