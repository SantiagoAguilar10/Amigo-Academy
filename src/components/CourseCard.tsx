'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { BookOpen, Clock } from 'lucide-react';

interface Lesson {
  title: string;
  type: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  lessons?: Lesson[];
}

interface CourseCardProps {
  course: Course;
  enrolled?: boolean;
  onEnroll?: () => void;
}

export default function CourseCard({ course, enrolled = false, onEnroll }: CourseCardProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const handleEnroll = async () => {
    if (!session) {
      alert('Debes iniciar sesión para inscribirte');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: course._id }),
      });

      const data = await response.json();

      if (data.success) {
        alert('¡Inscrito exitosamente!');
        if (onEnroll) onEnroll();
      } else {
        alert(data.error || 'Error al inscribirse');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al inscribirse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
        <BookOpen size={64} className="text-blue-600" />
      </div>
      
      <div className="p-6">
        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
          {course.category}
        </span>
        
        <h3 className="text-xl font-bold mt-3 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock size={16} className="mr-1" />
          <span>{course.lessons?.length || 0} lecciones</span>
        </div>

        {enrolled ? (
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700 transition"
          >
            Continuar Curso
          </button>
        ) : (
          <button
            onClick={handleEnroll}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Inscribiendo...' : 'Inscribirse'}
          </button>
        )}
      </div>
    </div>
  );
}