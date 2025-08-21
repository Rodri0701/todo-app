import React from 'react';
import './Task.css';

interface TaskProps {
  title: string;
}

const Task: React.FC<TaskProps> = ({ title }) => {
  // Tareas falsas para la animación de muestra
  const sampleTodos = [
    { id: 1, text: 'Completar el diseño del Dashboard', isCompleted: false },
    { id: 2, text: 'Revisar datos del CSV', isCompleted: true },
  ];

  return (
    <div className="task">
      <h3>{title}</h3>
      <ul className="todo-list">
        {sampleTodos.map((todo, index) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}
            style={{ animationDelay: `${index * 0.2}s` }} // Retraso para cada tarea
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              readOnly // Solo para mostrar, no interactivo
            />
            <span className="todo-text">{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;