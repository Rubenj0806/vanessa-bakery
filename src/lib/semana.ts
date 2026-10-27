import { carta } from '../data/sabores'

const NOMBRES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
const CORTOS = ['D', 'L', 'M', 'X', 'J', 'V', 'S']

export interface DiaCarta {
  indice: number // 0 = domingo, como Date.getDay()
  nombre: string
  corto: string
  esFinDeSemana: boolean
  extras: string[] // lo que hay ese día además de las galletas
}

export function infoDia(indice: number): DiaCarta {
  const esFinDeSemana = indice === 0 || indice === 6
  return {
    indice,
    nombre: NOMBRES[indice],
    corto: CORTOS[indice],
    esFinDeSemana,
    extras: esFinDeSemana ? [...carta.diario, ...carta.finDeSemana] : [...carta.diario],
  }
}

/** La semana empezando en lunes, como se lee en España. */
export function semanaDesdeLunes(): DiaCarta[] {
  return [1, 2, 3, 4, 5, 6, 0].map(infoDia)
}

/** Frase para el día de hoy, por ejemplo: "Hoy es sábado: hay crookies y brookies." */
export function fraseDeHoy(fecha: Date): string {
  const dia = infoDia(fecha.getDay())
  if (dia.esFinDeSemana) {
    return `Hoy es ${dia.nombre}: además de las galletas hay ${listar(carta.finDeSemana).toLowerCase()}.`
  }
  const dias = 6 - fecha.getDay()
  return `Hoy es ${dia.nombre}. Los crookies y brookies vuelven ${dias === 1 ? 'mañana' : `en ${dias} días`}, el fin de semana.`
}

/** ["a","b","c"] → "a, b y c" */
export function listar(items: string[]): string {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`
}
