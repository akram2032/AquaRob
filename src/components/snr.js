import React, { useState, useEffect } from "react";
import { API_URL } from "./config";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "RSSI / SNR",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export default function Snr({ indice }) {
  const [showDay, setShowDay] = useState(true);
  const [showWeek, setShowWeek] = useState(false);
  const [showMonth, setShowMonth] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [x, setX] = useState("1");
  const [dataSnr, setDataSnr] = useState();
  const [dataRssi, setDataRssi] = useState();
  const [triger, setTrigger] = useState(true);
  const [firstClicked, setFirstClicked] = useState(true);
  const [lastClicked, setLastClicked] = useState(null);
  useEffect(() => {
    fetchData(x);
  }, [indice, x]);
  // set the indice to fetch day data when the window load
  const Trigger = () => {
    if (triger) {
      fetchData(1);
      setTrigger(false);
    }
  };

  const classHandler = () => {
    return firstClicked && "selectedBtn";
  };
  const handleClassBtn = (e) => {
    setFirstClicked(false);
    if (lastClicked != null) {
      lastClicked.classList.remove("selectedBtn");
    }
    e.target.classList.add("selectedBtn");
    setLastClicked(e.target);
  };
  const fetchData = async (x) => {
    const urlSnr = `${API_URL}/api/fetchSnr/${x}/${indice}`;
    const urlRssi = `${API_URL}/api/fetchRssi/${x}/${indice}`;
    const dataSnr = await fetch(urlSnr);
    const dataRssi = await fetch(urlRssi);
    const data_Snr_Json = await dataSnr.json();
    const data_Rssi_Json = await dataRssi.json();
    setDataSnr(data_Snr_Json.data);
    setDataRssi(data_Rssi_Json.data);
  };
  Trigger();
  const toggle = (x) => {
    if (x === 1) {
      setShowWeek(true);
      setX("2");
      setShowMonth(false);
      setShowYear(false);
      setShowDay(false);
    } else if (x === 2) {
      setShowMonth(true);
      setX("3");
      setShowWeek(false);
      setShowYear(false);
      setShowDay(false);
    } else if (x === 3) {
      setShowYear(true);
      setX("4");
      setShowMonth(false);
      setShowWeek(false);
      setShowDay(false);
    } else if (x === 4) {
      setShowDay(true);
      setX("1");
      setShowYear(false);
      setShowMonth(false);
      setShowWeek(false);
    }
  };
  const dataYear = {
    labels: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "SNR",
        data: dataSnr,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 1)",
        yAxisID: "y",
      },
      {
        label: "RSSI",
        data: dataRssi,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 1)",
        yAxisID: "y1",
      },
    ],
  };

  const dataMonth = {
    labels: ["1st Week", "2nd Week", "3rd Week", "4th Week"],
    datasets: [
      {
        label: "SNR",
        data: dataSnr,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 1)",
        yAxisID: "y",
      },
      {
        label: "RSSI",
        data: dataRssi,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 1)",
        yAxisID: "y1",
      },
    ],
  };

  const dataWeek = {
    labels: [
      "Sunday",
      "Monday",
      "Thusday",
      "Wenesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "SNR",
        data: dataSnr,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 1)",
        yAxisID: "y",
      },
      {
        label: "RSSI",
        data: dataRssi,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 1)",
        yAxisID: "y1",
      },
    ],
  };

  const dataDay = {
    labels: [
      "0H",
      "1H",
      "2H",
      "3H",
      "4H",
      "5H",
      "6H",
      "7H",
      "8H",
      "9H",
      "10H",
      "11H",
      "12H",
      "13H",
      "14H",
      "15H",
      "16H",
      "17H",
      "18H",
      "19H",
      "20H",
      "22H",
      "23H",
    ],
    datasets: [
      {
        label: "SNR",
        data: dataSnr,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 1)",
        yAxisID: "y",
      },
      {
        label: "RSSI",
        data: dataRssi,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 1)",
        yAxisID: "y1",
      },
    ],
  };

  return (
    <>
      <div className="btnRssi">
        <button
          className={classHandler()}
          type="button"
          onClick={(e) => {
            handleClassBtn(e);
            toggle(4);
          }}
        >
          Hours
        </button>
        <button
          type="button"
          onClick={(e) => {
            handleClassBtn(e);
            toggle(1);
          }}
        >
          Days
        </button>
        {/* <button type="button" onClick={() => toggle(2)}>
          Weeks
        </button> */}
        <button
          type="button"
          onClick={(e) => {
            handleClassBtn(e);
            toggle(3);
          }}
        >
          Months
        </button>
      </div>
      <Line
        options={options}
        data={
          (showYear && dataYear) ||
          (showMonth && dataMonth) ||
          (showWeek && dataWeek) ||
          (showDay && dataDay)
        }
      />
    </>
  );
}
