import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AnalyticsReporting() {
  const [employeeDemographics, setEmployeeDemographics] = useState([]);
  const [recruitmentMetrics, setRecruitmentMetrics] = useState([]);
  const [performanceEvaluation, setPerformanceEvaluation] = useState([]);
  const [leaveTrends, setLeaveTrends] = useState([]);

  useEffect(() => {
    fetchEmployeeDemographics();
    fetchRecruitmentMetrics();
    fetchPerformanceEvaluation();
    fetchLeaveTrends();
  }, []);

  const fetchEmployeeDemographics = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/analytics/employee-demographics');
      setEmployeeDemographics(response.data);
    } catch (error) {
      console.error('Error fetching employee demographics:', error);
    }
  };

  const fetchRecruitmentMetrics = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/analytics/recruitment-metrics');
      setRecruitmentMetrics(response.data);
    } catch (error) {
      console.error('Error fetching recruitment metrics:', error);
    }
  };

  const fetchPerformanceEvaluation = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/analytics/performance-evaluation');
      setPerformanceEvaluation(response.data);
    } catch (error) {
      console.error('Error fetching performance evaluation:', error);
    }
  };

  const fetchLeaveTrends = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/analytics/leave-trends');
      setLeaveTrends(response.data);
    } catch (error) {
      console.error('Error fetching leave trends:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Analytics and Reporting</h1>

      {/* Employee Demographics */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Employee Demographics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {employeeDemographics.map((demo, index) => (
            <div key={index} className="bg-white shadow-md rounded-md p-4">
              <h3 className="text-lg font-semibold">{demo.age_group}</h3>
              <p>Gender: {demo.gender}</p>
              <p>Count: {demo.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recruitment Metrics */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recruitment Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recruitmentMetrics.map((metric, index) => (
            <div key={index} className="bg-white shadow-md rounded-md p-4">
              <h3 className="text-lg font-semibold">{metric.month}</h3>
              <p>Applications: {metric.applications}</p>
              <p>Hires: {metric.hires}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Evaluation */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Performance Evaluation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {performanceEvaluation.map((evaluation, index) => (
            <div key={index} className="bg-white shadow-md rounded-md p-4">
              <h3 className="text-lg font-semibold">{evaluation.year}</h3>
              <p>Average Rating: {evaluation.average_rating}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leave Trends */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Leave Trends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {leaveTrends.map((trend, index) => (
            <div key={index} className="bg-white shadow-md rounded-md p-4">
              <h3 className="text-lg font-semibold">{trend.month}</h3>
              <p>Total Leave Days: {trend.total_leave_days}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsReporting;
