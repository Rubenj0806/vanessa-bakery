import { useEffect, useRef, useState } from 'react'

const ENLACES = [
  { href: '#sabores', texto: 'Sabores' },
  { href: '#hoy', texto: 'Hoy' },
  { href: '#caja', texto: 'Caja regalo' },
  { href: '#historia', texto: 'Vanessa' },
  { href: '#visita', texto: 'Visítanos' },
]

interface Props {
  revision: boolean
  onRevision: (v: boolean) => void
}

export function Cabecera({ revision, onRevision }: Props) {
  const [abierto, setAbierto] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const boton = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const alScroll = () => setScrolled(window.scrollY > 24)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  // Menú móvil: bloquea el scroll de fondo, cierra con Escape y devuelve el foco al botón.
  useEffect(() => {
    if (!abierto) return
    document.body.classList.add('sin-scroll')
    // El resto de la página queda inerte: el foco no puede escaparse por debajo del menú
    const fondo = document.querySelectorAll('#contenido, .pie, .aviso, .saltar')
    fondo.forEach((el) => el.setAttribute('inert', ''))
    panel.current?.querySelector('a')?.focus()
    // Si la ventana pasa a tamaño escritorio, el menú móvil se cierra
    const escritorio = window.matchMedia('(min-width: 1000px)')
    const alCambiar = () => escritorio.matches && setAbierto(false)
    escritorio.addEventListener('change', alCambiar)
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAbierto(false)
        boton.current?.focus()
      }
    }
    window.addEventListener('keydown', tecla)
    return () => {
      document.body.classList.remove('sin-scroll')
      fondo.forEach((el) => el.removeAttribute('inert'))
      escritorio.removeEventListener('change', alCambiar)
      window.removeEventListener('keydown', tecla)
    }
  }, [abierto])

  return (
    <>
      <aside className="aviso" aria-label="Aviso de demo">
        <p>
          <strong>Propuesta de diseño.</strong> No es la web oficial de The Vanessa Bakery.
        </p>
        <button
          type="button"
          className="aviso__toggle"
          aria-pressed={revision}
          onClick={() => onRevision(!revision)}
        >
          <span className="aviso__interruptor" aria-hidden="true" />
          Resaltar datos por confirmar
        </button>
      </aside>

      <header className={`cabecera ${scrolled ? 'cabecera--scrolled' : ''}`}>
        <a href="#inicio" className="logo" aria-label="The Vanessa Bakery, ir al inicio">
          <span className="logo__the">The</span>
          <span className="logo__nombre">Vanessa</span>
          <span className="logo__bakery">Bakery</span>
        </a>

        <nav className="nav" aria-label="Principal">
          <ul>
            {ENLACES.map((e) => (
              <li key={e.href}>
                <a href={e.href}>{e.texto}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#caja" className="boton boton--rojo boton--pequeno cabecera__cta">
          Monta tu caja
        </a>

        <button
          ref={boton}
          type="button"
          className="cabecera__menu"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          onClick={() => setAbierto(!abierto)}
        >
          <span className="sr-only">{abierto ? 'Cerrar menú' : 'Abrir menú'}</span>
          <span className="hamburguesa" aria-hidden="true" />
        </button>
      </header>

      <div
        id="menu-movil"
        ref={panel}
        className={`menu-movil ${abierto ? 'menu-movil--abierto' : ''}`}
        hidden={!abierto}
      >
        <nav aria-label="Menú móvil">
          <ul>
            {ENLACES.map((e, i) => (
              <li key={e.href} style={{ '--i': i } as React.CSSProperties}>
                <a href={e.href} onClick={() => setAbierto(false)}>
                  <span className="menu-movil__num">{String(i + 1).padStart(2, '0')}</span>
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#caja" className="boton boton--rojo" onClick={() => setAbierto(false)}>
          Monta tu caja regalo
        </a>
      </div>
    </>
  )
}
