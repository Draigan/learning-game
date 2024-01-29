import "../css/reading.css";
type ImageType = {
  webformatURL: string;
};
type PropsType = {
  picData: ImageType[];
  currentWordSound: string;
};
const ShowPictures = ({ picData, currentWordSound }: PropsType) => {
  function handleClickPictures() {
    return new Audio(currentWordSound).play();
  }
  return (
    <div onClick={handleClickPictures}>
      <div>
        {picData.map((image: ImageType, index: number) =>
          // Fancy way of saying show only 4 pictures, since there is no break; in .map
          index < 4 ? (
            <img
              className="reading-image"
              key={index}
              src={image.webformatURL}
              alt={`Image ${index}`}
            />
          ) : null,
        )}
      </div>
      <div>
        {picData.map((image: ImageType, index: number) =>
          // Fancy way of saying show only 4 pictures, since there is no break; in .map
          index >= 4 && index < 8 ? (
            <img
              className="reading-image"
              key={index}
              src={image.webformatURL}
              alt={`Image ${index}`}
            />
          ) : null,
        )}
      </div>
    </div>
  );
};

export default ShowPictures;
