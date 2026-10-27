/**
 * Datos del negocio. TODO lo que la web dice de The Vanessa Bakery sale de aquí.
 *
 * `estado` indica de dónde viene cada dato:
 *  - 'propio': lo publica la propia tienda (su Instagram, Linktree o TikTok, 25/10/2026).
 *  - 'prensa': publicado en prensa (ver `fuentes`). Que Vanessa lo revise igualmente.
 *  - 'directorio': solo aparece en un directorio online. Puede estar desactualizado.
 *  - 'ejemplo': inventado para la demo. Hay que sustituirlo antes de publicar.
 *
 * Los datos 'directorio' y 'ejemplo' se marcan en la web con un aviso visible.
 */

export type Estado = 'propio' | 'prensa' | 'directorio' | 'ejemplo'

export interface Dato<T> {
  valor: T
  estado: Estado
}

export interface Franja {
  dias: string
  horas: string
}

export interface Tienda {
  id: string
  nombre: string
  detalle: string // segunda línea de la dirección
  mapaUrl: string // enlace de Google Maps que publica la propia tienda en su Linktree
  justEatUrl: string
  soloParaLlevar: boolean | null // null = no lo sabemos
  horario: Dato<Franja[]> | null // null = sin publicar
  estado: Estado
}

export const fuentes = [
  {
    nombre: 'El Ideal Gallego, 13/10/2025',
    url: 'https://www.elidealgallego.com/gastroideal/2025-10-13/vanessa-bakery-el-rincon-mas-dulce-de-la-estrecha-de-san-andres-811037.html',
  },
  {
    nombre: 'Quincemil (El Español), 08/08/2025',
    url: 'https://www.elespanol.com/quincemil/vivir/gastrocoruna/20250808/abre-coruna-vanessa-bakery-primera-tienda-galletas-estilo-new-york-ciudad/1003743879708_0.html',
  },
  {
    nombre: 'Páxinas Galegas (ficha del negocio)',
    url: 'https://www.paxinasgalegas.es/the-vanessa-bakery-722620em.html',
  },
  { nombre: 'Instagram @thevanessabakery (bio)', url: 'https://www.instagram.com/thevanessabakery/' },
  { nombre: 'Linktree de la tienda', url: 'https://linktr.ee/thevanessabakery5' },
  { nombre: 'TikTok @vanessabakeryartesanal (bio)', url: 'https://www.tiktok.com/@vanessabakeryartesanal' },
] as const

/**
 * Frases que usa la propia marca. La web no inventa eslogan: usa estas.
 *  - «Cookies artesanales»: bio de Instagram y Linktree.
 *  - «Al estilo New York»: bio de TikTok.
 *  - «New York Style Cookies»: lo que pone en sus bolsas.
 */
export const frasesMarca = {
  principal: 'Cookies artesanales',
  estilo: 'Al estilo New York',
}

/** Las dos tiendas que aparecen en su bio de Instagram y en su Linktree. */
export const tiendas: Tienda[] = [
  {
    id: 'estrecha',
    nombre: 'Estrecha de San Andrés, 8',
    detalle: '15003 A Coruña',
    mapaUrl: 'https://maps.app.goo.gl/yp7YEEfNRwEKxwiZ6',
    justEatUrl: 'https://www.just-eat.es/restaurants-the-vanessa-bakery-artesanal-a-coruna/menu',
    soloParaLlevar: true, // según la prensa
    horario: {
      valor: [
        { dias: 'Lunes a sábado', horas: '11:00–14:00 · 17:00–20:30' },
        { dias: 'Domingo', horas: '11:00–16:00' },
      ],
      estado: 'directorio',
    },
    estado: 'propio',
  },
  {
    id: 'marineda',
    nombre: 'Marineda City',
    detalle: 'Diagonal al Arenal, al lado de Cero da Costa', // con sus palabras, de la bio
    mapaUrl: 'https://maps.app.goo.gl/4ehvRgqR17y1TuseA',
    justEatUrl: 'https://www.just-eat.es/restaurants-the-vanessa-bakery-artesanal-marineda-coruna-a/menu',
    soloParaLlevar: null,
    horario: null,
    estado: 'propio',
  },
]

export const negocio = {
  nombre: 'The Vanessa Bakery',
  responsable: { valor: 'Vanessa Armas de Velásquez', estado: 'prensa' } as Dato<string>,

  telefono: { valor: '600 376 884', estado: 'directorio' } as Dato<string>,

  // Su Linktree tiene un botón de WhatsApp, pero el número no se ve sin pulsarlo.
  // Cuando Vanessa lo confirme, se pone aquí (solo dígitos, con 34) y la caja regalo
  // podrá mandar el mensaje ya escrito por WhatsApp.
  whatsapp: { valor: null, estado: 'ejemplo' } as Dato<string | null>,

  instagram: {
    // chat: enlace oficial de Instagram que abre directamente un mensaje a la cuenta
    valor: { usuario: '@thevanessabakery', url: 'https://www.instagram.com/thevanessabakery/', chat: 'https://ig.me/m/thevanessabakery' },
    estado: 'propio',
  } as Dato<{ usuario: string; url: string; chat: string }>,

  // Confirmado: su Linktree enlaza a esta cuenta
  tiktok: {
    valor: { usuario: '@vanessabakeryartesanal', url: 'https://www.tiktok.com/@vanessabakeryartesanal' },
    estado: 'propio',
  } as Dato<{ usuario: string; url: string }>,

  glovoUrl: 'https://glovo.go.link/open?adjust_deeplink=glovoapp%3A%2F%2Fopen%3Flink_type%3Dstore%26store_id%3D556397&adjust_t=s321jkn',
  linktreeUrl: 'https://linktr.ee/thevanessabakery5',

  apertura: { valor: '1 de septiembre de 2025', estado: 'prensa' } as Dato<string>,
}

/** Tamaños de caja regalo. Son de ejemplo: no se ha publicado cuántas galletas lleva cada caja. */
export const tamanosCaja: Dato<number[]> = { valor: [4, 6], estado: 'ejemplo' }

/** Longitud máxima del mensaje de la tarjeta (decisión de diseño de la demo). */
export const MAX_TARJETA = 140
