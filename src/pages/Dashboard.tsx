import React from 'react';
import InsightCard from '../components/dashboard/InsightCard';
import type { Insight } from '../types';

const mockInsights: Insight[] = [
  {
    id: '1',
    title: 'Market Expansion Opportunity',
    description: 'AIBEgea has identified potential growth in the APAC region based on your current market data.',
    category: 'business',
    priority: 'high',
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    title: 'Social Media Strategy Update',
    description: 'Engagement metrics suggest adjusting posting times to optimize reach.',
    category: 'marketing',
    priority: 'medium',
    createdAt: '2024-03-14',
  },
  {
    id: '3',
    title: 'Operational Efficiency',
    description: 'Process automation opportunities detected in your customer service workflow.',
    category: 'operations',
    priority: 'low',
    createdAt: '2024-03-13',
  },
];

export default function Dashboard() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
              New Analysis
            </button>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}