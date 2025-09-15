import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import { useAppContext } from "../components/AppContext.tsx";
import "./NewTask.css";

interface User {
  id: number;
  nombre: string;
  apellido: string;
  userName: string;
  jerarquia: string;
  group: string;
}

interface NewTaskProps {}

const NewTask: React.FC<NewTaskProps> = () => {
  const navigate = useNavigate();
  const { loggedUser } = useAppContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [groupUsers, setGroupUsers] = useState<User[]>([]); // usuarios del mismo grupo


  
  useEffect(() => {
    const fetchUsers = async () => {
      if (!loggedUser) return;
      try {
        const res = await fetch("http://localhost:5000/usuarios");
        const data: User[] = await res.json();
        console.log("LoggedUser group:", loggedUser.group);
console.log("Usuarios:", data);

        // Filtrar por mismo grupo y jerarquía Soon
        const filtered = data.filter(
          u => u.group === loggedUser.group && u.jerarquia === "Soon"
        );
        setGroupUsers(filtered);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    fetchUsers();
  }, [loggedUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !assignedTo || !dueDate) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          assignedTo,
          assignedFrom: loggedUser?.userName,
          assignedAt: new Date(),
          dueDate,
          status: "In Progress",
        }),
      });

      if (!res.ok) throw new Error("Error al crear la tarea");

      alert("Tarea creada exitosamente ✅");
      navigate("/pages/TaskShow");
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  if (!loggedUser || loggedUser.jerarquia !== "Boss") {
    return (
      <div>
        <Navbar onMenuToggle={() => {}} />
        <p>No tienes permisos para crear nuevas tareas.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar onMenuToggle={() => {}} />
      <div className="new-task-form">
        <h2>Crear Nueva Tarea</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título de la tarea"
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción de la tarea"
            />
          </div>

          <div className="form-group">
            <label>Asignar a</label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">-- Selecciona un usuario --</option>
              {groupUsers.map(u => (
                <option key={u.id} value={u.userName}>
                  {u.nombre} {u.apellido} {u.group}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Fecha límite</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            Crear Tarea
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
