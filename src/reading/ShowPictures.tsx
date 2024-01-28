const ShowPictures = ({ picData }) => {
  return (
    <div>
      {picData.map((image, index: number) =>
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
