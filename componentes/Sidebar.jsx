import { useState } from 'react';
import './sidebar.css';

export default function Sidebar({ playlists, crearPlaylist }) {
  const [nombreNueva, setNombreNueva] = useState('');

  const handleCrear = () => {
    crearPlaylist(nombreNueva);
    setNombreNueva('');
  };

  return (
    <div className="sidebar-container">
      <div className="tu-biblioteca">
        <span className="titulo">Tu biblioteca</span>
      </div>

      <div className="caja">
        <h4>Crea tu primera playlist</h4>
        <p>¡Es muy fácil! Te vamos a ayudar</p>

        <button onClick={handleCrear}>Crear playlist</button>
      </div>

      {/* voy amostrar playlists y sus canciones */}
      {playlists.map((playlist, i) => (
        <div key={i} className="caja">
          <h4>{playlist.nombre}</h4>
          {playlist.canciones.length === 0 ? (
            <p>No hay canciones en esta playlist.</p>
          ) : (
           <ul>
  {playlist.canciones.map((cancion, idx) => (
    <li key={idx} className="item-cancion">
      <img src={cancion.imagen} alt={cancion.titulo} className="portada-cancion" />
      <div className="info-cancion-lista">
        <span className="titulo-cancion">{cancion.titulo}</span> - <span className="artista-cancion">{cancion.artista}</span>
      </div>
    </li>
  ))}
</ul>

          )}
        </div>
      ))}

    </div>
  );
}
