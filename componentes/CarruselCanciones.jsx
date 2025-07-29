import { useRef, useState, useEffect } from 'react';
import CartaCancion from './cartaCancion';
import './CarruselCanciones.css'; // Importa el CSS anterior

export default function CarruselCanciones({ canciones, onReproducir }) {
  const carruselRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const el = carruselRef.current;
    if (el) {
      setMaxScroll(el.scrollWidth - el.clientWidth);
    }
  }, [canciones]);

  const scrollIzquierda = () => {
    const el = carruselRef.current;
    if (!el) return;
    el.scrollBy({ left: -150, behavior: 'smooth' });
    setScrollPos(el.scrollLeft - 150);
  };

  const scrollDerecha = () => {
    const el = carruselRef.current;
    if (!el) return;
    el.scrollBy({ left: 150, behavior: 'smooth' });
    setScrollPos(el.scrollLeft + 150);
  };

  // Actualizar scrollPos al hacer scroll manual
  const onScroll = () => {
    const el = carruselRef.current;
    if (el) setScrollPos(el.scrollLeft);
  };

  return (
    <div className="carrusel-canciones-container">
      <button
        className="carrusel-flecha izquierda"
        onClick={scrollIzquierda}
        disabled={scrollPos <= 0}
        aria-label="Desplazar hacia la izquierda"
      >
        ‹
      </button>

      <div
        className="carrusel-canciones"
        ref={carruselRef}
        onScroll={onScroll}
      >
        {canciones.map(c => (
          <div key={c.id} className="carta-cancion" onClick={() => onReproducir(c)}>
            <img src={c.imagen} alt={c.titulo} />
            <div style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{c.titulo}</div>
            <div style={{ fontSize: '0.8em', color: '#aaa' }}>{c.artista}</div>
          </div>
        ))}
      </div>

      <button
        className="carrusel-flecha derecha"
        onClick={scrollDerecha}
        disabled={scrollPos >= maxScroll}
        aria-label="Desplazar hacia la derecha"
      >
        ›
      </button>
    </div>
  );
}
