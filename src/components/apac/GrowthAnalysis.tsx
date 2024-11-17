import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const marketTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Market Growth Rate (%)',
      data: [2.3, 2.8, 3.2, 3.6, 3.9, 4.2],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
    },
  ],
};

const competitorData = {
  labels: ['Company A', 'Company B', 'Company C', 'Company D', 'Company E'],
  datasets: [
    {
      label: 'Market Share (%)',
      data: [30, 25, 20, 15, 10],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(147, 51, 234, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(248, 113, 113, 0.8)',
      ],
    },
  ],
};

export default function GrowthAnalysis() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Market Growth Trends</h3>
        <div className="h-[300px]">
          <Line
            data={marketTrendData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'APAC Market Growth Rate',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Competitor Analysis</h3>
        <div className="h-[300px]">
          <Bar
            data={competitorData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Market Share Distribution',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-2">Market Size</h4>
          <p className="text-3xl font-bold text-indigo-600">$47.8B</p>
          <p className="text-sm text-gray-500">Total addressable market</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-2">Growth Rate</h4>
          <p className="text-3xl font-bold text-green-600">+4.2%</p>
          <p className="text-sm text-gray-500">Year-over-year growth</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-2">Market Position</h4>
          <p className="text-3xl font-bold text-purple-600">#4</p>
          <p className="text-sm text-gray-500">Current market ranking</p>
        </div>
      </div>
    </div>
  );
}