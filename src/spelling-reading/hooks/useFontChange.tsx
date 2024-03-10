import { useEffect, useState } from "react";

export default function useFontChange(points: number) {
  function getRandomFont(fonts: string[]) {
    const randomIndex = Math.floor(Math.random() * fonts.length);
    return fonts[randomIndex];
  }
  const [font, setFont] = useState<string>("Arial");
  const fonts = [
    "Arial",
    "Times New Roman",
    "Times",
    "Courier New",
    "Courier",
    "Verdana",
    "Georgia",
    "Palatino",
    "Garamond",
    "Bookman",
    "Comic Sans MS",
    "Trebuchet MS",
    "Arial Black",
    "Impact",
    "Lucida Sans Unicode",
    "Tahoma",
    "Geneva",
    "Futura",
    "Century Gothic",
    "Optima",
    "Bodoni",
    "Franklin Gothic",
    "Copperplate",
    "Didot",
    "Brush Script MT",
    "Monotype Corsiva",
    "Rockwell",
    "Ebrima",
    "Segoe UI",
    "Gill Sans",
    "Candara",
    "Avenir",
    "Helvetica Neue",
    "Baskerville",
    "Fira Sans",
    "PT Sans",
    "Roboto",
    "Lato",
    "Open Sans",
    "Montserrat",
    "Nunito",
    "Oswald",
    "Raleway",
    "Ubuntu",
  ];
  useEffect(() => {
    let font = getRandomFont(fonts);

    setFont(font);
  }, [points]);

  return { font };
}
