import React, { useState, useEffect } from "react";

const Raw = ({ indice }) => {
  const [data, setData] = useState("");
  // x to set intervall once
  const [x, setX] = useState(0);
  useEffect(() => {
    const fetch_ = async () => {
      const donnees = await fetch(`/api/fetchAll`);
      const json = await donnees.json();
      const { data } = json;
      const filtredData = data.filter((obj) => obj.device_id === indice);
      setData(filtredData.pop());
    };
    fetch_();
    if (x !== 0) {
      setInterval(fetch_, 10000);
    }
  }, [indice]);
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Device ID</td>
            <td>{indice}</td>
          </tr>

          <tr>
            <td>RSSI</td>
            <td>{parseFloat(data.rssi).toFixed(0)} DBm</td>
          </tr>
          <tr>
            <td>SNR</td>
            <td>{parseFloat(data.snr).toFixed(0)} Db</td>
          </tr>
          <tr>
            <td>Depth</td>
            <td>{parseFloat(data.depth).toFixed(1)} M</td>
          </tr>
          <tr>
            <td>Temperature</td>
            <td>{parseFloat(data.temperature).toFixed(1)} C</td>
          </tr>
          <tr>
            <td>Turbidity</td>
            <td>{parseFloat(data.turbidity).toFixed(1)} %</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Raw;
