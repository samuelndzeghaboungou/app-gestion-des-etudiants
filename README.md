# Student Management Application

A full-stack student management system built with **Next.js**, **React**, and **TypeScript**.

## Features

✨ **Core Features**
- View all enrolled students
- Add new students to the system
- Edit student information
- Delete student records
- Filter and search students
- Display student status (active, graduated, inactive)
- View student GPA and academic major

## Tech Stack

**Frontend:**
- Next.js 15+ (React App Router)
- TypeScript
- Tailwind CSS
- React Icons

**Features:**
- Server-side rendering with Next.js
- Type-safe API calls with TypeScript
- Responsive UI with Tailwind CSS
- Modal forms for student management

## Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── page.tsx        # Home page
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── StudentDashboard.tsx
│   ├── StudentList.tsx
│   └── StudentForm.tsx
├── lib/               # Utility functions
│   └── studentService.ts
└── types/            # TypeScript type definitions
    └── student.ts
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## API Integration

The application is configured to connect to a backend API at `http://localhost:3001/api`. Update the `NEXT_PUBLIC_API_URL` environment variable to point to your backend server.

### Expected API Endpoints

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a single student
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

## Student Data Model

```typescript
{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  enrollmentDate: string;
  major: string;
  gpa: number;
  status: 'active' | 'inactive' | 'graduated';
}
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for personal or commercial purposes.
