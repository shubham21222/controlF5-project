import React, { useState, useEffect } from 'react';
import EmployeeDirectory from '../src/Components/EmployeeDirectory';
import RecruitmentManagement from './Components/RecruitmentManagement';
import PerformanceEvaluation from './Components/PerformanceEvaluation';
import LeaveManagement from './Components/LeaveManagement';
import AnalyticsReporting from './Components/AnalyticsReporting';
import Login from './Components/Login';

function App() {
  // State to manage which functionality is currently active
  const [activeFunctionality, setActiveFunctionality] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  // Function to handle card click
  const handleCardClick = (functionality) => {
    setActiveFunctionality(functionality);
  };

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setUserRole(null);
  };

  return (
    <div className="bg-gray-300 min-h-screen flex flex-col items-center">
      {userRole ? (
        <div>
          <div className="bg-black w-full py-4 text-white text-center">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <button className="text-white" onClick={handleLogout}>Logout</button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {userRole === 'HR' && (
              <>
                <Card title="Employee Directory" onClick={() => handleCardClick('EmployeeDirectory')} />
                <Card title="Recruitment Management" onClick={() => handleCardClick('RecruitmentManagement')} />
                <Card title="Performance Evaluation" onClick={() => handleCardClick('PerformanceEvaluation')} />
                <Card title="Leave Management" onClick={() => handleCardClick('LeaveManagement')} />
              </>
            )}
            <Card title="Analytics & Reporting" onClick={() => handleCardClick('AnalyticsReporting')} />
          </div>
        </div>
      ) : (
        <Login setUserRole={setUserRole} />
      )}

      {/* Render the functionality component based on activeFunctionality state */}
      {activeFunctionality === 'EmployeeDirectory' && <EmployeeDirectory />}
      {activeFunctionality === 'RecruitmentManagement' && <RecruitmentManagement />}
      {activeFunctionality === 'PerformanceEvaluation' && <PerformanceEvaluation />}
      {activeFunctionality === 'LeaveManagement' && <LeaveManagement />}
      {activeFunctionality === 'AnalyticsReporting' && <AnalyticsReporting />}
    </div>
  );
}

// Card component
const Card = ({ title, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg p-4 shadow-md cursor-pointer hover:bg-gray-200 transition duration-300"
      onClick={onClick}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
};

export default App;
