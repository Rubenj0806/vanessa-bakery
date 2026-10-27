import type { Estado } from './negocio'

/**
 * Cómo se dibuja cada galleta. Son ilustraciones de la demo, no fotos:
 * los colores son una interpretación y hay que cambiarlos por fotos reales.
 */
export type Topping = 'chips' | 'migas' | 'remolino' | 'azucar' | 'trocitos' | 'glaseado'

export interface Aspecto {
  masa: string // color de la masa
  borde: string // color del borde tostado
  topping: Topping
  colorTopping: string
  relleno: string // color del relleno que se ve al partirla
}

export interface Sabor {
  id: string
  nombre: string
  estado: Estado
  aspecto: Aspecto
}

/**
 * Los ocho sabores fijos que publicó la prensa (El Ideal Gallego, octubre de 2025).
 * No se ponen descripciones ni ingredientes porque no están publicados:
 * cuando Vanessa los dé, se añaden aquí en un campo `descripcion`.
 */
export const saboresFijos: Sabor[] = [
  {
    id: 'clasica',
    nombre: 'Clásica',
    estado: 'prensa',
    aspecto: { masa: '#D9A15B', borde: '#A9692C', topping: 'chips', colorTopping: '#3B2216', relleno: '#4A2A1A' },
  },
  {
    id: 'cookies-cream',
    nombre: 'Cookies & cream',
    estado: 'prensa',
    aspecto: { masa: '#3A2620', borde: '#24160F', topping: 'migas', colorTopping: '#F3EBDD', relleno: '#F5EEE2' },
  },
  {
    id: 'matilda',
    nombre: 'Matilda',
    estado: 'prensa',
    aspecto: { masa: '#4B2A1C', borde: '#2E180E', topping: 'chips', colorTopping: '#1E100A', relleno: '#2A140B' },
  },
  {
    id: 'red-velvet',
    nombre: 'Red velvet cream',
    estado: 'prensa',
    aspecto: { masa: '#8E2A2A', borde: '#5E1717', topping: 'chips', colorTopping: '#F4EDE2', relleno: '#F6F0E6' },
  },
  {
    id: 'churro',
    nombre: 'Churro',
    estado: 'prensa',
    aspecto: { masa: '#D9A464', borde: '#A86F33', topping: 'azucar', colorTopping: '#F7EBD6', relleno: '#6B3B1F' },
  },
  {
    id: 'pistacho',
    nombre: 'Pistacho',
    estado: 'prensa',
    aspecto: { masa: '#D7B57A', borde: '#A3803F', topping: 'trocitos', colorTopping: '#7E9A4E', relleno: '#9DB066' },
  },
  {
    id: 'ruby',
    nombre: 'Ruby',
    estado: 'prensa',
    aspecto: { masa: '#DDB07A', borde: '#AA7A42', topping: 'chips', colorTopping: '#C9577A', relleno: '#D97A97' },
  },
  {
    id: 'lemon-pie',
    nombre: 'Lemon pie',
    estado: 'prensa',
    aspecto: { masa: '#E3BF73', borde: '#B38A3B', topping: 'glaseado', colorTopping: '#F8F1DC', relleno: '#F2D35B' },
  },
]

/**
 * Sabor de edición limitada. Cambia cada semana y Vanessa lo anuncia en Instagram,
 * así que la web NO dice qué sabor es: manda a Instagram para verlo.
 * La ilustración es genérica (no representa un sabor concreto).
 */
export const saborSemana: Sabor = {
  id: 'semana',
  nombre: 'Sabor de la semana',
  estado: 'prensa',
  aspecto: { masa: '#D08A45', borde: '#9C5A22', topping: 'remolino', colorTopping: '#F6E7CC', relleno: '#E39A4B' },
}

/** Lo que hay cada día además de las galletas (según la prensa). */
export const carta = {
  diario: ['Cheesecake', 'Lemon pie'],
  finDeSemana: ['Crookies', 'Brookies'],
}
