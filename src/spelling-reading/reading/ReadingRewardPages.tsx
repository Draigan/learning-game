type Props = {
  setPoints: (param: number) => void;
};
export const ReadingRewardPages = (props: Props) => {
  const { setPoints } = props;
  return (
    <>
      100
      <div>
        <img src="https://www.icegif.com/wp-content/uploads/2021/12/icegif-1655.gif" />
        <img src="https://media.tenor.com/JVSVHGaO2ucAAAAM/let%27s-fly-pam-mallard.gif" />
        <img src="https://media1.giphy.com/media/l2Sqj5f7IYVj4sSEU/giphy.gif?cid=6c09b952on3p8ewrmjwspehrwmevd9pljmsvl04gmks3oo5x&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g" />
        <img
          src="
https://media0.giphy.com/media/140ObFj9MRjRIc/giphy.gif?cid=6c09b952gl6dor1i7nq1274nzq78a9npy0vz0up7kpgpe9i9&ep=v1_gifs_search&rid=giphy.gif&ct=g
"
        />
      </div>
      <button
        onClick={() => {
          setPoints(0);
          let points = 0;
          localStorage.setItem("points", points.toString());
        }}
      >
        New Game
      </button>
    </>
  );
};
