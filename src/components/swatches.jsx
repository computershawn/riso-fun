import React from "react";

import Swatch from "./swatch.jsx";

const Swatches = ({
  data,
  onChangeColor,
  colorSelections,
  backgroundOn,
  separated,
  onCheckBackground,
  onCheckSeparate,
}) => {
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

  const handleToggleBackground = (e) => {
    onCheckBackground(e.target.checked);
  }

  const handleToggleSeparate = (e) => {
    onCheckSeparate(e.target.checked);
  }

  const options = [
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
            <div className="layer-ctrl">
              <label htmlFor="bgcolor" className="input-label">Background</label>
              <input type="checkbox" id="bgcolor" name="bgcolor" onChange={handleToggleBackground} checked={backgroundOn} />
            </div>
            {backgroundOn && (
              <div className="background-opacity">
                <label htmlFor="volume" className="input-label">α</label>
                <input type="range" id="opacity" name="opacity" min="4" max="96" />
              </div>
            )}
            <div className="layer-ctrl">
              <label htmlFor="separate" className="input-label">Separate Layers</label>
              <input type="checkbox" id="separate" name="separate" onChange={handleToggleSeparate} checked={separated} />
            </div>
          </div>
        </>
      ) : (
        <h3>No colors data</h3>
      )}
    </>
  );
};

export default Swatches;
