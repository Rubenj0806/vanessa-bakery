import { memo, useId, useMemo } from 'react'
import type { Aspecto } from '../data/sabores'
import { contornoGalleta, crearAleatorio, grietas, posicionesTopping, semillaDe } from '../lib/galleta'

interface Props {
  id: string
  aspecto: Aspecto
  /** Partida en dos, enseñando el relleno (para el hero). */
  partida?: boolean
  className?: string
  /** Texto alternativo. Si no se pasa, la ilustración es decorativa. */
  titulo?: string
  /** Devuelve solo un <g> (para meterla dentro de otro SVG). */
  comoGrupo?: boolean
}

/** Mezcla dos colores hex: t = 0 devuelve a, t = 1 devuelve b. */
function mezclar(a: string, b: string, t: number): string {
  const h = (x: string) => [1, 3, 5].map((i) => parseInt(x.slice(i, i + 2), 16))
  const [ca, cb] = [h(a), h(b)]
  return '#' + ca.map((v, i) => Math.round(v + (cb[i] - v) * t).toString(16).padStart(2, '0')).join('')
}

/** Trozo de chocolate irregular (un polígono de 5–6 lados). */
function trozo(semilla: number, escala: number): string {
  const azar = crearAleatorio(semilla)
  const lados = 5 + Math.floor(azar() * 2)
  let d = ''
  for (let i = 0; i < lados; i++) {
    const a = (i / lados) * Math.PI * 2
    const r = escala * (0.75 + azar() * 0.5)
    d += `${i ? 'L' : 'M'}${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`
  }
  return d + 'Z'
}

function Toppings({ semilla, aspecto }: { semilla: number; aspecto: Aspecto }) {
  const { topping, colorTopping } = aspecto

  if (topping === 'glaseado') {
    // hilos de glaseado en zigzag
    const azar = crearAleatorio(semilla)
    const lineas = [-46, -18, 10, 38].map((y, i) => {
      let d = `M-70 ${y + azar() * 8}`
      for (let x = -55; x <= 70; x += 15) d += ` L${x} ${y + (i % 2 ? 10 : -10) * (x % 30 === 5 ? 1 : -1) + azar() * 4}`
      return d
    })
    return (
      <g stroke={colorTopping} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.92">
        {lineas.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    )
  }

  if (topping === 'remolino') {
    return (
      <path
        d="M0 0 C 14 -4, 18 14, 2 20 C -20 26, -32 0, -18 -20 C -2 -42, 40 -38, 46 -6 C 52 28, 18 54, -14 50"
        stroke={colorTopping}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
    )
  }

  if (topping === 'azucar') {
    const pts = posicionesTopping(semilla, 70, 100, 0.86).concat(posicionesTopping(semilla + 1, 70, 100, 0.86))
    return (
      <g fill={colorTopping}>
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={1.4 + p.tam} opacity={0.75} />
        ))}
      </g>
    )
  }

  const cantidad = topping === 'migas' ? 13 : topping === 'trocitos' ? 14 : 11
  const pts = posicionesTopping(semilla, cantidad)
  const escala = topping === 'trocitos' ? 6 : topping === 'migas' ? 8 : 10
  return (
    <g fill={colorTopping}>
      {pts.map((p, i) => (
        <path key={i} d={trozo(semilla + i, escala * p.tam)} transform={`translate(${p.x} ${p.y}) rotate(${p.giro})`} />
      ))}
    </g>
  )
}

/**
 * La cara interior de la galleta al partirla: una franja de miga más clara a lo largo de la rotura,
 * con algún trozo de chocolate. Se recorta con la forma de la galleta para no salirse.
 */
function CaraRota({ uid, rotura, aspecto }: { uid: string; rotura: string; aspecto: Aspecto }) {
  return (
    <g clipPath={`url(#forma-${uid})`}>
      <path d={rotura} stroke={mezclar(aspecto.masa, '#fff4e0', 0.3)} strokeWidth="11" strokeLinejoin="round" fill="none" />
    </g>
  )
}

/** Una galleta estilo New York dibujada en SVG. memo: no se vuelve a dibujar si no cambian sus props. */
export const Galleta = memo(function Galleta({ id, aspecto, partida = false, className, titulo, comoGrupo = false }: Props) {
  const uid = useId().replace(/:/g, '')
  const semilla = semillaDe(id)
  const contorno = useMemo(() => contornoGalleta(semilla), [semilla])
  const lineas = useMemo(() => grietas(semilla, 5), [semilla])

  const cuerpo = (
    <g>
      {/* canto: la misma forma desplazada y más oscura, para dar grosor */}
      <path d={contorno} fill={aspecto.borde} transform="translate(0 7)" />
      <path d={contorno} fill={`url(#masa-${uid})`} />
      <g stroke={aspecto.borde} strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.55">
        {lineas.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <Toppings semilla={semilla} aspecto={aspecto} />
      <path d={contorno} fill={`url(#luz-${uid})`} />
    </g>
  )

  const gradientes = (
    <>
      <radialGradient id={`masa-${uid}`} cx="45%" cy="40%" r="65%">
        <stop offset="0%" stopColor={aspecto.masa} />
        <stop offset="85%" stopColor={aspecto.masa} />
        <stop offset="100%" stopColor={aspecto.borde} />
      </radialGradient>
      <radialGradient id={`luz-${uid}`} cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.18" />
        <stop offset="60%" stopColor="#fff" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.16" />
      </radialGradient>
    </>
  )

  if (comoGrupo) {
    return (
      <g aria-hidden="true">
        <defs>{gradientes}</defs>
        {cuerpo}
      </g>
    )
  }

  // línea de rotura en zigzag por el centro
  const rotura = 'M6 -130 L-6 -80 L10 -45 L-8 -10 L7 22 L-9 55 L6 90 L-4 130'

  return (
    <svg
      className={className}
      viewBox="-140 -140 280 290"
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
    >
      <defs>
        {gradientes}
        {partida && (
          <>
            <radialGradient id={`chocolate-${uid}`} cx="45%" cy="35%" r="70%">
              <stop offset="0%" stopColor={mezclar(aspecto.relleno, '#ffffff', 0.18)} />
              <stop offset="55%" stopColor={aspecto.relleno} />
              <stop offset="100%" stopColor={mezclar(aspecto.relleno, '#000000', 0.45)} />
            </radialGradient>
            <clipPath id={`forma-${uid}`}>
              <path d={contorno} />
            </clipPath>
            <clipPath id={`izq-${uid}`}>
              <path d={`${rotura} L-200 130 L-200 -130 Z`} />
            </clipPath>
            <clipPath id={`der-${uid}`}>
              <path d={`${rotura} L200 130 L200 -130 Z`} />
            </clipPath>
          </>
        )}
      </defs>

      {/* sombra en el papel */}
      <ellipse cx="6" cy="122" rx="104" ry="13" fill="#24150E" opacity="0.14" />

      {partida ? (
        <>
          {/* Relleno fundido: cuña con bordes blandos (más ancha arriba porque las mitades se abren en V),
              degradado con brillo, migas de masa pegadas y gotas que caen */}
          <g className="galleta__relleno">
            <path
              d="M-52 -80 C -34 -96, 30 -98, 52 -80 C 44 -62, 38 -50, 34 -34 C 30 -16, 36 -4, 28 12 C 22 28, 26 44, 18 62 C 14 76, 16 88, 8 98 C 2 104, -6 104, -10 98 C -18 86, -14 72, -20 58 C -28 40, -22 24, -30 6 C -36 -10, -32 -24, -38 -40 C -42 -54, -50 -64, -52 -80 Z"
              fill={`url(#chocolate-${uid})`}
            />
            {/* gotas que caen por el borde inferior */}
            <path d="M-6 96 C -10 110, -9 120, -2 124 C 5 120, 6 110, 2 96 Z" fill={aspecto.relleno} />
            <ellipse cx="-1" cy="127" rx="11" ry="4" fill={aspecto.relleno} opacity="0.85" />
            <path d="M14 70 C 18 80, 17 88, 13 92 C 9 88, 9 80, 12 70 Z" fill={aspecto.relleno} />
            {/* migas de masa pegadas al chocolate */}
            <g fill={aspecto.masa}>
              <circle cx="-34" cy="-30" r="4" />
              <circle cx="30" cy="-48" r="3.4" />
              <circle cx="-22" cy="40" r="3" />
              <circle cx="24" cy="18" r="2.6" />
              <circle cx="-8" cy="-70" r="2.4" />
            </g>
            {/* brillo del chocolate fundido */}
            <g stroke={mezclar(aspecto.relleno, '#ffffff', 0.55)} strokeLinecap="round" fill="none" opacity="0.55">
              <path d="M-16 -74 C -6 -80, 8 -80, 16 -76" strokeWidth="4" />
              <path d="M-6 -40 C -2 -20, -8 0, -4 16" strokeWidth="3" />
              <path d="M2 40 C 4 52, 0 62, 2 70" strokeWidth="2.4" />
            </g>
          </g>
          <g className="galleta__mitad galleta__mitad--izq" clipPath={`url(#izq-${uid})`}>
            {cuerpo}
            <CaraRota uid={uid} rotura={rotura} aspecto={aspecto} />
          </g>
          <g className="galleta__mitad galleta__mitad--der" clipPath={`url(#der-${uid})`}>
            {cuerpo}
            <CaraRota uid={uid} rotura={rotura} aspecto={aspecto} />
          </g>
          {/* hilos de chocolate que se estiran entre las dos mitades */}
          <g className="galleta__hilos" stroke={aspecto.relleno} strokeLinecap="round" fill="none">
            <path d="M-22 -54 C -8 -46, 8 -46, 22 -56" strokeWidth="3" />
            <path d="M-18 -8 C -6 0, 6 0, 16 -10" strokeWidth="2.2" />
          </g>
        </>
      ) : (
        cuerpo
      )}
    </svg>
  )
})
