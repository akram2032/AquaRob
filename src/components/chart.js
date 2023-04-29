import { useEffect, useState } from "react";
import { API_URL } from "./config";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);
function Chart({ indice }) {
  const [showMonth, setShowMonth] = useState(false);
  const [showDay, setShowDay] = useState(true);
  const [showWeek, setShowWeek] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [x, setX] = useState("1");
  const [dataTemp, setDataTemp] = useState();
  const [trigger, setTrigger] = useState(true);
  const [firstClicked, setFirstClicked] = useState(true);
  const [lastClicked, setLastClicked] = useState(null);
  // Fetch the data
  useEffect(() => {
    fetchData(x);
  }, [indice, x]);
  const Trigger = () => {
    fetchData(1);
    setTrigger(false);
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
    //const url = "http://localhost:8000/api/fetchTemp/" + x;
    const data = await fetch(`${API_URL}/api/fetchTemp/${x}/${indice}`);
    const dataJson = await data.json();
    setDataTemp(dataJson.data);
  };
  if (trigger) {
    Trigger();
  }

  const toggleView = (x) => {
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
        label: "Temperature",
        data: dataTemp,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        //backgroundColor: "#2e4355",
        borderColor: "rgb(53, 162, 235)",
        tension: 0.1,
        fill: false,
        pointStyle: "point",
        pointBorderColor: "red",
        pointBackgroundColor: "red",
        showLine: true,
      },
    ],
  };
  const dataMonth = {
    labels: ["1st Week", "2nd Week", "3rd Week", "4th Week"],
    datasets: [
      {
        label: "Temperature",
        data: dataTemp,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        //backgroundColor: "#2e4355",
        borderColor: "rgb(53, 162, 235)",
        tension: 0.1,
        fill: false,
        pointStyle: "point",
        pointBorderColor: "red",
        pointBackgroundColor: "red",
        showLine: true,
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
        label: "Temperature",
        data: dataTemp,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        //backgroundColor: "#2e4355",
        borderColor: "rgb(53, 162, 235)",
        tension: 0.1,
        fill: false,
        pointStyle: "point",
        pointBorderColor: "red",
        pointBackgroundColor: "red",
        showLine: true,
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
        label: "Temperature",
        data: dataTemp,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        //backgroundColor: "#2e4355",
        borderColor: "rgb(53, 162, 235)",
        tension: 0.1,
        fill: false,
        pointStyle: "point",
        pointBorderColor: "red",
        pointBackgroundColor: "red",
        showLine: true,
      },
    ],
  };

  return (
    <>
      <div>
        <button
          className={classHandler()}
          type="button"
          onClick={(e) => {
            handleClassBtn(e);
            toggleView(4);
          }}
        >
          Hours
        </button>
        <button
          type="button"
          onClick={(e) => {
            handleClassBtn(e);
            toggleView(1);
          }}
        >
          Days
        </button>
        {/* <button type="button" onClick={() => toggleView(2)}>
          Weeks
        </button> */}
        <button
          type="button"
          onClick={(e) => {
            handleClassBtn(e);
            toggleView(3);
          }}
        >
          Months
        </button>
      </div>
      <Line
        data={
          (showMonth && dataMonth) ||
          (showWeek && dataWeek) ||
          (showDay && dataDay) ||
          (showYear && dataYear)
        }
        className="graphcontainer"
      ></Line>
    </>
  );
}

export default Chart;
