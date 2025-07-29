import { useState } from 'react';
import './busqueda.css';

export default function Busqueda({ query, setQuery, filtro, setFiltro }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setFiltro(null);
  };

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleFiltro = (valor) => {
    setFiltro(valor);
    setMenuAbierto(false); // cerrar menú después de seleccionar
  };

  return (
    <div className="busqueda-container">
      <img className="logo" src="https://img.icons8.com/ios11/512/FFFFFF/spotify.png" alt="Spotify" />

      <button className="home">
        <img src="https://i.ibb.co/2zf5KQQ/icons8-home-48-1.png" alt="Home" />
      </button>

      <div className="busqueda-barra">
        <img className="icono-lupa" src="https://i.ibb.co/MkNtzbyj/simbolo-de-la-interfaz-de-busqueda.png" alt="Buscar" />
        <input
          className="busqueda-input"
          placeholder="¿Qué quieres reproducir?"
          value={query}
          onChange={handleInputChange}
        />
        <img className="icono-mic" src="https://cdn-icons-png.flaticon.com/512/47/47885.png" alt="Micrófono" />
      </div>

      {/* Hamburguesa solo visible en móvil */}
      <div className="menu-hamburguesa" onClick={toggleMenu}>
        ☰
      </div>

      {/* Opciones mostradas al abrir menú */}
      <div className={`menu-opciones ${menuAbierto ? 'abierto' : ''}`}>
        <button
          className={filtro === 'artistas' ? 'activo' : ''}
          onClick={() => handleFiltro('artistas')}
        >
          Artistas
        </button>
        <button
          className={filtro === 'canciones' ? 'activo' : ''}
          onClick={() => handleFiltro('canciones')}
        >
          Canciones
        </button>
      </div>

      {/* Visible solo en pantallas grandes */}
      <div className="acciones-derecha">
        <button
          className={filtro === 'artistas' ? 'activo' : ''}
          onClick={() => setFiltro('artistas')}
        >
          Artistas
        </button>
        <button
          className={filtro === 'canciones' ? 'activo' : ''}
          onClick={() => setFiltro('canciones')}
        >
          Canciones
        </button>
        <span>|</span>
        <a href="#">Regístrate</a>
        <button className="btn-login">Iniciar sesión</button>
      </div>
    </div>
  );
}
