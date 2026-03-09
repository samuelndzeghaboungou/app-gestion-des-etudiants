import { Student, StudentFormData } from '@/types/student';

// In-memory student store (persists during serverless function lifetime)
const students: Student[] = [
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
  {
    id: '3',
    firstName: 'Ahmed',
    lastName: 'Benali',
    email: 'ahmed.benali@example.com',
    phone: '06 98 76 54 32',
    dateOfBirth: '1999-11-10',
    enrollmentDate: '2021-09-01',
    major: 'Business',
    gpa: 3.5,
    status: 'active',
  },
];

let nextId = 4;

export function getAllStudents(): Student[] {
  return [...students];
}

export function getStudentById(id: string): Student | undefined {
  return students.find((s) => s.id === id);
}

export function createStudent(data: StudentFormData): Student {
  const newStudent: Student = {
    id: String(nextId++),
    ...data,
    enrollmentDate: new Date().toISOString().split('T')[0],
    gpa: 0.0,
    status: 'active',
  };
  students.push(newStudent);
  return newStudent;
}

export function updateStudent(id: string, data: Partial<StudentFormData>): Student | null {
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return null;
  students[index] = { ...students[index], ...data };
  return students[index];
}

export function deleteStudent(id: string): boolean {
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return false;
  students.splice(index, 1);
  return true;
}
