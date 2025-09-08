import React, { FC } from "react";
import "./index.css";
import Footer from "./components/Footer.tsx";
import Navbar from "./components/Navbar.tsx";
import CardLeft from "./components/CardLeft.tsx";
import CardRight from "./components/CardRight.tsx";
import TaskShow from "./pages/TaskShow.tsx";
import { AppProvider, useAppContext } from "./components/AppContext.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Home: FC = () => {
  const { isLoginFormVisible, isSignUpFormVisible, isMenuOpen } = useAppContext();

  return (
    <div className={`divPrincipal ${isMenuOpen ? "menu-open" : ""}`}>
      <Navbar />
      <main className="mainmain">
        <div className="divcentral">
          <div
            className={`parte-izquierda ${
              isLoginFormVisible || isSignUpFormVisible ? "compressed" : ""
            }`}
          >
            <CardLeft title="Todo-App Un sitio web que te ayudará con tus tareas diarias sin ponerle pausa a lo que sea que haces" />
          </div>
          <div
            className={`parte-derecha ${
              isLoginFormVisible || isSignUpFormVisible ? "expanded" : ""
            }`}
          >
            <CardRight />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const App: FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Ruta Home */}
          <Route path="/" element={<Home />} />

          {/* Ruta TaskShow */}
          <Route path="/pages/TaskShow" element={<TaskShow />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
