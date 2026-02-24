import axios, { AxiosInstance } from 'axios';
import { Student, StudentFormData, ApiResponse } from '@/types/student';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class StudentService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getStudents(): Promise<Student[]> {
    try {
      const response = await this.api.get<ApiResponse<Student[]>>('/students');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching students:', error);
      return [];
    }
  }

  async getStudent(id: string): Promise<Student | null> {
    try {
      const response = await this.api.get<ApiResponse<Student>>(`/students/${id}`);
      return response.data.data || null;
    } catch (error) {
      console.error('Error fetching student:', error);
      return null;
    }
  }

  async createStudent(data: StudentFormData): Promise<Student | null> {
    try {
      const response = await this.api.post<ApiResponse<Student>>('/students', data);
      return response.data.data || null;
    } catch (error) {
      console.error('Error creating student:', error);
      return null;
    }
  }

  async updateStudent(id: string, data: Partial<StudentFormData>): Promise<Student | null> {
    try {
      const response = await this.api.put<ApiResponse<Student>>(`/students/${id}`, data);
      return response.data.data || null;
    } catch (error) {
      console.error('Error updating student:', error);
      return null;
    }
  }

  async deleteStudent(id: string): Promise<boolean> {
    try {
      await this.api.delete(`/students/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting student:', error);
      return false;
    }
  }
}

export const studentService = new StudentService();
