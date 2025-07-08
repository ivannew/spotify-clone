import './sidebar.css'

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="tu-biblioteca">
        <span className="titulo">Tu biblioteca</span>
        <span className="icono">+</span>
      </div>

      <div className="caja">
        <h4>Crea tu primera playlist</h4>
        <p>¡Es muy fácil! Te vamos a ayudar</p>
        <button>Crear playlist</button>
      </div>

      <div className="caja">
        <h4>Busquemos algunos podcasts para seguir</h4>
        <p>Te mantendremos al tanto de los nuevos episodios</p>
      </div>
    </div>
  );
}
