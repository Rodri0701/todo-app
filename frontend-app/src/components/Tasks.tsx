import React, { useEffect, useState } from "react";
import "./Task.css"; // Reutilizamos el mismo CSS
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

const Tasks: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Datos del usuario logueado
  const jerarquia = localStorage.getItem("jerarquia") || "User";
  const userName = localStorage.getItem("userName") || "";
  const group = localStorage.getItem("group") || "";

  const handleGoHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks"); 
        if (!response.ok) {
          throw new Error("Error al obtener tareas");
        }
        const data: Task[] = await response.json();

        // Filtramos solo tareas completadas y según jerarquía, grupo y usuario
        const completedTasks = data.filter((task) => {
          const isCompleted = task.status.toLowerCase() === "completed";
          const matchesUser = task.assignedTo === userName;
          const matchesGroup = task.group === group;

          const role = jerarquia.trim().toLowerCase();
          if (role === "soon") {
            return isCompleted && matchesUser && matchesGroup;
          } else if (role === "boss") {
            return isCompleted && matchesGroup;
          } else {
            return false; // otros roles no ven tareas
          }
        });

        setTasks(completedTasks);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [jerarquia, userName, group]);

  if (loading) return <p>Cargando tareas completadas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">
          <span className="icon">✅</span> Tareas Completadas
        </h1>

        {tasks.length === 0 ? (
          <p>No hay tareas completadas aún.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item completed">
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Tasks;
