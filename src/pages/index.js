import React, { useState, useEffect } from "react";
import Swatches from '../components/swatches.jsx';
import Canv from '../components/canv.jsx';
import { ht, wd } from "@/constants.js";
import { easeOutCubic } from "@/utils/cool.js";

/*
  TODO:
  * Make background color depend on slider
  * Outlines should use one of the selected colors instead of dark gray
*/

export default function Riso () {
  const [data, setData] = useState([]);
  const [geoms, setGeoms] = useState({});
  const [colorSelections, setColorSelections] = useState([20, 10, 13]);
  const [backgroundOn, setBackgroundOn] = useState(false);
  const [separated, setSeparated] = useState(false);

  const generateGeometry = () => {
    const circles = [];
    const bumps = [];
    for (let i = 0; i < 24; i++) {
      const r = 8 + Math.round(Math.random() * 40);
      const x = Math.round(Math.random() * wd);
      const y = Math.round(Math.random() * ht);
      const tint = 0.4 + Math.random() * 0.56;
      const outlines = Math.random() > 0.5;
      const activeLayer = Math.round(easeOutCubic(Math.random()) * 2);
      circles.push({
        r, x, y, tint, outlines, activeLayer
      });
    }

    for (let i = 0; i < 8; i++) {
      const r = 16 + Math.round(Math.random() * 44);
      const x = Math.round(Math.random() * wd);
      const y = Math.round(Math.random() * ht);
      const tint = 0.4 + Math.random() * 0.56;
      const outlines = Math.random() > 0.5;
      const activeLayer = Math.round(easeOutCubic(Math.random()) * 2);
      bumps.push({
        r, x, y, tint, outlines, activeLayer
      });
    }

    setGeoms({
      circles,
      bumps,
    });
  }

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

  useEffect(() => {
    generateGeometry();
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
      <div className="btn-container">
        <button onClick={generateGeometry}>Refresh Scene 🖼️</button>
      </div>
      {data.length && (
        <Canv
          canvasColors={canvasColors}
          hasBackgroundColor={backgroundOn}
          separated={separated}
          geoms={geoms}
        />
      )}
    </div>
  );
}
