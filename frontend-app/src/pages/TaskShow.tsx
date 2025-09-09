import React, { useEffect, useState } from "react";
import "./TaskShow.css";
import { useNavigate } from "react-router-dom";
import Tasks from "../components/Tasks.tsx"; // Tareas completadas
import PendingTasks from "../components/PendingTasks.tsx"; // Tareas pendientes

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
  const [view, setView] = useState<"main" | "pending" | "completed">("main");

  const handleGoHome = () => navigate("/");

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

  // Determina la clase de animación según la vista
  const containerClass = () => {
    if (view === "completed") return "task-show-container slide-left";
    if (view === "pending") return "task-show-container slide-right";
    return "task-show-container";
  };

  return (
    <div className="page-wrapper">
      <div className={containerClass()}>
        {/* Vista principal */}
        {view === "main" && (
          <div className="container">
            <div className="card">
              <h1 className="title">
                <span className="icon">📋</span> Todas las Tareas del momento
              </h1>

              <ul className="task-list">
                {tasks
                  .filter((task) => task.status === "In Progress" || task.status === "Urgent")
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
        )}

        {/* Vista de tareas pendientes */}
        {view === "pending" && (
          <div className="pending-container">
            <PendingTasks />
          </div>
        )}

        {/* Vista de tareas completadas */}
        {view === "completed" && (
          <div className="completed-container">
            <Tasks />
          </div>
        )}
      </div>

      {/* Botones flotantes */}
      {view !== "completed" && (
        <button className="arrow-button floating-toggle" onClick={() => setView("completed")}>
          ➡️ Ver Tareas Completadas
        </button>
      )}

      {view !== "pending" && (
        <button className="arrow-button floating-pending" onClick={() => setView("pending")}>
          ⬅️ Ver Tareas Pendientes
        </button>
      )}

      {view !== "main" && (
        <button className="arrow-button floating-toggle back" onClick={() => setView("main")}>
          ⬅️ Volver a Tareas Actuales
        </button>
      )}
    </div>
  );
};

export default TaskShow;
