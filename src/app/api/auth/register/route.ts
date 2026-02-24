import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth';

// Force dynamic rendering for this API route (serverless compatible)
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const user = await registerUser(name, email, password);

    return NextResponse.json(
      { success: true, user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Registration failed' },
      { status: 400 }
    );
  }
}
