import Navbar from '@/components/Navbar';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  specialty: string;
}

export default function TeamPage() {
  const team: TeamMember[] = [
    { id: 1, name: 'Santiago Aguilar', role: 'Developer', specialty: 'Programming' },
    { id: 2, name: 'Leonardo Vizcaíno', role: 'Developer', specialty: 'Programming' },
    { id: 3, name: 'Adrian Gallardo', role: 'Developer', specialty: 'Programming' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4 text-center">Nuestro Equipo</h1>
        <p className="text-center text-gray-600 mb-12">
          Conoce a los expertos que hacen posible tu aprendizaje
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition"
            >
              <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-blue-600 font-semibold mb-1">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}