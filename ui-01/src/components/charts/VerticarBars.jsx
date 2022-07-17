import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

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
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 5,
    },
    line: {
      backgroundColor: `fff`,
    },
  },
  scales: {
    x: {
      grid: {
        drawOnChartArea: false,
        display: false,
      },
    },
    y: {
      display: true,
    },
  },
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(6, 182, 212, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(132, 204, 22, 0.5)",
    },
  ],
};

const VerticalBars = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-start items-start">
        <div className="w-full flex flex-row items-start justify-between p-2">
          <div>
            <div className="text-2xl">generic-title</div>
            <div className="text-slate-400">generic-range</div>
          </div>
          <div className="text-3xl text-cyan-500">generic-value</div>
        </div>
      </div>
      <Bar options={options} data={data} />
    </>
  );
};

export default VerticalBars;
