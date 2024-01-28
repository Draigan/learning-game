type ImageType = {
  largeImageURL: string;
};
type PropsType = {
  picData: ImageType[];
};
const ShowPictures = ({ picData }: PropsType) => {
  return (
    <div>
      {picData.map((image: ImageType, index: number) =>
        // Fancy way of saying show only 4 pictures, since there is no break; in .map
        index < 4 ? (
          <img
            key={index}
            style={{ width: 200 }}
            src={image.largeImageURL}
            alt={`Image ${index}`}
          />
        ) : null,
      )}
    </div>
  );
};

export default ShowPictures;
