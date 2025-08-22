
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import CardLeft from './components/CardLeft.tsx';
import CardRight from './components/CardRight.tsx';
import { AppProvider } from './components/AppContext.tsx';
import { useAppContext } from './components/AppContext.tsx';
import { FC } from 'react';

const App: FC = () => {
  const { isLoginFormVisible } = useAppContext();

  return (
    <AppProvider>
      <div className="divPrincipal">
        <Navbar  />
        <main className="mainmain">
          <div className="divcentral">
            <div className={`parte-izquierda ${isLoginFormVisible ? 'compressed' : ''}`}>
              <CardLeft title="Todo-App Un sitio web que te ayudará con tus tareas diarias sin ponerle pausa a lo que sea que haces" />
            </div>
            <div className={`parte-derecha ${isLoginFormVisible ? 'expanded' : ''}`}>
              <CardRight />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
};

export default App;