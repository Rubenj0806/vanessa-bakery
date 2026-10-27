/**
 * Geometría de las galletas ilustradas. Funciones puras: misma semilla, mismo dibujo.
 * Así cada sabor tiene siempre su forma y se puede probar con tests.
 */

/** Generador pseudoaleatorio con semilla (mulberry32). */
export function crearAleatorio(semilla: number): () => number {
  let a = semilla >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Convierte un texto (el id del sabor) en una semilla numérica estable. */
export function semillaDe(texto: string): number {
  let h = 2166136261
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

const r2 = (n: number) => Math.round(n * 100) / 100

/**
 * Contorno irregular de una galleta centrada en (0,0).
 * Une puntos con curvas suaves para que parezca masa horneada y no un círculo perfecto.
 */
export function contornoGalleta(semilla: number, radio = 100, puntos = 26, irregularidad = 0.07): string {
  const azar = crearAleatorio(semilla)
  const pts: [number, number][] = []
  for (let i = 0; i < puntos; i++) {
    const angulo = (i / puntos) * Math.PI * 2
    const r = radio * (1 - irregularidad / 2 + azar() * irregularidad)
    pts.push([Math.cos(angulo) * r, Math.sin(angulo) * r])
  }
  const medio = (a: [number, number], b: [number, number]): [number, number] => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  const inicio = medio(pts[pts.length - 1], pts[0])
  let d = `M${r2(inicio[0])} ${r2(inicio[1])}`
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i]
    const m = medio(p, pts[(i + 1) % pts.length])
    d += ` Q${r2(p[0])} ${r2(p[1])} ${r2(m[0])} ${r2(m[1])}`
  }
  return d + 'Z'
}

export interface Punto {
  x: number
  y: number
  tam: number
  giro: number
}

/**
 * Posiciones de los toppings (pepitas, trocitos...) dentro de la galleta,
 * evitando que se monten demasiado unos sobre otros.
 */
export function posicionesTopping(semilla: number, cantidad: number, radio = 100, margen = 0.78): Punto[] {
  const azar = crearAleatorio(semilla ^ 0x9e3779b9)
  const res: Punto[] = []
  let intentos = 0
  while (res.length < cantidad && intentos < cantidad * 40) {
    intentos++
    // raíz cuadrada para repartir de forma uniforme en el círculo
    const dist = Math.sqrt(azar()) * radio * margen
    const ang = azar() * Math.PI * 2
    const p = { x: r2(Math.cos(ang) * dist), y: r2(Math.sin(ang) * dist), tam: r2(0.6 + azar() * 0.7), giro: Math.round(azar() * 360) }
    const separacion = radio * 0.16
    if (res.every((q) => Math.hypot(q.x - p.x, q.y - p.y) > separacion)) res.push(p)
  }
  return res
}

/** Grietas de la superficie: trazos cortos y quebrados. */
export function grietas(semilla: number, cantidad = 4, radio = 100): string[] {
  const azar = crearAleatorio(semilla ^ 0x85ebca6b)
  const res: string[] = []
  for (let i = 0; i < cantidad; i++) {
    const ang = azar() * Math.PI * 2
    const dist = radio * (0.2 + azar() * 0.45)
    let x = Math.cos(ang) * dist
    let y = Math.sin(ang) * dist
    let d = `M${r2(x)} ${r2(y)}`
    const tramos = 2 + Math.floor(azar() * 2)
    let dir = azar() * Math.PI * 2
    for (let j = 0; j < tramos; j++) {
      dir += (azar() - 0.5) * 1.4
      const largo = radio * (0.08 + azar() * 0.1)
      x += Math.cos(dir) * largo
      y += Math.sin(dir) * largo
      d += ` L${r2(x)} ${r2(y)}`
    }
    res.push(d)
  }
  return res
}
