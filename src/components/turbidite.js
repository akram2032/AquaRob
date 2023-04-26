import React, { useState, useEffect } from "react";
import { API_URL } from "./config";
import Percentage from "../svg/pourcentage.js";

const Trubidite = ({indice}) => {
  const [isData, setIsData] = useState(false);
  const [turbidite, setTurbidite] = useState("0");
  // x to set intervall once
  const [x, setX] = useState(0)
  useEffect(() => {
    const fetch_ = async () => {
      const response = await fetch(`${API_URL}/api/fetchAll`);
      const json = await response.json();
      const { data } = json;
      const filtredData = data.filter(obj => obj.device_id === indice)
      const turbi = filtredData.pop();
      setTurbidite(turbi.turbidite);
      setIsData(true);
    };
      fetch_()
      if (x !== 0) {
        setInterval(fetch_, 10000);
      }
  }, [indice]);
  return (
    <>
      <Percentage percent={isData ? turbidite : 0} width={10}></Percentage>
    </>
  );
};

export default Trubidite;
