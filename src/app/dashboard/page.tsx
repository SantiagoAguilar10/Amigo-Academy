'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { BookOpen, TrendingUp } from 'lucide-react';
import { Course } from '@/types';

interface EnrolledCourse {
  courseId: Course;
  progress: number;
  completedLessons: number[];
  enrolledAt: Date;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      fetchEnrolledCourses();
    }
  }, [status, router]);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await fetch('/api/user/enrolled');
      const data = await response.json();
      
      if (data.success) {
        setEnrolledCourses(data.courses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Bienvenido, {session?.user?.name}
          </h1>
          <p className="text-gray-600">
            Continúa tu aprendizaje donde lo dejaste
          </p>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">
              No estás inscrito en ningún curso
            </h3>
            <p className="text-gray-600 mb-6">
              Explora nuestro catálogo y comienza a aprender
            </p>
            <button
              onClick={() => router.push('/courses')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Ver Cursos
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((enrollment) => (
              <div
                key={enrollment.courseId._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                  <BookOpen size={48} className="text-blue-600" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {enrollment.courseId.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {enrollment.courseId.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progreso</span>
                      <span className="text-sm font-bold text-blue-600">
                        {enrollment.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${enrollment.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push(`/courses/${enrollment.courseId._id}`)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <TrendingUp size={16} />
                    Continuar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}