import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const Dashboard: React.FC = () => {
  // Sample data for charts
  const pendingTasksData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      label: 'Pending Tasks',
      data: [12, 19, 8],
      backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
    }],
  };

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Performance Score',
      data: [65, 75, 70, 80, 85, 90],
      borderColor: '#3b82f6',
      tension: 0.1,
    }],
  };

  const notificationsData = {
    labels: ['Mentions', 'Meetings', 'Deadlines', 'Updates'],
    datasets: [{
      data: [30, 25, 20, 25],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
    }],
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Pending Tasks */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Pending Tasks by Priority</h2>
        <Bar data={pendingTasksData} />
      </div>

      {/* Performance Trends */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Performance Trends</h2>
        <Line data={performanceData} />
      </div>

      {/* Notifications Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Notifications Distribution</h2>
        <Doughnut data={notificationsData} />
      </div>

      {/* Quick Stats */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-700">Total Tasks</h3>
            <p className="text-2xl font-bold text-blue-900">39</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="text-sm font-medium text-green-700">Completed</h3>
            <p className="text-2xl font-bold text-green-900">24</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-700">In Progress</h3>
            <p className="text-2xl font-bold text-yellow-900">10</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="text-sm font-medium text-purple-700">Team Members</h3>
            <p className="text-2xl font-bold text-purple-900">8</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;