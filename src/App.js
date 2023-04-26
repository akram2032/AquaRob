import React, { useState, useEffect } from "react";
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
import ScrollBtn from "./components/Scrollbtn";
import { API_URL } from "./components/config";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const handleBar = () => {};
function App() {
  const [sessionKey, setSessionKey] = useState(true);
  const [userPassword, setUserPassword] = useState("");
  const [indice, setIndice] = useState(1);
  const [total, setTotal] = useState(1);

  const handleChange = (x) => {
    setIndice(x);
  };
  useEffect(() => {
    const fetch_ = async () => {
      const response = await fetch(`${API_URL}/api/fetchAll`);
      const json = await response.json();
      const { data } = json;
      const deviceIds = new Set(data.map((item) => item.device_id));
      setTotal(deviceIds.size);
    };
    fetch_();
  });
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
                  handleChange={handleChange}
                  indice={indice}
                  total={total}
                />
                <div className="grid-container">
                  <div className="map1" id="grid-item5">
                    <Map indice={indice} />
                  </div>

                  <div id="grid-item3">
                    <Chart indice={indice} />
                  </div>

                  <div id="grid-item1">
                    <Snr indice={indice} />
                  </div>

                  <div id="grid-item2">
                    <h4>Raw Telemetery</h4>
                    <Raw indice={indice} />
                  </div>

                  <div id="grid-item4">
                    <Trubidite indice={indice} />
                    <h4>Turbidity</h4>
                  </div>
                </div>
                <ScrollBtn />
              </Route>
              <Route path="/map">
                <Bar
                  indice={indice}
                  handleChange={handleChange}
                  total={total}
                />
                <div className="component-map">
                  <Map indice={indice} />
                </div>
              </Route>
              <Route path="/temperature">
                <Bar
                  indice={indice}
                  handleChange={handleChange}
                  total={total}
                />
                <div className="component">
                  <Chart indice={indice} />
                </div>
              </Route>
              <Route path="/rssisnr">
                <Bar
                  indice={indice}
                  handleChange={handleChange}
                  total={total}
                />
                <div className="component">
                  <Snr indice={indice} />
                </div>
              </Route>
              <Route path="/cp">
                <Bar />
                <ChangePass oldpass={userPassword} />
              </Route>
              <Route path="/history">
                <Bar indice={indice} handleChange={handleChange} />
                <History indice={indice} handleChange={handleChange} />
              </Route>
            </Switch>
          </>
        )}
      </Router>
    </>
  );
}
export default App;
