import React, { useState } from 'react';
import { Plus, CheckCircle, AlertCircle } from 'lucide-react';
import TaskList from '../components/problems/TaskList';

type ProblemType = 'marketing' | 'finance' | 'management';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  aiResponse?: string;
}

export default function ProblemManagement() {
  const [selectedType, setSelectedType] = useState<ProblemType>('marketing');
  const [tasks, setTasks] = useState<Record<ProblemType, Task[]>>({
    marketing: [],
    finance: [],
    management: []
  });
  const [newTask, setNewTask] = useState('');

  const problemTypes = [
    { id: 'marketing', label: 'Маркетинг', icon: '📢' },
    { id: 'finance', label: 'Финанси', icon: '💰' },
    { id: 'management', label: 'Управление', icon: '👥' }
  ];

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks(prev => ({
        ...prev,
        [selectedType]: [
          ...prev[selectedType],
          {
            id: Date.now().toString(),
            title: newTask.trim(),
            completed: false
          }
        ]
      }));
      setNewTask('');
    }
  };

  const handleTaskComplete = (taskId: string) => {
    setTasks(prev => ({
      ...prev,
      [selectedType]: prev[selectedType].map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Управление на проблеми</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex space-x-4 mb-6">
            {problemTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id as ProblemType)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  selectedType === type.id
                    ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                placeholder="Добавете нова задача..."
                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                onClick={handleAddTask}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5 mr-1" />
                Добави
              </button>
            </div>
          </div>

          <TaskList
            tasks={tasks[selectedType]}
            onTaskComplete={handleTaskComplete}
          />
        </div>
      </div>
    </div>
  );
}