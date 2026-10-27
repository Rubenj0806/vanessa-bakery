import { useEffect, useState } from 'react'
import { carta, saborSemana } from '../data/sabores'
import { fraseDeHoy, semanaDesdeLunes } from '../lib/semana'
import { Galleta } from './Galleta'
import { negocio } from '../data/negocio'

const SEMANA = semanaDesdeLunes()

export function Hoy() {
  // La fecha se lee en el navegador del visitante; se actualiza si la página sigue abierta al cambiar de día.
  const [hoy, setHoy] = useState(() => new Date())
  useEffect(() => {
    const t = window.setInterval(() => setHoy(new Date()), 60_000)
    return () => window.clearInterval(t)
  }, [])
  const indiceHoy = hoy.getDay()

  return (
    <section className="hoy" id="hoy" aria-labelledby="hoy-titulo">
      <header className="seccion-cabecera" data-reveal>
        <p className="etiqueta">Qué hay hoy</p>
        <h2 id="hoy-titulo" className="titulo-seccion">
          La semana en el mostrador
        </h2>
        <p className="hoy__frase">{fraseDeHoy(hoy)}</p>
      </header>

      <ol className="semana" data-reveal>
        {SEMANA.map((d) => {
          const esHoy = d.indice === indiceHoy
          return (
            <li
              key={d.indice}
              className={`semana__dia ${d.esFinDeSemana ? 'semana__dia--finde' : ''} ${esHoy ? 'semana__dia--hoy' : ''}`}
              aria-current={esHoy ? 'date' : undefined}
            >
              <span className="semana__letra" aria-hidden="true">
                {d.corto}
              </span>
              <span className="sr-only">{d.nombre}:</span>
              {esHoy && <span className="semana__hoy">Hoy</span>}
              <ul className="semana__extras">
                <li>Galletas</li>
                {d.extras.map((x) => (
                  <li key={x} className={carta.finDeSemana.includes(x) ? 'semana__extra--finde' : undefined}>
                    {x}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ol>

      <div className="hoy__bloques">
        <div className="bloque" data-reveal>
          <p className="bloque__cuando">Todos los días</p>
          <p className="bloque__que">{carta.diario.join(' · ')}</p>
          <p className="bloque__nota">Además de las ocho galletas fijas.</p>
        </div>
        <div className="bloque bloque--finde" data-reveal>
          <p className="bloque__cuando">Sábado y domingo</p>
          <p className="bloque__que">{carta.finDeSemana.join(' · ')}</p>
          <p className="bloque__nota">Crookie: masa de croissant con masa de galleta. Brookie: mitad brownie, mitad galleta.</p>
        </div>
        <div className="bloque bloque--semana" data-reveal>
          <Galleta id={saborSemana.id} aspecto={saborSemana.aspecto} className="bloque__galleta" />
          <div>
            <p className="bloque__cuando">Edición limitada</p>
            <p className="bloque__que">{saborSemana.nombre}</p>
            <p className="bloque__nota">
              Un sabor distinto cada semana. Vanessa lo anuncia en{' '}
              <a href={negocio.instagram.valor.url} target="_blank" rel="noopener noreferrer">
                {negocio.instagram.valor.usuario}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
