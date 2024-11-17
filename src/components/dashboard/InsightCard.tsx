import React from 'react';
import { ArrowRight, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Insight } from '../../types';

interface InsightCardProps {
  insight: Insight;
}

export default function InsightCard({ insight }: InsightCardProps) {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    if (insight.title === 'Market Expansion Opportunity') {
      navigate('/apac-expansion');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <Brain className="h-5 w-5 text-indigo-600" />
          </div>
        </div>
        <span className={`
          px-2.5 py-0.5 rounded-full text-xs font-medium
          ${insight.priority === 'high' ? 'bg-red-100 text-red-800' : ''}
          ${insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
          ${insight.priority === 'low' ? 'bg-green-100 text-green-800' : ''}
        `}>
          {insight.priority}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900">{insight.title}</h3>
        <p className="mt-2 text-sm text-gray-500">{insight.description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-500">{insight.createdAt}</span>
        <button 
          onClick={handleLearnMore}
          className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Learn more
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}