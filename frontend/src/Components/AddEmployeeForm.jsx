// src/components/AddEmployeeForm.js

import React, { useState } from 'react';

const AddEmployeeForm = ({ onAddEmployee }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !position) return;
    onAddEmployee({ name, position });
    setName('');
    setPosition('');
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Add Employee</h2>
      <form onSubmit={handleSubmit} className="mt-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
