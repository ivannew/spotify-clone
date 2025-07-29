import React from 'react';
import './sidebar.css';
export default function Sidebar({ playlists, eliminarCancionDePlaylist, isActive }) {
  return (
    <aside className={`sidebar-container ${isActive ? 'active' : ''}`}>
      <div className="sidebar-header">
        <h2>Tus favoritas</h2>
      </div>

      {playlists.length === 0 && <p>No hay playlists creadas.</p>}

      {playlists.map((playlist, index) => (
        <div key={index} className="playlist">
          <h3>{playlist.nombre}</h3>

          {playlist.canciones.length === 0 ? (
            <p>Esta playlist está vacía.</p>
          ) : (
            <ul className="lista-canciones">
              {playlist.canciones.map(cancion => (
                <li key={cancion.id} className="item-cancion">
                  <img
                    src={cancion.imagen}
                    alt={cancion.titulo}
                    className="portada-cancion"
                  />
                  <div className="info-cancion-lista">
                    <span className="titulo-cancion">{cancion.titulo}</span> -{' '}
                    <span className="artista-cancion">{cancion.artista}</span>
                  </div>

                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarCancionDePlaylist(playlist.nombre, cancion.id)}
                    aria-label={`Eliminar ${cancion.titulo} de ${playlist.nombre}`}
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </aside>
  );
}
