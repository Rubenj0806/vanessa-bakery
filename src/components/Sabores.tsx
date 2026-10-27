import { useState } from 'react'
import { saboresFijos, saborSemana } from '../data/sabores'
import { Galleta } from './Galleta'
import { negocio } from '../data/negocio'

interface Props {
  onAnadir: (id: string) => void
  llena: boolean
  ocupadas: number
  tamano: number
}

/** La carta de sabores como una pizarra de deli: lista numerada + la galleta elegida en grande. */
export function Sabores({ onAnadir, llena, ocupadas, tamano }: Props) {
  // elegido: el que se ha pulsado. vista: el que se enseña (cambia también al pasar el ratón).
  const [elegido, setElegido] = useState(saboresFijos[0].id)
  const [vista, setVista] = useState<string | null>(null)
  const sabor = saboresFijos.find((s) => s.id === (vista ?? elegido)) ?? saboresFijos[0]
  const anadir = (id: string) => {
    if (!llena) onAnadir(id)
  }
  const indice = saboresFijos.indexOf(sabor)

  return (
    <section className="sabores" id="sabores" aria-labelledby="sabores-titulo">
      <header className="seccion-cabecera" data-reveal>
        <p className="etiqueta">La carta</p>
        <h2 id="sabores-titulo" className="titulo-seccion">
          Ocho fijas<span className="titulo-seccion__y">y</span>una que cambia
        </h2>
        <p className="seccion-cabecera__texto">
          Ocho sabores que siempre están y uno de edición limitada cada semana. Toca un nombre para verla o añádela a tu
          caja regalo.
        </p>
      </header>

      <div className="sabores__cuerpo">
        <div className="vitrina">
          <span className="vitrina__num" aria-hidden="true">
            {String(indice + 1).padStart(2, '0')}
          </span>
          <Galleta key={sabor.id} id={sabor.id} aspecto={sabor.aspecto} className="vitrina__galleta" />
          <p className="vitrina__nombre">{sabor.nombre}</p>
          <button
            type="button"
            className="boton boton--oscuro boton--pequeno vitrina__anadir"
            onClick={() => anadir(sabor.id)}
            aria-disabled={llena || undefined}
          >
            {llena ? 'Caja completa' : 'Añadir a mi caja'}
          </button>
        </div>

        <ol className="carta" onMouseLeave={() => setVista(null)}>
          {saboresFijos.map((s, i) => (
            <li key={s.id} className={`carta__fila ${s.id === sabor.id ? 'carta__fila--activa' : ''}`} data-reveal>
              <button
                type="button"
                className="carta__elegir"
                aria-pressed={s.id === elegido}
                onClick={() => setElegido(s.id)}
                onMouseEnter={() => setVista(s.id)}
              >
                <span className="carta__num">{String(i + 1).padStart(2, '0')}</span>
                <Galleta id={s.id} aspecto={s.aspecto} className="carta__mini" />
                <span className="carta__nombre">{s.nombre}</span>
              </button>
              <button
                type="button"
                className="carta__anadir"
                onClick={() => anadir(s.id)}
                aria-disabled={llena || undefined}
                aria-label={llena ? `Añadir ${s.nombre}: la caja está llena` : `Añadir ${s.nombre} a la caja regalo`}
              >
                <span aria-hidden="true">+</span>
              </button>
            </li>
          ))}
          <li className="carta__fila carta__fila--semana" data-reveal>
            <div className="carta__semana">
              <span className="carta__num">+1</span>
              <Galleta id={saborSemana.id} aspecto={saborSemana.aspecto} className="carta__mini" />
              <span className="carta__nombre">
                {saborSemana.nombre}
                <small>Cambia cada semana</small>
              </span>
              <a className="carta__ig" href={negocio.instagram.valor.url} target="_blank" rel="noopener noreferrer">
                Míralo en Instagram
                <span className="sr-only"> (se abre en otra pestaña)</span>
              </a>
            </div>
          </li>
        </ol>
      </div>

      <p className="sabores__estado" aria-live="polite">
        {ocupadas > 0 && (
          <>
            Llevas {ocupadas} de {tamano} en la caja. <a href="#caja">{llena ? 'Caja completa: ver' : 'Ver caja'}</a>
          </>
        )}
      </p>
    </section>
  )
}
