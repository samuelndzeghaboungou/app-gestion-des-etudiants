import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Student Management System',
  description: 'Manage and track student information efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AuthProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
