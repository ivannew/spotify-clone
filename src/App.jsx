import { useEffect, useState } from 'react';
import './App.css';

import Sidebar from '../componentes/Sidebar';
import Busqueda from '../componentes/busqueda';
import CartaCancion from '../componentes/cartaCancion';
import CartaArtista from '../componentes/cartaArtistas';
import Reproductor from '../componentes/reproductor';

const API_BASE = 'https://back-5-bmdu.onrender.com/api';
const ENDPOINT_CANCIONES = `${API_BASE}/songs`;
const ENDPOINT_ARTISTAS = `${API_BASE}/artists`;

export default function App() {
  const [canciones, setCanciones] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [cancionActual, setCancionActual] = useState(null);
  const [query, setQuery] = useState('');
  const [filtro, setFiltro] = useState(null); // null = mostrar todo

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

        if (!Array.isArray(cancionesData)) {
          console.error('Las canciones recibidas no son un array:', cancionesData);
          setCanciones([]);
          return;
        }

        if (!Array.isArray(artistasData)) {
          console.error('Los artistas recibidos no son un array:', artistasData);
          setArtistas([]);
          return;
        }

        setCanciones(
          cancionesData.map(song => ({
            id: song.id,
            titulo: song.title,
            artista: song.artist,
            album: song.album,
            year: song.year,
            imagen: song.imagen || 'https://via.placeholder.com/150',
            audioUrl: song.audioUrl || '',
          }))
        );

        setArtistas(
          artistasData.map(art => ({
            id: art.id,
            nombre: art.name,
            imagen: art.image || 'https://via.placeholder.com/150',
          }))
        );
      } catch (err) {
        console.error('Error al obtener datos de la API:', err);
        setCanciones([]);
        setArtistas([]);
      }
    })();
  }, []);

  // Filtrar canciones según query
  const cancionesFiltradas = canciones.filter(c =>
    c.titulo.toLowerCase().includes(query.toLowerCase()) ||
    c.artista.toLowerCase().includes(query.toLowerCase())
  );

  // Filtrar artistas según query
  const artistasFiltrados = artistas.filter(a =>
    a.nombre.toLowerCase().includes(query.toLowerCase())
  );

  // Crear nueva playlist
  const crearPlaylist = (nombre) => {
    if (!nombre.trim()) return;
    if (playlists.some(pl => pl.nombre === nombre)) {
      alert('Ya existe una playlist con ese nombre');
      return;
    }
    setPlaylists([...playlists, { nombre, canciones: [] }]);
  };

  // Agregar o quitar canción de una playlist (toggle)
  const agregarOCambiarFavorita = (nombrePlaylist, cancion) => {
    setPlaylists(prev =>
      prev.map(pl => {
        if (pl.nombre !== nombrePlaylist) return pl;

        const yaExiste = pl.canciones.some(c => c.id === cancion.id);
        const nuevasCanciones = yaExiste
          ? pl.canciones.filter(c => c.id !== cancion.id)
          : [...pl.canciones, cancion];

        return { ...pl, canciones: nuevasCanciones };
      })
    );
  };

  // Eliminar canción de una playlist por ID
  const eliminarCancionDePlaylist = (nombrePlaylist, idCancion) => {
    setPlaylists(prev =>
      prev.map(pl =>
        pl.nombre === nombrePlaylist
          ? {
              ...pl,
              canciones: pl.canciones.filter(c => c.id !== idCancion)
            }
          : pl
      )
    );
  };

  return (
    <div className="app-container">
      <Sidebar
        playlists={playlists}
        crearPlaylist={crearPlaylist}
        eliminarCancionDePlaylist={eliminarCancionDePlaylist}
      />

      <div className="main-content">
        <Busqueda
          query={query}
          setQuery={(q) => {
            setQuery(q);
            setFiltro(null); // si escribes, resetea filtro para mostrar todo
          }}
          filtro={filtro}
          setFiltro={setFiltro}
        />

        <div className="content-body">
          {(filtro === null || filtro === 'canciones') && cancionesFiltradas.length > 0 && (
            <section className="seccion-canciones">
              <h2>Canciones del momento</h2>
              <div className="fila-canciones">
                {cancionesFiltradas.map(c => (
                  <CartaCancion
                    key={c.id}
                    titulo={c.titulo}
                    artista={c.artista}
                    album={c.album}
                    year={c.year}
                    imagen={c.imagen}
                    onReproducir={() => setCancionActual(c)}
                  />
                ))}
              </div>
            </section>
          )}

          {(filtro === null || filtro === 'artistas') && artistasFiltrados.length > 0 && (
            <section className="seccion-artistas">
              <h2>Artistas populares</h2>
              <div className="fila-artistas">
                {artistasFiltrados.map(a => (
                  <CartaArtista
                    key={a.id}
                    nombre={a.nombre}
                    imagen={a.imagen}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Reproductor
        cancion={cancionActual}
        playlists={playlists}
        agregarACancionesDePlaylist={agregarOCambiarFavorita}
      />
    </div>
  );
}
