import React, { useRef } from "react";

import Swatches from '../components/swatches.jsx';
import Canv from '../components/canv.jsx';

export default function Riso() {
  const [data, setData] = React.useState([]);
  const canvRef = useRef();

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

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="page">
      <Swatches data={data} />
      <Canv />
      <div className="controls">
        <button id="fun">🎲 colors</button>

        <label htmlFor="color-select">Color</label>
        <select id="color-select" name="">
          <option value="1">&nbsp;1</option>
          <option value="2">&nbsp;2</option>
          <option value="3">&nbsp;3</option>
        </select>
      </div>
    </div>
  );
}
