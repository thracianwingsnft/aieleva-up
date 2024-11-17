import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Calendar, Layout, MessageSquare, Settings, Share2, Users, ListTodo } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: Layout, path: '/' },
  { name: 'Проблеми', icon: ListTodo, path: '/problems' },
  { name: 'Analytics', icon: BarChart2, path: '/analytics' },
  { name: 'Calendar', icon: Calendar, path: '/calendar' },
  { name: 'Social Media', icon: Share2, path: '/social' },
  { name: 'Support', icon: MessageSquare, path: '/support' },
  { name: 'Team', icon: Users, path: '/team' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-gray-50 lg:pt-16">
      <div className="flex flex-col flex-grow overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}