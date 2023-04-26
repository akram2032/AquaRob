import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const data = {
  labels: [],
  datasets: [
    {
      label: 'Distance En Km',
      data: [12],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
      ],
      borderWidth: 1,
    },
  ],
};

export const Rssi = () => {
  return (<div className='grid-item3'>
    <h2>Distance En Km</h2>
    <PolarArea data={data} className="rssi" />
    <h2>RSSI</h2>
  </div>)
}
