import React, { useState, useEffect } from "react";
import { API_URL } from "./config";

const Raw = ({ indice }) => {
  const [data, setData] = useState("");
  // x to set intervall once
  const [x, setX] = useState(0);
  useEffect(() => {
    const fetch_ = async () => {
      const donnees = await fetch(`${API_URL}/api/fetchAll`);
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
            <td>{data.rssi} DBm</td>
          </tr>
          <tr>
            <td>SNR</td>
            <td>{data.snr} Db</td>
          </tr>
          <tr>
            <td>Temperature</td>
            <td>{data.temperature} C</td>
          </tr>
          <tr>
            <td>Turbidity</td>
            <td>{data.turbidite} %</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Raw;
