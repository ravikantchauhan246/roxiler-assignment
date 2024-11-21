import React, { useEffect, useState } from "react";
import { getBarChartData } from "../api/api";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ month }) => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const fetchBarChartData = async () => {
      const { data } = await getBarChartData({ month });
      setBarChartData(data);
    };
    fetchBarChartData();
  }, [month]);

  const data = {
    labels: [
      "0-100",
      "100-200",
      "200-300",
      "300-400",
      "400-500",
      "500-600",
      "600-700",
      "700-800",
      "800-900",
      "900-Above",
    ],
    datasets: [
      {
        label: "Number of Items",
        data: barChartData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-[400px] p-2 flex flex-col justify-center items-center mt-2 mb-8">
      <h3 className="text-[20px]">
        BarChart - <strong>{month}</strong>
      </h3>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
