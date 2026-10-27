import { useEffect, useId, useRef, useState } from 'react'
import { MAX_TARJETA, negocio, tamanosCaja } from '../data/negocio'
import { saboresFijos } from '../data/sabores'
import { type Caja, construirMensaje, estaLlena, validarCaja, validarTarjeta } from '../lib/caja'
import { Galleta } from './Galleta'
import { Marca } from './Marca'

const NOMBRES = Object.fromEntries(saboresFijos.map((s) => [s.id, s.nombre]))
const POR_ID = Object.fromEntries(saboresFijos.map((s) => [s.id, s]))

interface Props {
  caja: Caja
  onAnadir: (id: string) => void
  onQuitar: (posicion: number) => void
  onTamano: (tamano: number) => void
}

type Copia = 'nada' | 'copiado' | 'error'

export function CajaRegalo({ caja, onAnadir, onQuitar, onTamano }: Props) {
  const [tarjeta, setTarjeta] = useState('')
  const [fecha, setFecha] = useState('')
  const [mensaje, setMensaje] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copia, setCopia] = useState<Copia>('nada')
  const textoRef = useRef<HTMLTextAreaElement>(null)
  const paletaRef = useRef<HTMLUListElement>(null)
  const contadorRef = useRef<HTMLParagraphElement>(null)
  const idTarjeta = useId()
  const idAyuda = useId()
  const idFecha = useId()
  const llena = estaLlena(caja)
  const errorTarjeta = validarTarjeta(tarjeta)

  const preparar = (e: React.FormEvent) => {
    e.preventDefault()
    const fallo = validarCaja(caja) ?? errorTarjeta
    setCopia('nada')
    if (fallo) {
      setError(fallo)
      setMensaje(null)
      return
    }
    setError(null)
    setMensaje(construirMensaje(caja, NOMBRES, tarjeta, fecha))
  }

  // Al preparar el mensaje, lo llevamos a la vista y le damos el foco.
  useEffect(() => {
    if (!mensaje) return
    textoRef.current?.focus({ preventScroll: true })
    textoRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [mensaje])

  /**
   * Copia el mensaje. Primero con la API del portapapeles; si no está (por ejemplo,
   * abriendo la demo por la IP de la red local, que no es https), con el método antiguo.
   */
  const copiarTexto = async (): Promise<boolean> => {
    if (!mensaje) return false
    try {
      await navigator.clipboard.writeText(mensaje)
      return true
    } catch {
      const ta = textoRef.current
      if (!ta) return false
      ta.focus()
      ta.setSelectionRange(0, ta.value.length) // select() no funciona en iOS con readOnly
      try {
        return document.execCommand('copy')
      } catch {
        return false
      }
    }
  }

  const copiar = async () => {
    const ok = await copiarTexto()
    setCopia(ok ? 'copiado' : 'error')
  }

  // Copia y, solo si se ha copiado, abre el chat. La pestaña se abre en el mismo toque
  // (si no, Safari la bloquea) y se cierra si la copia falla.
  const copiarYAbrir = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const pestana = window.open('', '_blank')
    const ok = await copiarTexto()
    setCopia(ok ? 'copiado' : 'error')
    if (ok) {
      if (pestana) pestana.location.href = negocio.instagram.valor.chat
      else window.location.href = negocio.instagram.valor.chat
    } else {
      pestana?.close()
    }
  }

  const quitarGalleta = (i: number) => {
    cambiar(() => onQuitar(i))
    // el botón desaparece: llevamos el foco a la primera galleta que se pueda añadir
    requestAnimationFrame(() => paletaRef.current?.querySelector<HTMLButtonElement>('button')?.focus())
  }

  const anadirGalleta = (id: string) => {
    if (llena) return
    cambiar(() => onAnadir(id))
    // si con esta se llena la caja, el foco va al contador para no quedarse en un botón inactivo
    if (caja.sabores.length + 1 >= caja.tamano) requestAnimationFrame(() => contadorRef.current?.focus())
  }

  // Si la caja cambia después de preparar el mensaje, el mensaje ya no vale.
  const cambiar = (fn: () => void) => {
    fn()
    setMensaje(null)
    setError(null)
  }

  return (
    <section className="caja" id="caja" aria-labelledby="caja-titulo">
      <div className="caja__intro" data-reveal>
        <p className="etiqueta etiqueta--clara">Para regalar</p>
        <h2 id="caja-titulo" className="titulo-seccion">
          Monta tu caja
        </h2>
        <p>
          Vanessa prepara cajas regalo personalizadas para cumpleaños, parejas o cualquier detalle, con tarjeta y lazo.
          Elige las galletas, escribe la tarjeta y te dejamos el mensaje listo para mandárselo.
        </p>
        <p className="caja__nota">
          Esto no es una tienda online: aquí no se paga ni se envía nada. La tienda te confirma el precio y cuándo
          recogerla.
        </p>
      </div>

      <form className="caja__panel" onSubmit={preparar} noValidate>
        <fieldset className="tamanos">
          <legend>
            Tamaño de la caja <Marca estado={tamanosCaja.estado} />
          </legend>
          {tamanosCaja.valor.map((t) => (
            <label key={t} className="tamanos__opcion">
              <input
                type="radio"
                name="tamano"
                value={t}
                checked={caja.tamano === t}
                onChange={() => cambiar(() => onTamano(t))}
              />
              <span>{t} galletas</span>
            </label>
          ))}
        </fieldset>

        <div className={`kraft kraft--${caja.tamano}`}>
          <p className="kraft__contador" ref={contadorRef} tabIndex={-1}>
            <span aria-hidden="true">
              {caja.sabores.length} / {caja.tamano}
            </span>
            <span className="sr-only">
              {caja.sabores.length} de {caja.tamano} galletas{llena ? ', caja completa' : ''}
            </span>
          </p>
          <ul className="kraft__huecos" aria-label="Galletas en la caja">
            {Array.from({ length: caja.tamano }, (_, i) => {
              const id = caja.sabores[i]
              const sabor = id ? POR_ID[id] : null
              return (
                <li key={i} className="kraft__hueco">
                  {sabor ? (
                    <button
                      type="button"
                      className="kraft__galleta"
                      onClick={() => quitarGalleta(i)}
                      aria-label={`Quitar ${sabor.nombre} de la caja`}
                    >
                      <Galleta id={sabor.id} aspecto={sabor.aspecto} />
                      <span className="kraft__quitar" aria-hidden="true">
                        ×
                      </span>
                    </button>
                  ) : (
                    <span className="kraft__vacio">
                      <span className="sr-only">Hueco vacío</span>
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="paleta">
          <p className="paleta__titulo" id="paleta-titulo">
            {llena ? 'Caja completa. Toca una galleta de la caja para cambiarla.' : 'Añade galletas:'}
          </p>
          <ul className="paleta__lista" aria-labelledby="paleta-titulo" ref={paletaRef}>
            {saboresFijos.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  className="paleta__boton"
                  aria-disabled={llena || undefined}
                  onClick={() => anadirGalleta(s.id)}
                  aria-label={`Añadir ${s.nombre}`}
                >
                  <Galleta id={s.id} aspecto={s.aspecto} />
                  <span aria-hidden="true">{s.nombre}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="campo">
          <label htmlFor={idTarjeta}>Mensaje para la tarjeta (opcional)</label>
          <textarea
            id={idTarjeta}
            rows={3}
            value={tarjeta}
            maxLength={MAX_TARJETA + 20}
            aria-describedby={idAyuda}
            aria-invalid={errorTarjeta ? true : undefined}
            onChange={(e) => cambiar(() => setTarjeta(e.target.value))}
            placeholder="¡Feliz cumpleaños, Lucía!"
          />
          <p id={idAyuda} className={`campo__ayuda ${errorTarjeta ? 'campo__ayuda--error' : ''}`}>
            {errorTarjeta ?? `${tarjeta.length} / ${MAX_TARJETA}`}
          </p>
        </div>

        <div className="campo">
          <label htmlFor={idFecha}>¿Para cuándo la quieres? (opcional)</label>
          <input
            id={idFecha}
            type="text"
            value={fecha}
            maxLength={60}
            autoComplete="off"
            onChange={(e) => cambiar(() => setFecha(e.target.value))}
            placeholder="Por ejemplo: sábado por la tarde"
          />
        </div>

        <button type="submit" className="boton boton--rojo boton--ancho">
          Preparar mensaje
        </button>

        <div className="caja__resultado">
          {error && (
            <p className="caja__error" role="alert">
              {error}
            </p>
          )}
          {mensaje && (
            <div className="ticket">
              <label className="ticket__titulo" htmlFor="mensaje-final">
                Tu mensaje
              </label>
              <textarea id="mensaje-final" ref={textoRef} readOnly value={mensaje} rows={10} />
              <div className="ticket__acciones">
                <a
                  className="boton boton--rojo"
                  href={negocio.instagram.valor.chat}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={copiarYAbrir}
                >
                  Copiar y abrir chat
                  <span className="sr-only"> (se abre en otra pestaña)</span>
                </a>
                <button type="button" className="boton boton--linea" onClick={copiar}>
                  {copia === 'copiado' ? 'Copiado ✓' : 'Solo copiar'}
                </button>
              </div>
              <p className="ticket__ayuda" aria-live="polite">
                {copia === 'error'
                  ? 'No se pudo copiar automáticamente: el texto está seleccionado, cópialo a mano.'
                  : `Se copia el mensaje y se abre el chat de Instagram con ${negocio.instagram.valor.usuario}. Solo tienes que pegarlo y enviarlo.`}
              </p>
            </div>
          )}
        </div>
      </form>
    </section>
  )
}
