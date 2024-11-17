import React from 'react';
import { CheckCircle, Circle, Bot } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  aiResponse?: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
}

export default function TaskList({ tasks, onTaskComplete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Все още няма добавени задачи</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div
          key={task.id}
          className={`flex items-start space-x-4 p-4 rounded-lg border ${
            task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
          }`}
        >
          <button
            onClick={() => onTaskComplete(task.id)}
            className="flex-shrink-0 mt-1"
          >
            {task.completed ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          <div className="flex-1">
            <p className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
              {task.title}
            </p>
            {task.aiResponse && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Bot className="h-4 w-4 text-indigo-600" />
                  <span className="text-xs font-medium text-indigo-600">AI Отговор</span>
                </div>
                <p className="text-sm text-gray-600">{task.aiResponse}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}