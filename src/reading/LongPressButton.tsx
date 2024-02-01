import { useState, useEffect } from "react";
type Props = {
  functionToRun: () => void;
  buttonText: string;
};
const LongPressButton = (props: Props) => {
  const { functionToRun, buttonText } = props;
  const [pressing, setPressing] = useState(false);

  let timer: number;
  const handleMouseDown = () => {
    timer = setTimeout(() => {
      setPressing(true);
      functionToRun();
    }, 5000); // Adjust the duration for your desired long-press time
  };

  const handleMouseUp = () => {
    clearTimeout(timer);
    if (pressing) {
      // Add your onClick logic here
      setPressing(false);
    }
  };
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [pressing]);

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {buttonText}
    </button>
  );
};

export default LongPressButton;
