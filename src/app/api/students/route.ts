import { NextRequest, NextResponse } from 'next/server';
import { getAllStudents, createStudent } from '@/lib/studentStore';

export const dynamic = 'force-dynamic';

// GET /api/students — List all students
export async function GET() {
  try {
    const students = getAllStudents();
    return NextResponse.json({ success: true, data: students });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

// POST /api/students — Create a new student
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, dateOfBirth, major } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { success: false, error: 'First name, last name and email are required' },
        { status: 400 }
      );
    }

    const student = createStudent({ firstName, lastName, email, phone, dateOfBirth, major });
    return NextResponse.json({ success: true, data: student }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create student' },
      { status: 500 }
    );
  }
}
