import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const DeviceTable = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const devices = JSON.parse(Cookies.get("devices"))
  let i = 0;
  const handleRowHover = (deviceId) => {
    setSelectedDeviceId(deviceId);
  };
  const handleDeleteClick = (deviceId) => {
    // handle delete click here
  };

  return (
    <div className="devices">
    <table>
      <thead>
        <tr>
          <th>N</th>
          <th>Country</th>
          <th>State</th>
          <th>City</th>
          <th>Added on</th>
          <th>Added by</th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => {
          i++
          return (
          <tr
            key={device.device_id}
          >
            <td>{i}</td>
            <td>{device.country}</td>
            <td>{device.state}</td>
            <td>{device.city}</td>
            <td>{device.added_on.slice(0,10)}</td>
            <td>{device.added_by}</td>
            <td>
                <button className="devicesBtn" onClick={() => handleDeleteClick(device.id)}>
                  Delete
                </button>
            </td>
          </tr>
        )})}
      </tbody>
    </table>
    </div>
  );
};

export default DeviceTable;

