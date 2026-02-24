'use client';

import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

export default function StudentDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleAddStudent = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setRefresh(!refresh);
  };

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Management</h1>
            <p className="text-gray-600">Manage and track all student information</p>
          </div>
          <button
            onClick={handleAddStudent}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition font-semibold"
          >
            <FiPlus className="text-xl" />
            Add New Student
          </button>
        </div>
      </div>

      {showForm && <StudentForm onClose={handleFormClose} />}

      <StudentList key={refresh.toString()} />
    </div>
  );
}
