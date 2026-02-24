'use client';

import React, { useEffect, useState } from 'react';
import { Student } from '@/types/student';
import { studentService } from '@/lib/studentService';
import { FiEdit2, FiTrash2, FiUsers } from 'react-icons/fi';

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@example.com',
      phone: '06 12 34 56 78',
      dateOfBirth: '2000-05-15',
      enrollmentDate: '2022-09-01',
      major: 'Computer Science',
      gpa: 3.8,
      status: 'active',
    },
    {
      id: '2',
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@example.com',
      phone: '07 23 45 67 89',
      dateOfBirth: '2001-03-20',
      enrollmentDate: '2022-09-01',
      major: 'Engineering',
      gpa: 3.9,
      status: 'active',
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Optionally load from API later
    // loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    const data = await studentService.getStudents();
    setStudents(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      const success = await studentService.deleteStudent(id);
      if (success) {
        setStudents(students.filter((s) => s.id !== id));
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <FiUsers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No students yet</h3>
        <p className="text-gray-600">Start by adding your first student to the system</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Major</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">GPA</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {student.firstName} {student.lastName}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.major}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {student.gpa.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      student.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : student.status === 'graduated'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition">
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
