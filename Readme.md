# Todo App Project 🚀

[![Node.js](https://img.shields.io/badge/Node.js-18-blue)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue)](https://www.docker.com/)

Aplicación para gestionar tareas diarias de manera sencilla, con modo claro/oscuro, login de usuario y recordatorios integrados con Google Drive.  

![Todo App Project preview image](./project-preview.jpeg)

---

## 🎯 Objetivo del proyecto

**Todo App** permite a los usuarios agregar, eliminar y completar tareas de forma interactiva. Además, incluye:  
- **Login de usuario** para guardar tareas por cuenta.  
- **Recordatorios sincronizados con Google Drive**.  
- Modo **claro/oscuro** con animación de iconos sol/luna.  

El proyecto combina diseño limpio y usabilidad, ideal para practicar React, Node.js y Docker.

---

## 🛠 Tecnologías utilizadas

- **Frontend:** React  
- **Backend:** Node.js + Express  
- **Almacenamiento:** Google Drive API  
- **Contenerización:** Docker y Docker Compose  

---

## ✨ Funcionalidades principales

- Agregar nuevas tareas desde la interfaz.  
- Eliminar tareas individualmente con botón “X”.  
- Marcar tareas como completadas con checkbox y contador de progreso.  
- Alternar entre **modo claro y oscuro** con animación.  
- **Login de usuario** para que cada persona tenga su lista personalizada.  
- **Recordatorios sincronizados con Google Drive**.  

---

## 🌱 “Mi cosecha”

- Los usuarios se registran o inician sesión.  
- Las tareas se almacenan y recuperan desde el backend Node.js.  
- Los recordatorios se vinculan con Google Drive, permitiendo recibir alertas o acceder a tus tareas desde cualquier dispositivo.  

---

## 🚀 Instalación y ejecución

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/todo-app.git
cd todo-app
docker-compose up --build

