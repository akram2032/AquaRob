// TODO(akram) align the input
import React, { useState, useEffect, useRef } from "react";
import { exportToCSV } from "../functions/exportTocsv";
import DownloadIcon from "@mui/icons-material/Download";
import ScrollBtn from "./Scrollbtn";
import { API_URL } from "./config";

const History = () => {
  const [allData, SetAllData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [isEmpty, setIsEmpty] = useState(false);
  const [deviceId, setDeviceId] = useState();
  const inputRef = useRef(null);

  const handleInput = (e) => {
    if (e === "") {
      setIsEmpty(false);
      setDeviceId();
      setFilteredData(allData);
    } else {
      setDeviceId(Number(e));
      const filtered = filteredData.filter(
        (obj) => obj.device_id === Number(e)
      );
      if (filtered.length === 0) setIsEmpty(true);
      setFilteredData(filtered);
    }
  };
  const handleExport = () => {
    exportToCSV(allData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const Empty = () => {
    return <p>Nothing to show :)</p>;
  };
  useEffect(() => {
    const fetch_ = async () => {
      const response = await fetch(`${API_URL}/api/fetchAll`);
      const json = await response.json();
      const { data } = json;
      const set = await SetAllData(data);
      const setFilt = await setFilteredData(data);
    };
    fetch_();
    setInterval(() => {
      fetch_();
    }, 100000);
  }, []);
  const HistoryTable = () => {
    return (
      <>
        <div className="history">
          {!isEmpty && (
            <>
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
                          <td>{obj.longetude}</td>
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
            {/* <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="number"
                placeholder="Filter by ID"
                value={deviceId}
                onChange={(e) => {
                  e.target.focus();
                  handleInput(e.target.value);
                }}
              ></input>
            </form> */}
            <button onClick={handleExport} className="button">
              <span style={{ display: "flex", alignItems: "center" }}>
                Export to CSV <DownloadIcon sx={{ ml: 0.5 }} />
              </span>
            </button>
          </div>
        </div>
        <ScrollBtn />
      </>
    );
  };
  return <>{filteredData && <HistoryTable />}</>;
};

export default History;
