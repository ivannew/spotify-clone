import './CartaArtista.css';

export default function CartaArtista({ nombre, imagen }) {
  return (
    <div className="carta-artista">
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
    </div>
  );
}
