import { useEffect, useState } from 'react'
import { tamanosCaja } from './data/negocio'
import { anadir, cajaVacia, cambiarTamano, estaLlena, quitar } from './lib/caja'
import { Cabecera } from './components/Cabecera'
import { Hero } from './components/Hero'
import { Sabores } from './components/Sabores'
import { Hoy } from './components/Hoy'
import { CajaRegalo } from './components/CajaRegalo'
import { Historia } from './components/Historia'
import { Visita } from './components/Visita'
import { Pie } from './components/Pie'
import { useAparecer } from './lib/useAparecer'

const CLAVE_REVISION = 'vanessa-demo:revision:v1'

function leerRevision(): boolean {
  try {
    return localStorage.getItem(CLAVE_REVISION) === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [caja, setCaja] = useState(() => cajaVacia(tamanosCaja.valor[tamanosCaja.valor.length - 1]))
  const [revision, setRevision] = useState(leerRevision)

  useAparecer()

  useEffect(() => {
    document.documentElement.classList.toggle('modo-revision', revision)
    try {
      localStorage.setItem(CLAVE_REVISION, revision ? '1' : '0')
    } catch {
      /* sin almacenamiento: no pasa nada */
    }
  }, [revision])

  return (
    <>
      <a href="#contenido" className="saltar">
        Saltar al contenido
      </a>
      <Cabecera revision={revision} onRevision={setRevision} />
      <main id="contenido">
        <Hero />
        <Sabores
          onAnadir={(id) => setCaja((c) => anadir(c, id))}
          llena={estaLlena(caja)}
          ocupadas={caja.sabores.length}
          tamano={caja.tamano}
        />
        <Hoy />
        <CajaRegalo
          caja={caja}
          onAnadir={(id) => setCaja((c) => anadir(c, id))}
          onQuitar={(i) => setCaja((c) => quitar(c, i))}
          onTamano={(t) => setCaja((c) => cambiarTamano(c, t))}
        />
        <Historia />
        <Visita />
      </main>
      <Pie />
    </>
  )
}
