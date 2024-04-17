import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link to="/employee-directory">
          <div className="bg-white shadow-md rounded-md p-4 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Employee Directory</h2>
            <p>Click here to manage employee records.</p>
          </div>
        </Link>
        <Link to="/recruitment-management">
          <div className="bg-white shadow-md rounded-md p-4 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Recruitment Management</h2>
            <p>Click here to manage recruitment processes.</p>
          </div>
        </Link>
        <Link to="/performance-evaluation">
          <div className="bg-white shadow-md rounded-md p-4 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Performance Evaluation</h2>
            <p>Click here to evaluate employee performance.</p>
          </div>
        </Link>
        <Link to="/leave-management">
          <div className="bg-white shadow-md rounded-md p-4 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Leave Management</h2>
            <p>Click here to manage employee leave.</p>
          </div>
        </Link>
        <Link to="/analytics-reporting">
          <div className="bg-white shadow-md rounded-md p-4 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Analytics and Reporting</h2>
            <p>Click here to view analytics and reports.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
