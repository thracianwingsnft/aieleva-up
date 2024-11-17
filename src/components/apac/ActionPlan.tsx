import React, { useState } from 'react';
import { CheckCircle, Clock, Target, DollarSign, Megaphone } from 'lucide-react';

interface ActionItem {
  id: string;
  category: string;
  title: string;
  description: string;
  timeline: string;
  impact: 'High' | 'Medium' | 'Low';
  status: 'pending' | 'in-progress' | 'completed';
}

const actionItems: ActionItem[] = [
  {
    id: '1',
    category: 'Market Entry',
    title: 'Establish Local Partnerships',
    description: 'Identify and engage with potential distribution partners in key APAC markets.',
    timeline: 'Q2 2024',
    impact: 'High',
    status: 'in-progress',
  },
  {
    id: '2',
    category: 'Pricing',
    title: 'Regional Pricing Strategy',
    description: 'Develop market-specific pricing models based on local purchasing power.',
    timeline: 'Q2 2024',
    impact: 'High',
    status: 'pending',
  },
  {
    id: '3',
    category: 'Marketing',
    title: 'Digital Marketing Campaign',
    description: 'Launch targeted campaigns on popular APAC platforms.',
    timeline: 'Q3 2024',
    impact: 'Medium',
    status: 'pending',
  },
];

export default function ActionPlan() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems = selectedCategory === 'all'
    ? actionItems
    : actionItems.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Action Plan</h3>
          <div className="flex space-x-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="market entry">Market Entry</option>
              <option value="pricing">Pricing</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {item.category}
                  </span>
                  <h4 className="text-lg font-medium text-gray-900 mt-2">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${item.impact === 'High' ? 'bg-red-100 text-red-800' : ''}
                    ${item.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${item.impact === 'Low' ? 'bg-green-100 text-green-800' : ''}`}
                >
                  {item.impact} Impact
                </span>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {item.timeline}
                </div>
                <div className="flex items-center">
                  <span
                    className={`flex items-center
                      ${item.status === 'completed' ? 'text-green-600' : ''}
                      ${item.status === 'in-progress' ? 'text-yellow-600' : ''}
                      ${item.status === 'pending' ? 'text-gray-500' : ''}`}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Target className="h-8 w-8 text-indigo-600 mb-2" />
          <h4 className="font-medium text-gray-900">Target Markets</h4>
          <p className="text-sm text-gray-500 mt-1">Singapore, Japan, South Korea</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Clock className="h-8 w-8 text-indigo-600 mb-2" />
          <h4 className="font-medium text-gray-900">Timeline</h4>
          <p className="text-sm text-gray-500 mt-1">12-18 months rollout</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <DollarSign className="h-8 w-8 text-indigo-600 mb-2" />
          <h4 className="font-medium text-gray-900">Investment</h4>
          <p className="text-sm text-gray-500 mt-1">$2.5M initial phase</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Megaphone className="h-8 w-8 text-indigo-600 mb-2" />
          <h4 className="font-medium text-gray-900">Marketing Focus</h4>
          <p className="text-sm text-gray-500 mt-1">Digital & Partnership</p>
        </div>
      </div>
    </div>
  );
}