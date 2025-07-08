import './App.css'
import Sidebar from '../componentes/Sidebar'
import Busqueda from '../componentes/busqueda'
import CartaCancion from '../componentes/cartaCancion'
import CartaArtista from '../componentes/cartaArtistas'

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Busqueda />

        <div className="content-body">
          <section className="seccion-canciones">
            <div className="encabezado">
              <h2>Canciones del momento</h2>
          
            </div>
            <div className="fila-canciones">
              <CartaCancion titulo="Perlas Negras" artista="Natanael Cano, Gabito Ballesteros" imagen="https://i.ibb.co/mFBmp2Fd/descarga-5.jpg" />
              <CartaCancion titulo="Formula One" artista="Jasiel Nuñez" imagen="https://i.ibb.co/mFBmp2Fd/descarga-5.jpg" />
              <CartaCancion titulo="CORAZÓN PARTÍO" artista="Tito Double P" imagen="https://i.ibb.co/mFBmp2Fd/descarga-5.jpg" />
              <CartaCancion titulo="Frecuencia" artista="Los Dareyes De La Sierra" imagen="https://i.ibb.co/mFBmp2Fd/descarga-5.jpg" />
              <CartaCancion titulo="2+2" artista="Omar Camacho, Víctor Mendivil" imagen="https://i.ibb.co/mFBmp2Fd/descarga-5.jpg" />
              <CartaCancion titulo="Vamo a Bailotear" artista="Cris MJ" imagen="https://i.ibb.co/mFBmp2Fd/descarga-5.jpg" />
            </div>
          </section>

          <section className="seccion-artistas">
            <div className="encabezado">
              <h2>Artistas Populares</h2>
     
            </div>
            <div className="fila-artistas">
              <CartaArtista nombre="Peso Pluma" imagen="https://i.ibb.co/21Ff64Vq/images.webp" />
              <CartaArtista nombre="Fuerza Regida" imagen="https://i.ibb.co/21Ff64Vq/images.webp" />
              <CartaArtista nombre="Bad Bunny" imagen="https://i.ibb.co/21Ff64Vq/images.webp" />
              <CartaArtista nombre="Junior H" imagen="https://i.ibb.co/21Ff64Vq/images.webp" />
              <CartaArtista nombre="Natanael Cano" imagen="https://i.ibb.co/21Ff64Vq/images.webp" />
              <CartaArtista nombre="Gabito Ballesteros" imagen="https://i.ibb.co/21Ff64Vq/images.webp" />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
