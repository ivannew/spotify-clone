import './CartaArtista.css';

export default function CartaArtista({ nombre, imagen }) {
  return (
    <div className="carta-artista">
      <img src={imagen} alt={nombre} />
       {/* Botón reproducir */}
      <button className="btn-reproducir" aria-label={`Reproducir ${nombre}`}>
        ►
      </button>
      <h3>{nombre}</h3>
    </div>
  );
}
