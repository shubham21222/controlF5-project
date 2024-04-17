import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LeaveManagement() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [newLeaveRequest, setNewLeaveRequest] = useState({
    leave_type: '',
    start_date: '',
    end_date: '',
    reason: ''
  });

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get('http://13.60.3.73:5000/leave-requests');
      setLeaveRequests(response.data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  const addLeaveRequest = async () => {
    try {
      await axios.post('http://13.60.3.73:5000/leave-requests', newLeaveRequest);
      fetchLeaveRequests();
      setNewLeaveRequest({
        leave_type: '',
        start_date: '',
        end_date: '',
        reason: ''
      });
    } catch (error) {
      console.error('Error adding leave request:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Leave Management</h1>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Add Leave Request</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Leave Type"
            className="input"
            value={newLeaveRequest.leave_type}
            onChange={(e) =>
              setNewLeaveRequest({ ...newLeaveRequest, leave_type: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="Start Date"
            className="input"
            value={newLeaveRequest.start_date}
            onChange={(e) =>
              setNewLeaveRequest({ ...newLeaveRequest, start_date: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="End Date"
            className="input"
            value={newLeaveRequest.end_date}
            onChange={(e) =>
              setNewLeaveRequest({ ...newLeaveRequest, end_date: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Reason"
            className="input"
            value={newLeaveRequest.reason}
            onChange={(e) =>
              setNewLeaveRequest({ ...newLeaveRequest, reason: e.target.value })
            }
          />
          <button
            className="btn bg-blue-500 text-white hover:bg-blue-600"
            onClick={addLeaveRequest}
          >
            Add Leave Request
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Leave Requests</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaveRequests.map((request) => (
            <li key={request.id} className="bg-white shadow-md rounded-md p-4">
              <p className="text-lg font-semibold">Leave Type: {request.leave_type}</p>
              <p className="text-sm text-gray-600">Start Date: {request.start_date}</p>
              <p className="text-sm text-gray-600">End Date: {request.end_date}</p>
              <p className="text-sm text-gray-600">Reason: {request.reason}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LeaveManagement;
