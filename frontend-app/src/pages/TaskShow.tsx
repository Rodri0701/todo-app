import React, { useEffect, useState } from "react";
import "./TaskShow.css";
import { useNavigate } from "react-router-dom";
import Tasks from "../components/Tasks.tsx"; // Componente de tareas completadas

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: string;
}

const TaskShow: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  const handleGoHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks");
        if (!response.ok) throw new Error("Error al obtener tareas");
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="page-wrapper">
      <div className={`task-show-container ${showCompleted ? "slide-left" : ""}`}>
        {/* Contenedor de tareas principales */}
        <div className="container">
          <div className="card">
            <h1 className="title">
              <span className="icon">📋</span> Todas las Tareas
            </h1>

            <ul className="task-list">
  {tasks
    .filter(task => task.status === "In Progress" || task.status === "Urgent")
    .map((task) => (
      <li
        key={task.id}
        className={`task-item ${
          task.status === "In Progress"
            ? "in-progress"
            : task.status === "Urgent"
            ? "urgent"
            : ""
        }`}
      >
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
          <button className="delete-button">Eliminar</button>
          
            <button className="ready-button">Marcar como lista</button>
          
        </div>
      </li>
    ))}
</ul>


            <div className="bottom-buttons">
              <button className="add-button">
                <span className="icon">➕</span> Agregar Tarea
              </button>
              <button className="return-button" onClick={handleGoHome}>
                🏠 Volver al Inicio
              </button>
            </div>
          </div>
        </div>

        {/* Contenedor de tareas completadas */}
        <div className="completed-container">
          <Tasks /> {/* Solo renderizamos las tareas completadas */}
        </div>
      </div>

     {/* Botón flotante para mostrar u ocultar tareas completadas */}
{!showCompleted ? (
  <button
    className="arrow-button floating-toggle"
    onClick={() => setShowCompleted(true)}
  >
    ➡️ Ver Tareas Completadas
  </button>
) : (
  <button
    className="arrow-button floating-toggle back"
    onClick={() => setShowCompleted(false)}
  >
    ⬅️ Volver a Pendientes
  </button>
)}

    </div>
  );
};

export default TaskShow;