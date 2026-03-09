import { Student, StudentFormData, ApiResponse } from '@/types/student';

class StudentService {
  private baseUrl = '/api/students';

  async getStudents(): Promise<Student[]> {
    try {
      const response = await fetch(this.baseUrl);
      const data: ApiResponse<Student[]> = await response.json();
      return data.data || [];
    } catch {
      return [];
    }
  }

  async getStudent(id: string): Promise<Student | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      const data: ApiResponse<Student> = await response.json();
      return data.data || null;
    } catch {
      return null;
    }
  }

  async createStudent(formData: StudentFormData): Promise<Student | null> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data: ApiResponse<Student> = await response.json();
      return data.data || null;
    } catch {
      return null;
    }
  }

  async updateStudent(id: string, formData: Partial<StudentFormData>): Promise<Student | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data: ApiResponse<Student> = await response.json();
      return data.data || null;
    } catch {
      return null;
    }
  }

  async deleteStudent(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const studentService = new StudentService();
