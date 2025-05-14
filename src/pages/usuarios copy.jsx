import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan Pérez", email: "juan@example.com" },
    { id: 2, nombre: "Ana García", email: "ana@example.com" },
  ]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const manejarGuardar = () => {
    if (!nombre || !email) return;

    if (editandoId) {
      setUsuarios((prev) =>
        prev.map((u) => (u.id === editandoId ? { ...u, nombre, email } : u))
      );
      setEditandoId(null);
    } else {
      const nuevoUsuario = {
        id: Date.now(),
        nombre,
        email,
      };
      setUsuarios((prev) => [...prev, nuevoUsuario]);
    }

    setNombre("");
    setEmail("");
  };

  const manejarEditar = (usuario) => {
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setEditandoId(usuario.id);
  };

  const manejarEliminar = (id) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Gestión de Usuarios</h1>

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">
            {editandoId ? "Editar usuario" : "Agregar nuevo usuario"}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="px-4 py-2 border rounded w-full"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border rounded w-full"
            />
          </div>
          <button
            onClick={manejarGuardar}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus size={18} />
            {editandoId ? "Actualizar" : "Agregar"}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Lista de Usuarios</h2>
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="text-gray-600">
                <th className="pb-2">Nombre</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="border-t text-gray-800">
                  <td className="py-2">{usuario.nombre}</td>
                  <td className="py-2">{usuario.email}</td>
                  <td className="py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => manejarEditar(usuario)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => manejarEliminar(usuario.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                <tr>
                  <td colSpan="3" className="py-4 text-center text-gray-400">
                    No hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
