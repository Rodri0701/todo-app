import React, { useEffect, useState } from "react";
import "./PendingTasks.css";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  group?: string;
  dueDate: string;
  status: string;
}

const PendingTasks: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const jerarquia = localStorage.getItem("jerarquia") || "User";
  const userName = localStorage.getItem("userName") || "";
  const group = localStorage.getItem("group") || "";

  const handleGoHome = () => {
    navigate("/");
  };

  // Función para marcar tarea como "in progress"
  const handleMarkAsInProgress = async (taskId: number) => {
    const confirmUpdate = window.confirm("¿Marcar esta tarea como 'En progreso'?");
    if (!confirmUpdate) return;

    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "in progress" }),
      });

      const data = await response.json();
      console.log(data.message);

      // Eliminamos la tarea de la lista de pendientes
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error("Error al actualizar la tarea:", err);
      alert("No se pudo actualizar la tarea.");
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks");
        if (!response.ok) throw new Error("Error al obtener tareas");
        const data: Task[] = await response.json();

        const pendingTasks = data.filter((task) => {
          const isPending = task.status.toLowerCase() === "pending";
          const matchesUser = task.assignedTo === userName;
          const matchesGroup = task.group === group;

          const role = jerarquia.trim().toLowerCase();
          if (role === "soon") return isPending && matchesUser && matchesGroup;
          if (role === "boss") return isPending && matchesGroup;
          return false;
        });

        setTasks(pendingTasks);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [jerarquia, userName, group]);

  if (loading) return <p>Cargando tareas pendientes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">
          <span className="icon">🕒</span> Tareas Pendientes
        </h1>

        {tasks.length === 0 ? (
          <p className="no-tasks">No hay tareas pendientes aún.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item pending">
                <h3 className="task-title">{task.title}</h3>
                <p>{task.description}</p>
                <p>
                  <strong>Asignado a:</strong> {task.assignedTo}
                </p>
                <p>
                  <strong>Grupo:</strong> {task.group || "Sin grupo"}
                </p>
                <p>
                  <strong>Fecha límite:</strong> {task.dueDate}
                </p>
                <p>
                  <strong>Status:</strong> {task.status}
                </p>
                <div className="task-buttons">
                  <button className="btn-Recordatorio">Recordatorio</button>
                  <button
                    className="btn-Empezada"
                    onClick={() => handleMarkAsInProgress(task.id)}
                  >
                    Empezada
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PendingTasks;
