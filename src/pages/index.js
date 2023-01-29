import React, { useState, useEffect } from "react";
import Swatches from '../components/swatches.jsx';
import Canv from '../components/canv.jsx';

export default function Riso() {
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([21, 10, 14, 32]);

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
    console.log('colors updated', newColors);
    setColors(newColors);
  }

  return (
    <div className="page">
      <Swatches data={data} onChangeColor={handleChangeColor} />
      <Canv colors={colors} />
      {/* <div className="controls">

      </div> */}
    </div>
  );
}
