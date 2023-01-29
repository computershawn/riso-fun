import React, { useState, useEffect } from "react";
import Swatches from '../components/swatches.jsx';
import Canv from '../components/canv.jsx';

export default function Riso() {
  const [data, setData] = useState([]);
  const [colorSelections, setColorSelections] = useState([32, 21, 10]);
  const [backgroundOn, setBackgroundOn] = useState(false);

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

  const canvasColors = colorSelections.map(index => data[index]);

  return (
    <div className="page">
      <Swatches
        data={data}
        onChangeColor={handleChangeColor}
        colorSelections={colorSelections}
        onCheckBackground={handleCheckBackground}
        backgroundOn={backgroundOn}
      />
      <Canv canvasColors={canvasColors} hasBackgroundColor={backgroundOn} />
    </div>
  );
}
