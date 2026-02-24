import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// Demo users (hardcoded - persists across serverless invocations)
// In production, replace with a database (e.g., Vercel Postgres, PlanetScale, MongoDB Atlas)
const DEMO_USERS: Array<{ id: string; name: string; email: string; passwordHash: string }> = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@gmail.com',
    // Hash of 'demo123'
    passwordHash: bcrypt.hashSync('demo123', 10),
  },
  {
    id: '2',
    name: 'Samuel Ndzegha',
    email: 's.ndzeghaboungou@esisa.ac.ma',
    passwordHash: bcrypt.hashSync('admin123', 10),
  },
];

// Runtime user store - includes demo users + registered users
// Note: Registered users won't persist across serverless cold starts on Vercel
// For persistence, connect a database
const users: Array<{ id: string; name: string; email: string; passwordHash: string }> = [...DEMO_USERS];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter email and password');
        }

        const user = users.find((u) => u.email === credentials.email);

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret-change-me',
};

export async function registerUser(name: string, email: string, password: string) {
  const existingUser = users.find((u) => u.email === email);
  
  if (existingUser) {
    throw new Error('User already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = {
    id: Math.random().toString(36).substring(7),
    name,
    email,
    passwordHash,
  };

  users.push(newUser);
  return { id: newUser.id, name: newUser.name, email: newUser.email };
}
