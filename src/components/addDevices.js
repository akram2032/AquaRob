import React, { useState, useEffect } from "react";
import { API_URL } from "./config";
import ScrollBtn from "./Scrollbtn";

const DeviceTable = () => {
  const [changed, setChanged] = useState(false);
  const [devices, setDevices] = useState();
  const [data_, setData_] = useState();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [idToDel, setIdToDel] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [isAddBtn, setIsAddBtn] = useState(true);
  const handleCancel = (deviceId) => {
    setShowAdd(false);
    setShowTable(true);
  };
  const handleSubmit = (e, x) => {
    //e.preventDefault();
    if (x === 1 && city && country && state) {
      setIsloading(true);
      if (
        fetch(
          `${API_URL}/api/addDevice/?opt=0&country=${country}&state=${state}&city=${city}`
        )
      ) {
        setChanged(true);
        setShowTable(true);
        setShowAdd(false);
        setIsloading(false);
      }
    } else if (x === 0 && idToDel) {
      fetch(`${API_URL}/api/addDevice/?opt=1&id=${idToDel}`);
      setChanged(true);
      setIsAddBtn(true);
    }
  };
  useEffect(() => {
    const fetch_ = async () => {
      const response = await fetch(`${API_URL}/api/fetchDevices`);
      const json = await response.json();
      const { data } = json;
      const set = await setData_(data);
    };
    fetch_();
    setChanged(false);
  }, [changed]);
  useEffect(() => {
    setDevices(data_);
    console.log(devices);
  }, [data_]);

  // device table
  const LoadingDiv = () => {
    return <div id="connecting">Adding a new device...</div>;
  };
  const RemoveForm = () => {
    return (
      <div className="removeForm">
        <form>
          <input
            type="number"
            placeholder="Enter a device ID"
            value={idToDel}
            onChange={(e) => setIdToDel(e.target.value)}
          ></input>

          <button
            className="removeBtns"
            id="cancel"
            type="submit"
            onClick={() => setIsAddBtn(true)}
          >
            Cancel
          </button>
          <button
            className="removeBtns"
            id="remove"
            type="submit"
            onClick={(e) => handleSubmit(e, 0)}
          >
            Confirm
          </button>
        </form>
      </div>
    );
  };
  const Table = () => {
    if (devices) {
      return (
        <>
          <ScrollBtn />
          <div className="devices">
            <table>
              <thead>
                <tr>
                  <th>Device ID</th>
                  <th>Country</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Added on</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device) => {
                  return (
                    <tr key={device.device_id}>
                      <td>{device.device_id}</td>
                      <td>{device.country}</td>
                      <td>{device.state}</td>
                      <td>{device.city}</td>
                      <td>{device.added_on.slice(0, 10)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="add_remove">
              {isAddBtn && (
                <>
                  {" "}
                  <button
                    className="devicesBtn add"
                    onClick={() => {
                      setShowTable(false);
                      setShowAdd(true);
                    }}
                  >
                    Add
                  </button>
                  <button
                    className="devicesBtn"
                    id="remove"
                    onClick={() => setIsAddBtn(false)}
                  >
                    Remove
                  </button>
                </>
              )}
              {!isAddBtn && <RemoveForm />}
            </div>
          </div>
        </>
      );
    } else return <></>;
  };
  // add device form
  const Add = () => {
    return (
      <div className="deviceManager">
        <h4>Add a new device</h4>
        <form id="manageDevices">
          <input
            id="country"
            type="text"
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          ></input>
          <input
            id="state"
            type="text"
            placeholder="State"
            onChange={(e) => setState(e.target.value)}
            value={state}
          ></input>
          <input
            id="city"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></input>
          <div className="deviceBtnDiv">
            <button
              type="submit"
              className="add"
              onClick={(e) => {
                handleSubmit(e, 1);
              }}
            >
              Add
            </button>

            <button
              type="button"
              className="add cancel"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };
  return (
    <>
      {showTable && <Table />}
      {showAdd && <Add />}
      {isLoading && <LoadingDiv />}
    </>
  );
};

export default DeviceTable;
