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
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{indice}</td>
          </tr>

          <tr>
            <td>RSSI</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {data.rssi ? parseFloat(data.rssi).toFixed(0) + "Dbm" : "-"}
            </td>
          </tr>
          <tr>
            <td>SNR</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{data.snr ? parseFloat(data.snr).toFixed(0) + "Db" : "-"} </td>
          </tr>
          <tr>
            <td>Depth</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {data.depth ? parseFloat(data.depth).toFixed(1) + "M" : "-"}
            </td>
          </tr>
          <tr>
            <td>Temperature</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {data.temperature
                ? parseFloat(data.temperature).toFixed(1) + "°C"
                : "-"}{" "}
            </td>
          </tr>
          <tr>
            <td>Turbidity</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {data.turbidity
                ? parseFloat(data.turbidity).toFixed(1) + "%"
                : "-"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Raw;
