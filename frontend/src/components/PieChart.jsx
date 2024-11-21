import React, { useEffect, useState } from 'react'
import { getPieChartData } from '../api/api'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ month }) => {
    const [pieChartData, setPieChartData] = useState([]);
    
    useEffect(() => {
        const fetchPieChartData = async () => {
            const { data } = await getPieChartData({month});
            setPieChartData(data);
        };
        fetchPieChartData();
    },[month]);

    const options = {
        responsive: true,
        maintainAspectRatio: false
    };

    if (pieChartData.length === 0) {
        return <div>Loading...</div>;
    }

    const data  = {
        labels: pieChartData.map((item) => item._id),
        datasets:[
            {
                label:"# of Items",
                data: pieChartData.map((item) => item.count),
                backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor:[
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth:4
            }
        ]
    }
    ;
  return (
    <div className='w-[400px] h-[400px] p-4'>
        <Pie data={data} options={options} />
    </div>
  )
}

export default PieChart