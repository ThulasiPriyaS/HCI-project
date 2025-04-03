import React, { useState } from 'react';
import { MessageSquare, BarChart3, Bell, Users, Calendar, Search } from 'lucide-react';
import ChatSystem from './components/ChatSystem';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {activeTab === 'chat' ? 'Interactive Chat' : 'Analytics Dashboard'}
          </h1>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'chat' ? <ChatSystem /> : <Dashboard />}
        </main>
      </div>
    </div>
  );
}

export default App;