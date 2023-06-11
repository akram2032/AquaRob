import React, { useState, useEffect } from "react";
import Percentage from "../svg/pourcentage.js";

const Trubidite = ({indice}) => {
  const [isData, setIsData] = useState(false);
  const [turbidity, setTurbidity] = useState(0);
  // x to set intervall once
  const [x, setX] = useState(0)
  useEffect(() => {
    const fetch_ = async () => {
      const response = await fetch(`/api/fetchAll`);
      const json = await response.json();
      const { data } = json;
      const filtredData = data.filter(obj => obj.device_id === indice)
      const turbi = filtredData.pop();
      setTurbidity(turbi.turbidity);
      setIsData(true);
    };
      fetch_()
      if (x === 0) {
        setInterval(fetch_, 10000);
      }
      setX(1)
  }, [indice]);
  return (
    <>
      <Percentage percent={isData ? parseFloat(turbidity).toFixed(0) : 0} width={10}></Percentage>
    </>
  );
};

export default Trubidite;
