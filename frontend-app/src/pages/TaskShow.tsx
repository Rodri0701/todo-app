import React, { useEffect, useState } from "react";
import "./TaskShow.css";
import { useNavigate } from "react-router-dom";
import Tasks from "../components/Tasks.tsx"; // Tareas completadas
import PendingTasks from "../components/PendingTasks.tsx"; // Tareas pendientes
import { useAppContext } from "../components/AppContext.tsx";

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  assignedFrom?: string;
  group?: string;
  dueDate: string;
  status: string;
}

// Helper para mostrar el texto de status bonito
const getStatusLabel = (status: string) => {
  const s = status.toLowerCase();
  switch (s) {
    case "pending":
      return "pending ⏳";
    case "urgent":
      return "urgent ⚡";
    case "in progress":
      return "in progress 🔧";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

const TaskShow: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [view, setView] = useState<"main" | "pending" | "completed">("main");

  const { setLoggedUser } = useAppContext();

  // Datos del usuario logueado
  const tagName = localStorage.getItem("tagName") || "Usuario";
  const jerarquia = localStorage.getItem("jerarquia") || "User";
  const userName = localStorage.getItem("userName") || "";
  const group = localStorage.getItem("group") || "";

  const handleGoHome = () => {
    localStorage.clear();
    setLoggedUser(null);
    navigate("/");
  };

  // Función para eliminar tarea
  const handleDeleteTask = async (taskId: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta tarea?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data.message);

      // Actualizamos el estado eliminando la tarea
      setTasks((prev: Task[]) => prev.filter((task: Task) => task.id !== taskId));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      alert("No se pudo eliminar la tarea.");
    }
  };
 //Funcion para actualizar la tarea

const handleMarkAsCompleted = async (taskId: number) => {
  const confirmUpdate = window.confirm("¿Marcar esta tarea como completada?");
  if (!confirmUpdate) return;

  try {
    const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "completed" }),
    });

    const data = await response.json();
    console.log(data.message);

    // Actualizamos el estado local para reflejar el cambio
    setTasks((prev: Task[]) =>
      prev.map((task: Task) =>
        task.id === taskId ? { ...task, status: "completed" } : task
      )
    );
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    alert("No se pudo actualizar la tarea.");
  }
};

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks");
        if (!response.ok) throw new Error("Error al obtener tareas");
        const data: Task[] = await response.json();

        const role = jerarquia.trim().toLowerCase();
        const filtered: Task[] = data.filter((task) => {
          if (!task.group) return false;

          const validStatus = ["urgent", "in progress"].includes(task.status.toLowerCase());
          if (!validStatus) return false;

          if (role === "soon") return task.assignedTo === userName && task.group === group;
          if (role === "boss") return task.group === group;

          return false;
        });

        console.log(`Tareas filtradas (${role}):`, filtered.length);
        if (filtered.length === 0)
          console.log(`No se encontraron tareas para userName: ${userName}, group: ${group}`);

        setTasks(filtered);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [jerarquia, userName, group]);

  if (loading) return <div className="page-wrapper"><p className="loading-message">Cargando tareas...</p></div>;
  if (error) return <div className="page-wrapper"><p className="error-message">Error: {error}</p></div>;

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
                <span className="icon">📋</span> Tareas Actuales
              </h1>

              {tasks.length === 0 ? (
                <p className="no-tasks-message">No hay tareas urgentes o en progreso disponibles.</p>
              ) : (
                <ul className="task-list">
                  {tasks.map((task) => (
                    <li
                      key={task.id}
                      className={`task-item ${
                        task.status.toLowerCase() === "in progress" ? "in-progress" : "urgent"
                      }`}
                    >
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
                        <strong>Estado:</strong> {getStatusLabel(task.status)}
                      </p>
                      <div className="task-buttons">
                        {jerarquia.trim().toLowerCase() === "boss" && (
                          <button
                            className="delete-button"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            Delete
                          </button>
                        )}
                        <button className="ready-button"
                        onClick={() => handleMarkAsCompleted(task.id)}>
                          Marcar como lista</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="bottom-buttons">
                {jerarquia.trim().toLowerCase() === "boss" && (
                  <button className="add-button" onClick={() => navigate("/pages/NewTask")}>
                    <span className="icon">➕</span> Nueva Tarea
                  </button>
                )}
                <button className="return-button" onClick={handleGoHome}>
                  🏠 Cerrar sesión ({tagName})
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
