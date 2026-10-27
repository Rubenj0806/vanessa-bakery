import { MAX_TARJETA } from '../data/negocio'

/**
 * Lógica de la caja regalo. No es un carrito: solo ayuda a preparar
 * un mensaje para enviárselo a la tienda. No se paga ni se envía nada desde la web.
 */
export interface Caja {
  tamano: number
  sabores: string[] // ids, en el orden en que se añaden; se pueden repetir
}

export function cajaVacia(tamano: number): Caja {
  return { tamano, sabores: [] }
}

export function estaLlena(caja: Caja): boolean {
  return caja.sabores.length >= caja.tamano
}

export function anadir(caja: Caja, id: string): Caja {
  if (estaLlena(caja)) return caja
  return { ...caja, sabores: [...caja.sabores, id] }
}

export function quitar(caja: Caja, posicion: number): Caja {
  if (posicion < 0 || posicion >= caja.sabores.length) return caja
  return { ...caja, sabores: caja.sabores.filter((_, i) => i !== posicion) }
}

/** Si la caja se hace más pequeña, se quitan las últimas galletas que no caben. */
export function cambiarTamano(caja: Caja, tamano: number): Caja {
  return { tamano, sabores: caja.sabores.slice(0, tamano) }
}

/** Agrupa repetidas: [{nombre:'Clásica', cantidad:2}, ...] en orden de primera aparición. */
export function resumen(caja: Caja, nombres: Record<string, string>): { nombre: string; cantidad: number }[] {
  const mapa = new Map<string, number>()
  for (const id of caja.sabores) mapa.set(id, (mapa.get(id) ?? 0) + 1)
  return [...mapa].map(([id, cantidad]) => ({ nombre: nombres[id] ?? id, cantidad }))
}

/** Devuelve un mensaje de error para la tarjeta, o null si está bien. */
export function validarTarjeta(texto: string): string | null {
  if (texto.length > MAX_TARJETA) return `La tarjeta admite ${MAX_TARJETA} caracteres como máximo.`
  return null
}

export function validarCaja(caja: Caja): string | null {
  if (caja.sabores.length === 0) return 'Añade al menos una galleta a la caja.'
  if (!estaLlena(caja)) {
    const faltan = caja.tamano - caja.sabores.length
    return `Te ${faltan === 1 ? 'falta 1 galleta' : `faltan ${faltan} galletas`} para completar la caja de ${caja.tamano}.`
  }
  return null
}

/** Texto listo para copiar y mandar por mensaje a la tienda. */
export function construirMensaje(caja: Caja, nombres: Record<string, string>, tarjeta: string, fecha = ''): string {
  const lineas = resumen(caja, nombres).map((l) => `· ${l.cantidad} × ${l.nombre}`)
  const texto = tarjeta.trim()
  const cuando = fecha.trim()
  return [
    `¡Hola, Vanessa! Me gustaría encargar una caja regalo con estas ${caja.sabores.length} galletas:`,
    ...lineas,
    texto ? `\nPara la tarjeta: «${texto}»` : '',
    cuando ? `\nLa necesitaría para: ${cuando}` : '',
    '\n¿Me confirmas si puede ser y el precio? ¡Gracias!',
  ]
    .filter(Boolean)
    .join('\n')
}
