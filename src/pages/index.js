import React, { useState, useEffect } from "react";
import Swatches from '../components/swatches.jsx';
import Canv from '../components/canv.jsx';

export default function Riso() {
  const [data, setData] = useState([]);

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

  return (
    <div className="page">
      <Swatches data={data} />
      <Canv />
      <div className="controls">

      </div>
    </div>
  );
}