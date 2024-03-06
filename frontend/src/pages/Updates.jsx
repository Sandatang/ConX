import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Updates = () => {
  const [updateData, setUpdateData] = useState({
    users: {
      count: 120,
      percentChange: 3.55,
    },
    incidents: {
      count: 75,
      percentChange: -2.5,
    },
    resolved: {
      count: 65,
      percentChange: 5,
    },
  });

  const pieData = {
    labels: ['Users', 'Officials', 'Volunteers'],
    datasets: [
      {
        data: [120, 50, 30],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            const total = context.dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            const currentValue = context.parsed;
            const percentage = Math.round((currentValue / total) * 100);
            label += `${percentage}%`;
            return label;
          }
        }
      },
      legend: {
        labels: {
          font: {
            size: 14
          }
        }
      }
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Updates</h2>
      <div className="flex justify-between items-center space-x-4">
       
        <div className="flex-1 bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800">USERS</h3>
          <p className="text-xl font-bold text-gray-800">{updateData.users.count}</p>
          <p className="text-sm text-green-600">+{updateData.users.percentChange}% since last week</p>
        </div>
        <div className="flex-1 bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800">Incidents</h3>
          <p className="text-xl font-bold text-gray-800">{updateData.incidents.count}</p>
          <p className="text-sm text-red-600">{updateData.incidents.percentChange}% since last week</p>
        </div>

        <div className="flex-1 bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800">Resolved</h3>
          <p className="text-xl font-bold text-gray-800">{updateData.resolved.count}</p>
          <p className="text-sm text-green-600">+{updateData.resolved.percentChange}% since last week</p>
        </div>
      </div>

      <div className="bg-white-100 p-4 rounded-md w-full max-w-xl mx-auto">
        <div className="aspect-w-1 aspect-h-1">
          <Pie data={pieData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Updates;
