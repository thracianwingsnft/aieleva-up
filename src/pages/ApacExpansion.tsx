import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Save } from 'lucide-react';
import DataIntegration from '../components/apac/DataIntegration';
import GrowthAnalysis from '../components/apac/GrowthAnalysis';
import ActionPlan from '../components/apac/ActionPlan';
import ReportGeneration from '../components/apac/ReportGeneration';

const tabs = [
  { id: 'data', name: 'Data Integration', icon: '📊' },
  { id: 'analysis', name: 'Growth Analysis', icon: '📈' },
  { id: 'plan', name: 'Action Plan', icon: '🎯' },
  { id: 'report', name: 'Report', icon: '📑' },
];

export default function ApacExpansion() {
  const [activeTab, setActiveTab] = useState('data');

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold text-gray-900">APAC Market Expansion</h1>
              <ChevronRight className="h-6 w-6 text-gray-400" />
              <span className="text-lg text-gray-500">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Develop and execute your APAC market entry strategy with data-driven insights
            </p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">
            <Save className="h-4 w-4 mr-2" />
            Save Progress
          </button>
        </div>

        <div className="mt-8">
          <div className="hidden sm:block">
            <nav className="flex space-x-4 bg-white p-1 rounded-xl shadow-sm" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  } px-4 py-2.5 font-medium text-sm rounded-lg flex items-center space-x-2 transition-all duration-200 relative w-full sm:w-auto justify-center`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="sm:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.icon} {tab.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mt-6"
          >
            {activeTab === 'data' && <DataIntegration />}
            {activeTab === 'analysis' && <GrowthAnalysis />}
            {activeTab === 'plan' && <ActionPlan />}
            {activeTab === 'report' && <ReportGeneration />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => {
              const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
              if (currentIndex > 0) {
                setActiveTab(tabs[currentIndex - 1].id);
              }
            }}
            className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
              activeTab === tabs[0].id ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={activeTab === tabs[0].id}
          >
            Previous Step
          </button>
          <button
            onClick={() => {
              const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
              if (currentIndex < tabs.length - 1) {
                setActiveTab(tabs[currentIndex + 1].id);
              }
            }}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 ${
              activeTab === tabs[tabs.length - 1].id ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={activeTab === tabs[tabs.length - 1].id}
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}