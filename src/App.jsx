import { useEffect, useState } from 'react';
import './App.css';

import Sidebar      from '../componentes/Sidebar';
import Busqueda     from '../componentes/busqueda';
import CartaCancion from '../componentes/cartaCancion';
import CartaArtista from '../componentes/cartaArtistas';


const API_BASE = 'https://api-musica.netlify.app'; // 

const ENDPOINT_CANCIONES = `${API_BASE}/api/canciones`; 
const ENDPOINT_ARTISTAS  = `${API_BASE}/api/artistas`;  

export default function App() {

  const [canciones, setCanciones] = useState([]);
  const [artistas,  setArtistas]  = useState([]);


  useEffect(() => {
    (async () => {
      try {
 
        const [resCanciones, resArtistas] = await Promise.all([
          fetch(ENDPOINT_CANCIONES),
          fetch(ENDPOINT_ARTISTAS)
        ]);

        const cancionesData = await resCanciones.json();
        const artistasData  = await resArtistas.json();

    
        setCanciones(
          cancionesData.data.map(song => ({
            id:      song.id,
            titulo:  song.titulo,
            artista: song.artista,
            imagen:  `${API_BASE}/${song.albumCompleto.portada}`  
          }))
        );


        setArtistas(
          artistasData.data.map(art => ({
            id:     art.id,
            nombre: art.nombre,
            imagen: `${API_BASE}/${art.imagen}`              
          }))
        );
      } catch (err) {
        console.error('Error al obtener datos de la API:', err);
      }
    })();
  }, []);  

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <Busqueda />

        <div className="content-body">
          {/* Sección de canciones */}
          <section className="seccion-canciones">
            <h2>Canciones del momento</h2>
            <div className="fila-canciones">
              {canciones.map(c => (
                <CartaCancion key={c.id} {...c} />
              ))}
            </div>
          </section>

          {/* Sección de artistas */}
          <section className="seccion-artistas">
            <h2>Artistas populares</h2>
            <div className="fila-artistas">
              {artistas.map(a => (
                <CartaArtista key={a.id} {...a} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
