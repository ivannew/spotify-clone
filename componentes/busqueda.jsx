import './busqueda.css';

export default function Busqueda({ query, setQuery }) {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
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

      <div className="acciones-derecha">
        <a href="#">Premium</a>
        <a href="#">Ayuda</a>
        <a href="#">Descargar</a>
        <span>|</span>
        <a href="#">Instalar aplicación</a>
        <a href="#">Regístrate</a>
        <button className="btn-login">Iniciar sesión</button>
      </div>
    </div>
  );
}
