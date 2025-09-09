import React, { useEffect, useState } from "react";
import "./PendingTasks.css";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: string;
}

const PendingTasks: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

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
        // Filtramos solo las tareas pendientes
        const pendingTasks = data.filter(task => task.status === "Pending");
        setTasks(pendingTasks);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

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
            {tasks.map(task => (
              <li key={task.id} className="task-item pending">
                <h3 className="task-title">{task.title}</h3>
                <p>{task.description}</p>
                <p>
                  <strong>Asignado a:</strong> {task.assignedTo}
                </p>
                <p>
                  <strong>Fecha límite:</strong> {task.dueDate}
                </p>
                <p>
                  <strong>Status:</strong> {task.status}
                </p>
                <div className="task-buttons">
                  <button className="btn-Recordatorio">Recordatorio</button>
                  <button className="btn-Empezada">Empezada</button>
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