import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';

async function getFeaturedCourses() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/courses`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return data.courses?.slice(0, 3) || [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export default async function Home() {
  const courses = await getFeaturedCourses();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Aprende Sin Límites</h1>
          <p className="text-xl mb-8">
            Tu futuro comienza aquí. Cursos de calidad al alcance de todos.
          </p>
          <Link
            href="/courses"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transition"
          >
            Explorar Cursos
          </Link>
        </div>
      </div>

      {/* Mission, Vision, Problem */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-3 text-blue-600">🎯 Misión</h3>
            <p className="text-gray-700">
              Democratizar la educación de calidad, haciéndola accesible para 
              todos sin importar su ubicación o recursos.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-3 text-purple-600">🔭 Visión</h3>
            <p className="text-gray-700">
              Ser la plataforma líder en educación online, transformando vidas 
              a través del conocimiento.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-3 text-green-600">💡 Problemática</h3>
            <p className="text-gray-700">
              Resolver la brecha educativa mediante tecnología accesible y 
              contenido de calidad.
            </p>
          </div>
        </div>

        {/* Featured Courses */}
        <h2 className="text-3xl font-bold mb-8 text-center">Cursos Destacados</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 AmigoAcademy. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
