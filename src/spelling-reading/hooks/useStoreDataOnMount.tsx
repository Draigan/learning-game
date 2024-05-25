import { useEffect, useState } from "react";

export const useStoreDataOnMount = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    setPoints(parseInt(localStorage.getItem("points")));
  }, []);

  useEffect(() => {
    localStorage.setItem("points", JSON.stringify(points));
  }, [points]);

  // This is where we store to local storage before leaving page
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    // Convert the data to a string (localStorage can only store strings)
    localStorage.setItem("points", JSON.stringify(points));

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
