import React, { useState, useEffect } from "react";
import Swatches from '../components/swatches.jsx';
import Canv from '../components/canv.jsx';

/*
  TODO:
  1. Make background color depend on slider
  2. Outlines should use one of the selected colors instead of dark gray
  3. Make geometry persist between color changes
  4. Add button to refresh geometry
*/

export default function Riso() {
  const [data, setData] = useState([]);
  const [colorSelections, setColorSelections] = useState([20, 10, 13]);
  const [backgroundOn, setBackgroundOn] = useState(false);
  const [separated, setSeparated] = useState(false);

  const getData = () => {
    fetch("colorlist.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then((dat) => {
        setData(dat);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChangeColor = (newColors) => {
    setColorSelections(newColors);
  }

  const handleCheckBackground = (value) => {
    setBackgroundOn(value);
  }

  const handleCheckSeparated = (value) => {
    setSeparated(value);
  }

  const canvasColors = colorSelections.map(index => data[index]);

  return (
    <div className="page">
      <Swatches
        data={data}
        onChangeColor={handleChangeColor}
        colorSelections={colorSelections}
        onCheckBackground={handleCheckBackground}
        onCheckSeparate={handleCheckSeparated}
        backgroundOn={backgroundOn}
        separated={separated}
      />
      {data.length && (
        <Canv
          canvasColors={canvasColors}
          hasBackgroundColor={backgroundOn}
          separated={separated}
        />
      )}
    </div>
  );
}
