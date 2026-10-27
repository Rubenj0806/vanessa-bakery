import { negocio, tiendas } from '../data/negocio'
import { Marca } from './Marca'
import { Galleta } from './Galleta'
import { saboresFijos } from '../data/sabores'

const NUEVA = <span className="sr-only"> (se abre en otra pestaña)</span>

export function Visita() {
  const { telefono, instagram, tiktok } = negocio
  const clasica = saboresFijos[0]
  return (
    <section className="visita" id="visita" aria-labelledby="visita-titulo">
      <div className="visita__info" data-reveal>
        <p className="etiqueta">Visítanos</p>
        <h2 id="visita-titulo" className="titulo-seccion">
          Dos tiendas<span className="titulo-seccion__y">en</span>A Coruña
        </h2>

        <ul className="tiendas">
          {tiendas.map((t) => (
            <li key={t.id} className="tienda">
              <h3 className="tienda__nombre">{t.nombre}</h3>
              <p className="tienda__detalle">{t.detalle}</p>
              {t.soloParaLlevar && <p className="tienda__nota">Solo para llevar: el local es pequeño y no tiene mesas.</p>}
              {t.horario ? (
                <>
                  <p className="tienda__subtitulo">
                    Horario <Marca estado={t.horario.estado} />
                  </p>
                  <dl className="horario">
                    {t.horario.valor.map((f) => (
                      <div key={f.dias}>
                        <dt>{f.dias}</dt>
                        <dd>{f.horas}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              ) : (
                <>
                  <p className="tienda__subtitulo">Horario</p>
                  <p className="tienda__detalle">Sin publicar todavía: hay que pedírselo a la tienda.</p>
                </>
              )}
              <a className="boton boton--oscuro boton--pequeno" href={t.mapaUrl} target="_blank" rel="noopener noreferrer">
                Cómo llegar{NUEVA}
              </a>
            </li>
          ))}
        </ul>

        <div className="visita__datos">
          <div>
            <h3>Pídelas a domicilio</h3>
            <ul className="contacto">
              {tiendas.map((t) => (
                <li key={t.id}>
                  <a href={t.justEatUrl} target="_blank" rel="noopener noreferrer">
                    Just Eat · {t.id === 'estrecha' ? 'Estrecha de San Andrés' : t.nombre}
                    {NUEVA}
                  </a>
                </li>
              ))}
              <li>
                <a href={negocio.glovoUrl} target="_blank" rel="noopener noreferrer">
                  Glovo{NUEVA}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Contacto</h3>
            <ul className="contacto">
              <li>
                <a href={instagram.valor.url} target="_blank" rel="noopener noreferrer">
                  Instagram {instagram.valor.usuario}
                  {NUEVA}
                </a>
              </li>
              <li>
                <a href={tiktok.valor.url} target="_blank" rel="noopener noreferrer">
                  TikTok {tiktok.valor.usuario}
                  {NUEVA}
                </a>
              </li>
              <li>
                {/* Solo se enlaza (tel:) cuando el número esté confirmado por la tienda */}
                {telefono.estado === 'prensa' || telefono.estado === 'propio' ? (
                  <a href={`tel:+34${telefono.valor.replace(/\s/g, '')}`}>Teléfono {telefono.valor}</a>
                ) : (
                  <span>Teléfono {telefono.valor}</span>
                )}{' '}
                <Marca estado={telefono.estado} />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <figure className="calle" data-reveal>
        <svg viewBox="0 0 320 420" aria-hidden="true" focusable="false">
          {/* Esquema, no a escala: dos manzanas y una calle muy estrecha entre ellas */}
          <rect x="0" y="0" width="320" height="420" fill="var(--papel-2)" />
          <g fill="var(--kraft)" opacity="0.55">
            <rect x="14" y="14" width="128" height="120" rx="3" />
            <rect x="14" y="146" width="128" height="122" rx="3" />
            <rect x="14" y="280" width="128" height="126" rx="3" />
            <rect x="172" y="14" width="134" height="180" rx="3" />
            <rect x="172" y="206" width="134" height="200" rx="3" />
          </g>
          <rect x="142" y="0" width="30" height="420" fill="var(--papel)" />
          <text x="157" y="300" transform="rotate(-90 157 300)" className="calle__nombre" textAnchor="middle">
            ESTRECHA DE SAN ANDRÉS
          </text>
          {/* El chiste del concepto: en el nº 8 la galleta es más ancha que la propia calle */}
          <g className="calle__punto">
            <circle cx="157" cy="118" r="36" fill="var(--rojo)" opacity="0.16" />
          </g>
          <g transform="translate(157 118) scale(0.25)">
            <Galleta id={clasica.id} aspecto={clasica.aspecto} comoGrupo />
          </g>
          <text x="196" y="112" className="calle__etiqueta">
            nº 8
          </text>
          <text x="196" y="130" className="calle__etiqueta calle__etiqueta--fina">
            The Vanessa Bakery
          </text>
        </svg>
        <figcaption>
          La tienda de la Estrecha: tan pequeña que la galleta no cabe en la calle. Esquema ilustrativo, no es un mapa.
        </figcaption>
      </figure>
    </section>
  )
}
