import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Mapa from "./pages/mapa";
import Usuarios from "./pages/usuarios";
import Reportes from "./pages/reportes";
import Eventos from "./pages/eventos";
import Notificaciones from "./pages/notificaciones";
import Educacion from "./pages/educacion";
import Cuestionarios from "./pages/cuestionarios";
import Admins from "./pages/admins";
import Login from "./pages/login";

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/mapa" element={<Mapa />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/admins" element={<Admins />} />
      <Route path="/cuestionarios" element={<Cuestionarios />} />
      <Route path="/educacion" element={<Educacion />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/notificaciones" element={<Notificaciones />} />
      <Route path="/reportes" element={<Reportes />} />
    </Routes>
  );
}

export default App;
