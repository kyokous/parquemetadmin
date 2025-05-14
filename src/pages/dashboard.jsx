import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Users,
  FileText,
  Bell,
  BookOpen,
  ClipboardList,
  ShieldCheck,
  BarChart3,
  CalendarDays,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const sections = [
    { name: "Mapa", path: "/mapa", icon: <MapPin size={32} /> },
    { name: "Usuarios", path: "/usuarios", icon: <Users size={32} /> },

    {
      name: "Cuestionarios",
      path: "/cuestionarios",
      icon: <ClipboardList size={32} />,
    },
    { name: "Educación", path: "/educacion", icon: <BookOpen size={32} /> },
    { name: "Eventos", path: "/eventos", icon: <CalendarDays size={32} /> },
    {
      name: "Notificaciones",
      path: "/notificaciones",
      icon: <Bell size={32} />,
    },
    { name: "Reportes", path: "/reportes", icon: <BarChart3 size={32} /> },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Panel de Control
        </h1>

        <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            ¡Bienvenido!
          </h2>
          <p className="text-gray-500">
            Usa el panel para acceder a las distintas secciones de
            administración.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div
              key={section.name}
              onClick={() => navigate(section.path)}
              className="cursor-pointer bg-white hover:bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm transition duration-200 flex items-center gap-4"
            >
              <div className="text-blue-600">{section.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {section.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Ir a {section.name.toLowerCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
