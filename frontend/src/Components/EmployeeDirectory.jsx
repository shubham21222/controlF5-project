import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    contact: '',
    profile_picture: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [editEmployeeData, setEditEmployeeData] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };
  
  const addEmployee = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/employees', newEmployee);
      fetchEmployees();
      setNewEmployee({
        name: '',
        position: '',
        department: '',
        contact: '',
        profile_picture: ''
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const editEmployee = async () => {
    try {
      await axios.put(`http://127.0.0.1:5000/employees/${editEmployeeData.id}`, editEmployeeData);
      fetchEmployees();
      setEditEmployeeData(null);
    } catch (error) {
      console.error('Error editing employee:', error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      employee.name.toLowerCase().includes(searchTerm) ||
      employee.position.toLowerCase().includes(searchTerm) ||
      employee.department.toLowerCase().includes(searchTerm) ||
      employee.contact.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Employee Directory</h1>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search employees..."
          className="input mb-4 rounded-full px-4 py-2 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="input"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Position"
            className="input"
            value={newEmployee.position}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, position: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Department"
            className="input"
            value={newEmployee.department}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, department: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Contact"
            className="input"
            value={newEmployee.contact}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, contact: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Profile Picture URL"
            className="input"
            value={newEmployee.profile_picture}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                profile_picture: e.target.value
              })
            }
          />
          <button
            className="btn bg-blue-500 text-white hover:bg-blue-600 rounded-md py-2 px-4"
            onClick={addEmployee}
          >
            Add Employee
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white shadow-md rounded-md p-4">
            <img
              src={employee.profile_picture}
              alt={employee.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div>
              <p className="text-lg font-semibold">{employee.name}</p>
              <p className="text-sm text-gray-600">{employee.position}</p>
              <p className="text-sm text-gray-600">{employee.department}</p>
              <p className="text-sm text-gray-600">{employee.contact}</p>
              <div className="flex mt-4">
                <button
                  className="btn bg-blue-500 text-white hover:bg-blue-600 rounded-md mr-2"
                  onClick={() => setEditEmployeeData(employee)}
                >
                  Edit
                </button>
                <button
                  className="btn bg-red-500 text-white hover:bg-red-600 rounded-md"
                  onClick={() => deleteEmployee(employee.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Edit employee modal or form */}
      {editEmployeeData && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
            <input
              type="text"
              placeholder="Name"
              className="input mb-4"
              value={editEmployeeData.name}
              onChange={(e) =>
                setEditEmployeeData({ ...editEmployeeData, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Position"
              className="input mb-4"
              value={editEmployeeData.position}
              onChange={(e) =>
                setEditEmployeeData({ ...editEmployeeData, position: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Department"
              className="input mb-4"
              value={editEmployeeData.department}
              onChange={(e) =>
                setEditEmployeeData({ ...editEmployeeData, department: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Contact"
              className="input mb-4"
              value={editEmployeeData.contact}
              onChange={(e) =>
                setEditEmployeeData({ ...editEmployeeData, contact: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Profile Picture URL"
              className="input mb-4"
              value={editEmployeeData.profile_picture}
              onChange={(e) =>
                setEditEmployeeData({ ...editEmployeeData, profile_picture: e.target.value })
              }
            />
            <div className="flex justify-end">
              <button
                className="btn bg-blue-500 text-white hover:bg-blue-600 mr-2"
                onClick={editEmployee}
              >
                Save
              </button>
              <button
                className="btn bg-gray-500 text-white hover:bg-gray-600"
                onClick={() => setEditEmployeeData(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDirectory;
