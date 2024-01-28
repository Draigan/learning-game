import ShowWords from "./ShowWords";
import "../css/reading.css";
import ShowPictures from "./ShowPictures";
import { useEffect, useState } from "react";
import { getDefData, getPicData } from "./utils/requestData.jsx";
import { AxiosResponse } from "axios";
const ReadingMain = () => {
  const [currentWord, setCurrentWord] = useState("tree");
  const [picData, setPicData] = useState([]);
  const [defData, setDefData] = useState(null);
  console.log(defData); // to get compiler to shut up.
  const [loading, setLoading] = useState(false);
  const [words] = useState([
    "Dog",
    "Laundy",
    "Yellow",
    "Guitar",
    "Piano",
    "Up",
    "Down",
    "Grass",
    "Doctor",
    "Police",
    "Fireman",
    "Teacher",
    "Hands",
    "Feet",
    "Nose",
    "Cheese",
    "Crackers",
    "Chicken",
    "Teeth",
    "Shower",
    "Music",
    "Cat",
    "Tree",
    "House",
    "Book",
    "Utensils",
    "Shirt",
    "Jacket",
    "Shoes",
    "Computer",
    "Television",
    "Fridge",
    "Leaf",
    "Star",
    "Banana",
    "Carrot",
    "Toy",
    "Train",
    "Bus",
    "Sky",
    "Water",
    "Shark",
    "Red",
    "Green",
    "Blue",
    "Pencil",
    "Crayon",
    "Paint",
    "Sun",
    "Backpack",
    "Summer",
    "Fall",
    "Winter",
    "Christmas",
    "Birthday",
    "Moon",
    "Mars",
    "Car",
  ]);

  function getRandomWord() {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    if (currentWord === randomWord) return getRandomWord();
    return randomWord;
  }

  function changeWord() {
    const randomWord = getRandomWord();
    return setCurrentWord(randomWord);
  }

  function playSoundWord(url: string) {
    return new Audio(url).play();
  }
  type DefDataType = {
    data: {
      phonetics: PhoneticType[];
    }[];
  };
  type PhoneticType = {
    audio: string;
  };
  useEffect(() => {
    async function setPicAndDefData() {
      setLoading(true);

      // Request data
      const picData = await getPicData(currentWord);
      const defData: AxiosResponse<DefDataType> = await getDefData(currentWord);
      // Check the requests to make sure all our data is available
      const isMissingData = () => {
        let missingData = true;
        if (picData.length === 0 || defData === undefined) {
          return true; // Important that we return here because defData could be null in the next usage
        }
        defData.data[0].phonetics.forEach((element: any) => {
          if (element.audio !== "") {
            missingData = false;
          }
        });
        return missingData;
      };

      if (isMissingData()) {
        console.log("We are missing data");
        changeWord();
      } else {
        setPicData(picData);
        setDefData(defData);
        setLoading(false);
        let audioURL = defData.data[0].phonetics[0].audio;
        const arrayToSearchForAudio = defData.data[0].phonetics;
        // We know we have the audio file since isMissingData() == false
        // but we dont know which array contains it.  So we have to look for it
        for (let i = 0; i < arrayToSearchForAudio.length; i++) {
          if (arrayToSearchForAudio[i].audio !== "") {
            audioURL = arrayToSearchForAudio[i].audio;
            break; // We found an audio file and one is enough
          }
        }
        playSoundWord(audioURL);
      }
    }
    setPicAndDefData();
  }, [currentWord]);

  if (!loading) {
    return (
      <div className="reading-main">
        <ShowPictures picData={picData} />
        <ShowWords
          currentWord={currentWord}
          words={words}
          changeWord={changeWord}
        />
      </div>
    );
  }
};

export default ReadingMain;
