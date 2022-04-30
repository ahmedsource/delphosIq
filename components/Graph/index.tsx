import React from 'react';
import {pluck, prop, uniqBy, sortBy, reduce, map, filter, sum} from 'ramda';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Projects Chart',
    },
  },
};


const Graph = ({items}) => {
  const uniqDates = uniqBy(prop('humanDate'), sortBy(prop('date'),items))
  const dates = pluck('humanDate', uniqDates);
  const dateMapper = date => {
    console.log({date})
    const arr = pluck('amount', filter(item=> item.humanDate === date ,items))
    console.log({arr})
    return sum(arr)
  }
  const datesSums = map(dateMapper, dates);
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Signed Amount per Date',
        data: datesSums,
        backgroundColor: 'rgba(96,165,250, 0.5)',
      },
    ],
  };
  return(
    <div className='mt-6'>
      <Bar options={options} data={data} />
    </div>
  )
}

export default Graph