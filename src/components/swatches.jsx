import React from "react";

import Swatch from "./swatch.jsx";

const Swatches = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(32);
  const [selectedLayer, setSelectedLayer] = React.useState(0);
  const [colorSelections, setColorSelections] = React.useState([32, 10, 14, 21]);

  const handleChangeSelect = (e) => {
    const i = parseInt(e.target.value);
    setSelectedLayer(i);
    setSelectedIndex(colorSelections[i]);
    console.log(i);
  }

  const handleClicky = (i) => {
    setSelectedIndex(i);
    const updated = colorSelections.map((curr, index) => {
      return selectedLayer === index ? i : curr;
    });
    setColorSelections(updated);
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
                    selected={index === selectedIndex}
                    clicky={handleClicky}
                  />
                );
              })}
            </div>
          </div>
          <div className="selected-colors">
            {colorSelections.map(co => {
              const colorDropStyle = {backgroundColor: data[co].hex};
              return (<div key={options[co]} className="selected-color" style={colorDropStyle}></div>);
            })}
          </div>
        </>
      ) : (
        <h3>No colors data</h3>
      )}
    </>
  );
};

export default Swatches;
