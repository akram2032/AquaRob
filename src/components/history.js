// TODO(akram) finish the DB fetch
// TODO(akram) align the input 
import React, { useState } from "react";
import { API_URL } from "./config";
import { exportToCSV } from "../functions/exportTocsv";
import DownloadIcon from "@mui/icons-material/Download";
import { data } from "../constants/data";
import ScrollBtn from "./Scrollbtn";

const History = ({indice}) => {
  const allData = data;
  const [filteredData, setFilteredData] = useState(allData);
  const [isEmpty, setIsEmpty] = useState(false);
  const handleInput = (e) => {
    if (e === "") {
      setIsEmpty(false);
      setFilteredData(allData);
    } else {
      const filtered = allData.filter((obj) => obj.device_id === Number(e));
      if (filtered.length === 0) setIsEmpty(true);
      setFilteredData(filtered);
    }
  };
  //   //useEffect(() => {
  //    // const fetchData = async () => {
  //       const url = "http://localhost:8000/fetchAll";
  //       const dataJson = (await fetch(url)).json();
  //       setAllData(dataJson.data);
  //     };
  //     fetchData();
  //   });
  const handleExport = () => {
    exportToCSV(allData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const Empty = () => {
    return <p>Nothing to show :)</p>;
  };
  return (
    <>
    <div className="history">
      {!isEmpty && (
        <>
          {" "}
         <table>
            <thead>
              <tr>
                <th>Device Id</th>
                <th>Date</th>
                <th>Time</th>
                <th>Temperature</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Altitude</th>
                <th>Turbidite</th>
                <th>RSSI</th>
                <th>SNR</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((obj) => {
                return (
                  <>
                    <tr>
                      <td>{obj.device_id}</td>
                      <td>{obj.date.slice(0, 10)}</td>
                      <td>{obj.time}</td>
                      <td>{obj.temperature}</td>
                      <td>{obj.longitude}</td>
                      <td>{obj.latitude}</td>
                      <td>{obj.altitude}</td>
                      <td>{obj.turbidite}</td>
                      <td>{obj.rssi}</td>
                      <td>{obj.snr}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {isEmpty && <Empty />}
      <div className="historyOptions">
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Filter by device ID"
          onChange={(e) => handleInput(e.target.value)}
        ></input>
      </form>
      <button onClick={handleExport} className="button">
          <span style={{ display: "flex", alignItems: "center" }}>
            Export to CSV <DownloadIcon sx={{ ml: 0.5 }} />
          </span>
       </button>
      </div>
    </div>
    <ScrollBtn/>
    </>
  );
};

export default History;
