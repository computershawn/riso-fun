import React from "react";

import Swatch from "./swatch.jsx";

const Swatches = ({ data, onChangeColor, colorSelections, backgroundOn, onCheckBackground }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(colorSelections[0]);
  const [selectedLayer, setSelectedLayer] = React.useState(0);

  const handleChangeSelect = (e) => {
    const i = parseInt(e.target.value);
    setSelectedLayer(i);
    setSelectedIndex(colorSelections[i]);
  }

  const handleClicky = (i) => {
    setSelectedIndex(i);
    const updated = colorSelections.map((curr, index) => {
      return selectedLayer === index ? i : curr;
    });
    onChangeColor(updated);
  }

  const handleCheck = (e) => {
    // console.log(e.target.checked);
    onCheckBackground(e.target.checked);
  }

  const options = [
    'background',
    'layer 1',
    'layer 2',
    'layer 3',
  ];

  return (
    <>
      {data.length ? (
        <>
          <div className="swatches-container">
            <div className="dropdown">
              <select onChange={handleChangeSelect} className="dropdown">
                {options.map((opt, i) => {
                  return (
                    <option
                      key={opt}
                      value={i}
                    >
                      {opt}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="square-container">
              {data.map((d, index) => {
                return (
                  <Swatch
                    key={d.name}
                    info={d}
                    index={index}
                    isLast={index === data.length - 1}
                    selected={index === selectedIndex}
                    clicky={handleClicky}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <div className="selected-colors">
              {colorSelections.map((co, i) => {
                const colorDropStyle = { backgroundColor: data[co].hex };
                const k = `${i}${options[co]}`;
                return (<div key={k} className="selected-color" style={colorDropStyle}></div>);
              })}
            </div>
            <div className="background-status">
              <label htmlFor="bgcolor" className="input-label">Background</label>
              <input type="checkbox" id="bgcolor" name="bgcolor" onChange={handleCheck} checked={backgroundOn} />
            </div>
            {backgroundOn && (
              <div className="background-opacity">
                <label htmlFor="volume" className="input-label">α</label>
                <input type="range" id="opacity" name="opacity" min="4" max="96" />
              </div>
            )}
          </div>
        </>
      ) : (
        <h3>No colors data</h3>
      )}
    </>
  );
};

export default Swatches;
