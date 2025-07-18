import './CartaCancion.css';

export default function CartaCancion({ titulo, artista, imagen, onReproducir }) {
  return (
    <div className="carta-cancion" onClick={onReproducir}>
      <img src={imagen} alt={titulo} />
      <button className="btn-reproducir" aria-label={`Reproducir ${titulo}`}>
        ►
      </button>
      <h3>{titulo}</h3>
      <p>{artista}</p>
    </div>
  );
}
