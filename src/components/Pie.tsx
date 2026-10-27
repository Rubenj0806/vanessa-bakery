import { negocio, tiendas } from '../data/negocio'

export function Pie() {
  return (
    <footer className="pie">
      <p className="pie__marca" aria-hidden="true">
        <span>Vanessa</span>
        <span>Bakery</span>
      </p>

      <div className="pie__columnas">
        <div>
          <h2 className="pie__titulo">The Vanessa Bakery</h2>
          <ul>
            {tiendas.map((t) => (
              <li key={t.id}>
                <a href={t.mapaUrl} target="_blank" rel="noopener noreferrer">
                  {t.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Pie de página">
          <h2 className="pie__titulo">La web</h2>
          <ul>
            <li><a href="#sabores">Sabores</a></li>
            <li><a href="#hoy">Hoy</a></li>
            <li><a href="#caja">Caja regalo</a></li>
            <li><a href="#historia">Vanessa</a></li>
            <li><a href="#visita">Visítanos</a></li>
          </ul>
        </nav>
        <div>
          <h2 className="pie__titulo">Síguela</h2>
          <ul>
            <li>
              <a href={negocio.instagram.valor.url} target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
            <li>
              <a href={negocio.tiktok.valor.url} target="_blank" rel="noopener noreferrer">TikTok</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="pie__titulo">Legal</h2>
          <p className="pie__pendiente">
            Aviso legal, privacidad y cookies: pendientes. La web definitiva tendrá que incluirlos.
          </p>
        </div>
      </div>

      <p className="pie__credito">
        Propuesta de diseño no oficial, preparada por{' '}
        <a href="https://rubenj0806.github.io" target="_blank" rel="noopener noreferrer">
          Ruben Medina
        </a>
        . Ilustraciones hechas para la demo; no son fotos de los productos.
      </p>
    </footer>
  )
}
