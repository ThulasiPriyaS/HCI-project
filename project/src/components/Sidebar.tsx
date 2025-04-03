import React from 'react';
import { MessageSquare, BarChart3, Bell, Users, Calendar } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">WorkSpace</h2>
      </div>
      
      <nav className="flex-1 px-2 py-4">
        {menuItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center px-4 py-2 mb-2 rounded-lg ${
              activeTab === id
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;