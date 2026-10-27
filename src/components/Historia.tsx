import { fuentes, negocio } from '../data/negocio'

/**
 * Texto basado SOLO en lo publicado en prensa (ver `fuentes`).
 * Está redactado para la demo: Vanessa debería revisarlo o escribirlo con sus palabras.
 */
export function Historia() {
  return (
    <section className="historia" id="historia" aria-labelledby="historia-titulo">
      <div className="historia__titular" data-reveal>
        <p className="etiqueta">Quién está detrás del mostrador</p>
        <h2 id="historia-titulo" className="historia__frase">
          Más de un año <em>probando</em> hasta dar con la galleta.
        </h2>
      </div>

      <div className="historia__texto" data-reveal>
        <p>
          Vanessa es venezolana y la repostería la acompaña desde siempre. Al llegar a España intentó hacer los dulces de
          casa, pero con otros ingredientes y otros hornos no le salían igual. Entonces probó con las galletas estilo
          New York.
        </p>
        <p>
          Estuvo más de un año ajustando la receta hasta dar con el punto de dulzor que buscaba. Empezó haciéndolas en
          casa y el {negocio.apertura.valor} abrió su tienda en la Estrecha de San Andrés. Hoy es ella quien te atiende
          en el mostrador.
        </p>
      </div>

      <dl className="cifras" data-reveal>
        <div>
          <dt>Sabores fijos</dt>
          <dd>8</dd>
        </div>
        <div>
          <dt>Sabor nuevo</dt>
          <dd>
            1<small>/semana</small>
          </dd>
        </div>
        <div>
          <dt>Abrió en</dt>
          <dd>
            09<small>·2025</small>
          </dd>
        </div>
      </dl>

      <figure className="prensa" data-reveal>
        <blockquote>
          <p>«La primera tienda de galletas al estilo New York de la ciudad»</p>
        </blockquote>
        <figcaption>
          Así la presentó{' '}
          <a href={fuentes[1].url} target="_blank" rel="noopener noreferrer">
            Quincemil
          </a>{' '}
          en agosto de 2025. También habló de ella{' '}
          <a href={fuentes[0].url} target="_blank" rel="noopener noreferrer">
            El Ideal Gallego
          </a>
          .
        </figcaption>
      </figure>

      <aside className="historia__fuentes" data-revision>
        <p>
          Texto escrito para esta propuesta a partir de lo publicado en prensa. Vanessa debería revisarlo o contarlo con
          sus palabras.
        </p>
        <ul>
          {fuentes.slice(0, 2).map((f) => (
            <li key={f.url}>
              <a href={f.url} target="_blank" rel="noopener noreferrer">
                {f.nombre}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  )
}
