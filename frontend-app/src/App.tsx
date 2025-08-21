import './App.css';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import CardLeft from './components/CardLeft.tsx';
import CardRight from './components/CardRight.tsx'

function App() {


  return (
    <div className="divPrincipal">
      <Navbar />

      <main className="mainmain">
        <div className="divcentral">
          {/* Parte izquierda */}
          <div className='parte-izquierda'>
<CardLeft title = "Todo-App Un sitio web que te ayudara con tus tareas diarias sin ponerle pausa a lo que sea que haces"/>
          </div>
          {/* Parte derecha */}
          <div className='parte-derecha'>
<CardRight />
          </div>
         
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
