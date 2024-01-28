import axios from "axios";

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
