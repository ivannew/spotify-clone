import './CartaCancion.css';

export default function CartaCancion({ titulo, artista, imagen }) {
  return (
    <div className="carta-cancion">
      <img src={imagen} alt={titulo} />
      <h3>{titulo}</h3>
      <p>{artista}</p>
    </div>
  );
}
