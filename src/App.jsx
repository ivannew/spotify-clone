import { useEffect, useState } from 'react';
import './App.css';

import Sidebar from '../componentes/Sidebar';
import Busqueda from '../componentes/busqueda';
import CartaCancion from '../componentes/cartaCancion';
import CartaArtista from '../componentes/cartaArtistas';
import Reproductor from '../componentes/reproductor';

const API_BASE = 'https://api-musica.netlify.app';
const ENDPOINT_CANCIONES = `${API_BASE}/api/canciones`;
const ENDPOINT_ARTISTAS = `${API_BASE}/api/artistas`;

export default function App() {
  const [canciones, setCanciones] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [cancionActual, setCancionActual] = useState(null);
  const [query, setQuery] = useState('');

  // Estado para playlists: array de objetos { nombre, canciones: [] }
  const [playlists, setPlaylists] = useState([
    { nombre: 'Favoritas', canciones: [] }
  ]);

  useEffect(() => {
    (async () => {
      try {
        const [resCanciones, resArtistas] = await Promise.all([
          fetch(ENDPOINT_CANCIONES),
          fetch(ENDPOINT_ARTISTAS),
        ]);

        const cancionesData = await resCanciones.json();
        const artistasData = await resArtistas.json();

        setCanciones(
          cancionesData.data.map(song => ({
            id: song.id,
            titulo: song.titulo,
            artista: song.artista,
            imagen: `${API_BASE}/${song.albumCompleto.portada}`,
            audioUrl: `${API_BASE}/${song.ruta}`,
          }))
        );

        setArtistas(
          artistasData.data.map(art => ({
            id: art.id,
            nombre: art.nombre,
            imagen: `${API_BASE}/${art.imagen}`,
          }))
        );
      } catch (err) {
        console.error('Error al obtener datos de la API:', err);
      }
    })();
  }, []);

  // Filtrar canciones y artistas según query
  const cancionesFiltradas = canciones.filter(c =>
    c.titulo.toLowerCase().includes(query.toLowerCase()) ||
    c.artista.toLowerCase().includes(query.toLowerCase())
  );

  const artistasFiltrados = artistas.filter(a =>
    a.nombre.toLowerCase().includes(query.toLowerCase())
  );

  // Función para crear playlist nueva
  const crearPlaylist = (nombre) => {
    if (!nombre.trim()) return;
    if (playlists.some(pl => pl.nombre === nombre)) {
      alert('Ya existe una playlist con ese nombre');
      return;
    }
    setPlaylists([...playlists, { nombre, canciones: [] }]);
  };

  // Función para agregar canción a playlist
  const agregarACancionesDePlaylist = (nombrePlaylist, cancion) => {
    setPlaylists(prev =>
      prev.map(pl =>
        pl.nombre === nombrePlaylist
          ? { ...pl, canciones: [...pl.canciones, cancion] }
          : pl
      )
    );
  };

  return (
    <div className="app-container">
      <Sidebar playlists={playlists} crearPlaylist={crearPlaylist} />

      <div className="main-content">
        <Busqueda query={query} setQuery={setQuery} />

        <div className="content-body">
          {cancionesFiltradas.length > 0 && (
            <section className="seccion-canciones">
              <h2>Canciones del momento</h2>
              <div className="fila-canciones">
                {cancionesFiltradas.map(c => (
                  <CartaCancion key={c.id} {...c} onReproducir={() => setCancionActual(c)} />
                ))}
              </div>
            </section>
          )}

          {artistasFiltrados.length > 0 && (
            <section className="seccion-artistas">
              <h2>Artistas populares</h2>
              <div className="fila-artistas">
                {artistasFiltrados.map(a => (
                  <CartaArtista key={a.id} {...a} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Reproductor
        cancion={cancionActual}
        playlists={playlists}
        agregarACancionesDePlaylist={agregarACancionesDePlaylist}
      />
    </div>
  );
}
