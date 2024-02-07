import "../../css/reading.css";
type ImageType = {
  webformatURL: string;
};

type PropsType = {
  picData: ImageType[];
  currentWordSound: string;
  imageSize: "small" | "large"; // Add a prop for image size
};
const ShowPictures = ({ picData, currentWordSound, imageSize }: PropsType) => {
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
              className={`${
                imageSize === "small" ? "small-image" : "large-image"
              } other`}
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
              className={`${
                imageSize === "small" ? "small-image" : "large-image"
              } other`}
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
