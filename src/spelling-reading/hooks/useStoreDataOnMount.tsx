import { useEffect, useState } from "react";

export const useStoreDataOnMount = () => {
  const [points, setPoints] = useState(0);
  useEffect(() => {
    let temp = localStorage.getItem("points");
    let points = parseInt(temp);
    setPoints(points);
  }, []);

  useEffect(() => {
    function StoreDataOnMount() {
      let currentPoints: string | void | number =
        localStorage.getItem("points");
      if (!currentPoints) {
        let pointsForStorage = 0;
        setPoints(0);
        return (currentPoints = localStorage.setItem(
          "points",
          pointsForStorage.toString(),
        ));
      }
      console.log("Storage", typeof currentPoints);
      console.log(currentPoints, "currentPoints");
      setPoints(parseInt(currentPoints));
    }
    StoreDataOnMount();
  }, []);

  // This is where we store to local storage before leaving page
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    // Your data to be stored
    const dataToStore = points;

    // Convert the data to a string (localStorage can only store strings)
    localStorage.setItem("points", JSON.stringify(dataToStore));

    const confirmationMessage = "Are you sure you want to leave?";
    event.returnValue = confirmationMessage;
    return confirmationMessage;
  };

  useEffect(() => {
    // Add event listener when the component is mounted
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [points]);
  return { points, setPoints };
};
