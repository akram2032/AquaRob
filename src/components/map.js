import React, { useState, useEffect } from "react";
import { API_URL } from "./config";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
const Map = ({ indice }) => {
  const [deviceId, setDeviceID] = useState(1);
  const [position, setPosition] = useState([36.6586, 2.9233]);
  const [temp, setTemp] = useState([0]);
  const [profondeur, setProfondeur] = useState([0]);
  const [longetude, setlongetude] = useState([0]);
  const [latitude, setLatiude] = useState([0]);
  const [rssi, setRssi] = useState([0]);
  const [snr, setsnr] = useState([0]);
  const [turbidity, setTurbidity] = useState([0]);


  //const position = [36.8, 3.1];

  useEffect(() => {
    const donnees = async () => {
      const response = await fetch(`${API_URL}/api/fetchAll/`);
      const json = await response.json();
      const { data } = json;
      const filtredData = data.filter((obj) => obj.device_id === indice);
      const donnees = filtredData.pop();
      const { temperature, device_id, latitude, longitude, altitude, snr, rssi, turbidite } = donnees;
      setTemp(temperature);
      setDeviceID(device_id);
      setPosition([longitude, latitude]);
      setProfondeur(altitude);
      setLatiude(latitude)
      setlongetude(longitude)
      setRssi(rssi)
      setsnr(snr)
      setTurbidity(turbidite)
    };
    donnees();
  }, [indice]);
  //<button onClick={() => setindice(Math.random())}>refresh</button>
  return (
    <>
      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={false}
        className="mapcontainer"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            Device ID: {deviceId}
            <br />
            Longitude : {longetude}
            <br />
            Latitude : {latitude}
            <br />
            Altitude : {profondeur} m
            <br />
            RSSI : {rssi} Dbm
            <br />
            SNR : {snr} Db
            <br />
            Temperature : {temp} C
            <br/>
            Turbidity : {turbidity} %
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};
let DefaultIcon = L.icon({
  iconUrl: "./iconss.png",
  //iconSize: [20, 41],
  iconSize: [18, 36],
});
L.Marker.prototype.options.icon = DefaultIcon;
export default Map;
