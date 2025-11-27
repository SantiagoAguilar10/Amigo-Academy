import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';

async function getAllCourses() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/courses`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return data.courses || [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Todos los Cursos</h1>
        
        {courses.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No hay cursos disponibles en este momento.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}