export interface Lesson {
  title: string;
  description?: string;
  type: 'video' | 'text' | 'quiz';
  content?: {
    videoUrl?: string;
    textContent?: string;
    embedCode?: string;
  };
  duration?: number;
  order: number;
  completed?: boolean;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  lessons?: Lesson[];
  instructor?: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
  isPublished?: boolean;
  enrollmentCount?: number;
  resources?: {
    title: string;
    url: string;
    type: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  googleId?: string;
  role: 'user' | 'admin';
  enrolledCourses?: {
    courseId: string | Course;
    progress: number;
    completedLessons: number[];
    enrolledAt: Date;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'pending' | 'read' | 'resolved';
  createdAt?: string;
  updatedAt?: string;
}