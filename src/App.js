import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./App.css";
import Map from "./components/map";
import Chart from "./components/chart";
import Snr from "./components/snr";
import Raw from "./components/raw";
import Trubidite from "./components/turbidite";
import RawBar from "./components/topbar-et-sidbar/barRaw";
import Bar from "./components/navbar";
import Logging from "./components/logging";
import ChangePass from "./components/cp";
import History from "./components/history";
import DeviceTable from "./components/addDevices";
import ScrollBtn from "./components/Scrollbtn";
import { API_URL } from "./components/config";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [sessionKey, setSessionKey] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [indice, setIndice] = useState(1);
  // total device that sent a message
  const [total, setTotal] = useState(1);
  // array for all the data on the database
  const [allData, setAllData] = useState();
  // set for the ids of devices that sent a message
  const [deviceIds, setDeviceIds] = useState(new Set([1]));
  // array for all the registred devices on the database
  const [devices, setDevices] = useState();
  // expiration date for cookies
  let expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 16);
  const handleChange = (x) => {
    setIndice(x);
  };
  useEffect(() => {
    const fetch_ = async () => {
      const response = await fetch(`${API_URL}/api/fetchAll`);
      const device = await fetch(`${API_URL}/api/fetchDevices`);
      const respDevice = await device.json();
      const setDevice = await setDevices(respDevice.data);
      const json = await response.json();
      const { data } = json;
      const set = await setDeviceIds(
        new Set(data.map((item) => item.device_id))
      );
      setAllData(data);
      // setup a cookie that contains all the data
      //Cookies.set("allData", data);
    };
    fetch_();
  }, []);
  useEffect(() => {
    setTotal(deviceIds.size);
    Cookies.set("devices", JSON.stringify(devices), {
      expires: expirationDate,
      sameSite: "Strict",
    });
  }, [deviceIds]);
  return (
    <>
      {(document.body.style.zoom = 1.0)}
      <Router>
        <Route exact path="/">
          <RawBar />
          <Logging
            setSessionKey={setSessionKey}
            setUserPassword={setUserPassword}
          />
        </Route>
        {sessionKey && (
          <>
            <Switch>
              <Route path="/home">
                <Bar
                  setSessionKey={setSessionKey}
                  handleChange={handleChange}
                  indice={indice}
                  total={total}
                />
                <div className="grid-container">
                  <div className="map1" id="grid-item5">
                    <Map indice={Array.from(deviceIds)[indice - 1] || 1} />
                  </div>

                  <div id="grid-item3">
                    <Chart indice={Array.from(deviceIds)[indice - 1] || 1} />
                  </div>

                  <div id="grid-item1">
                    <Snr indice={Array.from(deviceIds)[indice - 1] || 1} />
                  </div>

                  <div id="grid-item2">
                    <h4>Real Time Data</h4>
                    <Raw indice={Array.from(deviceIds)[indice - 1] || 1} />
                  </div>

                  <div id="grid-item4">
                    <Trubidite
                      indice={Array.from(deviceIds)[indice - 1] || 1}
                    />
                    <h4>Turbidity</h4>
                  </div>
                </div>
                <ScrollBtn />
              </Route>
              <Route path="/map">
                <Bar
                  setSessionKey={setSessionKey}
                  indice={indice}
                  handleChange={handleChange}
                  total={total}
                />
                <div className="component-map">
                  <Map indice={Array.from(deviceIds)[indice - 1] || 1} />
                </div>
              </Route>
              <Route path="/temperature">
                <Bar
                  setSessionKey={setSessionKey}
                  indice={indice}
                  handleChange={handleChange}
                  total={total}
                />
                <div className="component">
                  <Chart indice={Array.from(deviceIds)[indice - 1] || 1} />
                </div>
              </Route>
              <Route path="/rssisnr">
                <Bar
                  setSessionKey={setSessionKey}
                  indice={indice}
                  handleChange={handleChange}
                  total={total}
                />
                <div className="component">
                  <Snr indice={Array.from(deviceIds)[indice - 1] || 1} />
                </div>
              </Route>
              <Route path="/cp">
                <Bar />
                <ChangePass oldpass={userPassword} />
              </Route>
              <Route path="/history">
                <Bar
                  setSessionKey={setSessionKey}
                  indice={indice}
                  handleChange={handleChange}
                />
                <History allData={allData} />
              </Route>
              <Route path="/devices">
                <Bar
                  setSessionKey={setSessionKey}
                  indice={indice}
                  handleChange={handleChange}
                />
                <DeviceTable />
              </Route>
            </Switch>
          </>
        )}
      </Router>
    </>
  );
}

export default App;
