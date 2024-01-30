import { getChoices } from "./utils/processWords.js";
import ShowWords from "./ShowWords";
import "../css/reading.css";
import ShowPictures from "./ShowPictures";
import { useEffect, useState } from "react";
import { getDefData, getPicData } from "./utils/requestData.jsx";
import { AxiosResponse } from "axios";
import { ReadingPoints } from "./ReadingPoints.js";

type ChoiceArrayType = {
  firstWord: string;
  secondWord: string;
  firstWordURL: string;
  secondWordURL: string;
  currentWordURL: string;
  choiceArray: string[];
};

type DefDataType = {
  data: {
    phonetics: PhoneticType[];
  }[];
};

type PhoneticType = {
  audio: string;
};

const ReadingMain = () => {
  const [currentWord, setCurrentWord] = useState("Cheese");
  const [points, setPoints] = useState(0);
  const [picData, setPicData] = useState([]);
  const [defData, setDefData] = useState(null);
  defData ? "cool" : "Shutup"; //shut up compiler
  const [difficulty, setDifficulty] = useState("easy");
  const [choiceArray, setChoiceArray] = useState<ChoiceArrayType>({
    firstWord: "dog",
    secondWord: "cat",
    firstWordURL: null,
    secondWordURL: null,
    currentWordURL: null,
    choiceArray: ["dog", "cat", "bird"],
  });
  const [currentWordSound, setCurrentWordSound] = useState("");
  const [loading, setLoading] = useState(false);
  const [words] = useState([
    "Dog",
    "Laundry",
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
    "Phone",
    "Tablet",
    "Friend",
    "Egg",
    "Cactus",
    "Plant",
    "Ice",
    "Fire",
    "Hammer",
    "Space",
    "Truck",
    "Tractor",
    "Dear",
    "Fox",
    "Snake",
    "Lake",
    "Ocean",
    "River",
    "Cup",
    "Plate",
    "Heater",
    "Humidifier",
    "Eggplant",
    "Socks",
    "Skates",
    "Towel",
    "Keyboard",
    "Pen",
    "Paper",
    "Bug",
    "Spider",
    "Turtle",
    "Giraffe",
    "Lion",
    "Cheetah",
    "Hyena",
    "Octopus",
    "Fish",
    "Eel",
    "Bird",
    "Blanket",
    "Coffee",
    "Tea",
    "Juice",
    "Poridge",
    "Glasses",
    "Desk",
    "Table",
    "Couch",
    "Glass",
    "Plastic",
    "Metal",
    "Moon",
    "Mouse",
    "Mars",
    "Car",
    "Zebra",
    "Window",
    "Door",
    "Garage",
    "Plant",
    "Rock",
  ]);
  function getRandomWord() {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    if (currentWord === randomWord) return getRandomWord();
    return randomWord;
  }

  useEffect(() => {
    console.log(getChoices(currentWord, words), "Choices");
  }, [currentWord]);
  function changeWord() {
    return setCurrentWord(getRandomWord());
  }
  function resetPoints() {
    return setPoints(0);
  }

  function playSoundWord(url: string) {
    return new Audio(url).play();
  }

  // This is where we handle our incoming data and set it
  useEffect(() => {
    // Before we request our data we need to know which data.
    //So we are going to get the other two multiple choices
    //because we need to get their sounds
    function buildPossibleChoiceArray(currentWord: string) {
      // These are the other two choices besides the currentt word
      // We are going to make sure they are not the same before we move on
      let wordOne: string;
      let wordTwo: string;
      do {
        wordOne = getRandomWord();
        wordTwo = getRandomWord();
      } while (wordOne === wordTwo);
      const choiceArray = [currentWord, wordOne, wordTwo];

      //Shuffle the elements
      for (let i = choiceArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at i and j
        [choiceArray[i], choiceArray[j]] = [choiceArray[j], choiceArray[i]];
      }
      return {
        firstWord: wordOne,
        secondWord: wordTwo,
        firstWordURL: null,
        secondWordURL: null,
        currentWordURL: null,
        choiceArray: choiceArray,
      };
    }
    async function setPicAndDefData() {
      setLoading(true);
      // This is where we declare our choiceArray which is the options in the game
      // After this we are going to pass is to the other components from here
      const choiceArray = buildPossibleChoiceArray(currentWord);

      // Request data
      const picData = await getPicData(currentWord);
      const defData: AxiosResponse<DefDataType> = await getDefData(currentWord);

      const secondWordAudioData: AxiosResponse<DefDataType> = await getDefData(
        choiceArray.secondWord,
      );

      const firstWordAudioData: AxiosResponse<DefDataType> = await getDefData(
        choiceArray.firstWord,
      );

      // Check the requests to make sure all our data is available
      const isMissingData = () => {
        let missingData = true;
        if (
          picData.length === 0 ||
          defData === undefined ||
          firstWordAudioData === undefined ||
          secondWordAudioData === undefined
        ) {
          return true; // Important that we return here because defData could be null in the next usage
        }
        // Go through all the indexs and check if any of them contain audio for the currentword
        defData.data[0].phonetics.forEach((element: any) => {
          if (element.audio !== "") {
            missingData = false;
          }
        });

        firstWordAudioData.data[0].phonetics.forEach((element: any) => {
          if (element.audio !== "") {
            missingData = false;
          }
        });

        secondWordAudioData.data[0].phonetics.forEach((element: any) => {
          if (element.audio !== "") {
            missingData = false;
          }
        });
        return missingData;
      };
      // If the data is missing, try a new word, which will update the state and give the whole thing a new request
      if (isMissingData()) {
        changeWord();
      } else {
        //Set all the variables we will be using from the data
        setPicData(picData);
        setDefData(defData);
        let audioURL: string;

        const arrayToSearchForAudio = defData.data[0].phonetics;

        // We know we have the audio file since isMissingData() == false
        // but we dont know which array contains it.  So we have to look for it
        for (let i = 0; i < arrayToSearchForAudio.length; i++) {
          if (arrayToSearchForAudio[i].audio !== "") {
            audioURL = arrayToSearchForAudio[i].audio;
            // Set the state of the sound so I can pass it to the images for playing aswell
            setCurrentWordSound(audioURL);
            break; // We found an audio file and one is enough
          }
        }
        // Same thing for the other two words
        for (let i = 0; i < firstWordAudioData.data[0].phonetics.length; i++) {
          if (firstWordAudioData.data[0].phonetics[i].audio !== "") {
            choiceArray.firstWordURL =
              firstWordAudioData.data[0].phonetics[i].audio;
            break;
          }
        }
        for (let i = 0; i < secondWordAudioData.data[0].phonetics.length; i++) {
          if (secondWordAudioData.data[0].phonetics[i].audio !== "") {
            choiceArray.secondWordURL =
              secondWordAudioData.data[0].phonetics[i].audio;
            break;
          }
        }
        choiceArray.currentWordURL = audioURL;
        setChoiceArray(choiceArray);
        setTimeout(() => {
          playSoundWord(audioURL);
        }, 1000);
        setLoading(false);
      }
    }
    // Run the function we just defined
    setPicAndDefData();
  }, [currentWord]);

  if (!loading) {
    return (
      <div className="reading-main">
        <div className="reading-main-points">
          <ReadingPoints
            resetPoints={resetPoints}
            setDifficulty={setDifficulty}
            difficulty={difficulty}
            points={points}
          />
        </div>
        <div className="reading-main-wordnpic">
          <div className="reading-pictures">
            <ShowPictures
              currentWordSound={currentWordSound}
              picData={picData}
            />
          </div>
          <div className="reading-main-buttons">
            <ShowWords
              difficulty={difficulty}
              currentWord={currentWord}
              choiceArrayObject={choiceArray}
              changeWord={changeWord}
              setPoints={setPoints}
              points={points}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default ReadingMain;
