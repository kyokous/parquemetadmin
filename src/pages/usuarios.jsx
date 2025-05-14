import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase"; // Asegúrate de que esta ruta sea la correcta

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      const datos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsuarios(datos);
      setLoading(false);
    };

    obtenerUsuarios();
  }, []);

  const manejarGuardar = async () => {
    if (!nombre || !correo || !rol) return;

    if (editandoId) {
      const ref = doc(db, "usuarios", editandoId);
      await updateDoc(ref, {
        nombre,
        Correo: correo,
        rol,
        contrasena,
      });
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === editandoId ? { ...u, nombre, Correo: correo, rol } : u
        )
      );
      setEditandoId(null);
    } else {
      const nuevo = await addDoc(collection(db, "usuarios"), {
        nombre,
        Correo: correo,
        rol,
        contrasena,
      });
      setUsuarios((prev) => [
        ...prev,
        { id: nuevo.id, nombre, Correo: correo, rol },
      ]);
    }

    setNombre("");
    setCorreo("");
    setRol("");
  };

  const manejarEditar = (usuario) => {
    setNombre(usuario.nombre);
    setCorreo(usuario.Correo);
    setRol(usuario.rol);
    setEditandoId(usuario.id);
  };

  const formularioIncompleto = !nombre || !correo || !rol;

  const navigate = useNavigate();

  const manejarEliminar = async (id) => {
    await deleteDoc(doc(db, "usuarios", id));
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-6 max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          ← Volver al menú principal
        </button>

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
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="px-4 py-2 border rounded w-full"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="px-4 py-2 border rounded w-full"
            />

            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="px-4 py-2 border rounded w-full bg-white"
            >
              <option value="">Selecciona un rol</option>
              <option value="Usuario">Usuario</option>
              <option value="Admin">Admin</option>
              <option value="Educador">Educador</option>
              <option value="Guardia">Guardia</option>
            </select>
          </div>
          <button
            onClick={manejarGuardar}
            disabled={formularioIncompleto}
            className={`px-6 py-2 rounded flex items-center gap-2 text-white transition ${
              formularioIncompleto
                ? "bg-blue-400 cursor-not-allowed opacity-50"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Plus size={18} />
            {editandoId ? "Actualizar" : "Agregar"}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Lista de Usuarios</h2>

          {loading ? (
            <p className="text-gray-500">Cargando usuarios...</p>
          ) : (
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="text-gray-600">
                  <th className="pb-2">Nombre</th>
                  <th className="pb-2">Correo</th>
                  <th className="pb-2">Rol</th>
                  <th className="pb-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="border-t text-gray-800">
                    <td className="py-2">{usuario.nombre}</td>
                    <td className="py-2">{usuario.Correo}</td>
                    <td className="py-2">{usuario.rol}</td>
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
                {usuarios.length === 0 && !loading && (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-400">
                      No hay usuarios registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
