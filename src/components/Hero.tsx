import { fotos } from '../data/imagenes'
import { negocio, tiendas } from '../data/negocio'
import { saboresFijos } from '../data/sabores'
import { Galleta } from './Galleta'
import { Marca } from './Marca'

/** La galleta del inicio: la foto real si existe; si no, la ilustración partida. */
function GalletaHero() {
  const foto = fotos.galletaHero
  if (foto) {
    return (
      <picture>
        {foto.srcAvif && <source srcSet={foto.srcAvif} type="image/avif" />}
        <img
          className="hero__galleta hero__foto"
          src={foto.src}
          alt={foto.alt}
          width={foto.ancho}
          height={foto.alto}
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    )
  }
  const clasica = saboresFijos[0]
  return (
    <Galleta
      id={clasica.id}
      aspecto={clasica.aspecto}
      partida
      className="hero__galleta"
      titulo="Ilustración de una galleta gruesa partida por la mitad, con el chocolate fundido a la vista"
    />
  )
}

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-titulo">
      <div className="hero__texto">
        <p className="etiqueta">Galletas en A Coruña · Dos tiendas</p>
        {/* El titular usa sus propias frases: «Cookies artesanales» (Instagram) y «Al estilo New York» (TikTok) */}
        <h1 id="hero-titulo" className="hero__titulo">
          <span className="hero__ancha">Cookies</span>
          <span className="hero__fina">
            <em>artesanales al estilo</em>
          </span>
          <span className="hero__estrecha">New York</span>
        </h1>
        <p className="hero__entradilla">
          Galletas gruesas, crujientes por fuera y blandas por dentro. Todas llevan relleno menos la clásica. Ocho
          sabores fijos y uno nuevo cada semana, hechos de forma artesanal por Vanessa.
        </p>
        <div className="hero__acciones">
          <a href="#caja" className="boton boton--rojo">
            Monta una caja regalo
          </a>
          <a href="#sabores" className="boton boton--linea">
            Ver los sabores
          </a>
        </div>
        <a className="hero__direccion" href="#visita">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
          </svg>
          <span>
            Dos tiendas: <strong>{tiendas[0].nombre}</strong> y <strong>{tiendas[1].nombre}</strong>
          </span>
        </a>
      </div>

      <div className="hero__visual">
        <GalletaHero />
        <a
          href={negocio.instagram.valor.url}
          target="_blank"
          rel="noopener noreferrer"
          className="sello"
          aria-label="¿Qué sabor toca esta semana? Míralo en Instagram (se abre en otra pestaña)"
        >
          <svg viewBox="0 0 200 200" className="sello__texto" aria-hidden="true">
            <defs>
              <path id="circulo-sello" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
            </defs>
            <text>
              {/* textLength = largo exacto de la circunferencia (2·π·78 ≈ 490): el texto da una vuelta justa y no se monta */}
              <textPath href="#circulo-sello" textLength="488" lengthAdjust="spacing">
                Edición limitada · un sabor nuevo cada semana ·
              </textPath>
            </text>
          </svg>
          <span className="sello__centro">
            <span className="sello__sabor">¿Qué toca esta semana?</span>
            <span className="sello__ej">Instagram</span>
          </span>
        </a>
        {!fotos.galletaHero && (
          <p className="hero__pie">
            Ilustración de la demo. Aquí iría una foto real de sus galletas. <Marca estado="ejemplo" />
          </p>
        )}
      </div>
    </section>
  )
}
