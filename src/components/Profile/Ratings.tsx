import useGetUserDetails from '@/hooks/useGetUserDetails';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

const Ratings = () => {
    const { rating } = useGetUserDetails();
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Rating',
                data: rating,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.3,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        scales: {
            y: {
                type: 'linear',
                ticks: {
                    stepSize: 250,
                },
            },
        },
    };

    return (
        <div className="w-[60%]">
            <h2 className='text-white'>Contest Rating</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default Ratings;
