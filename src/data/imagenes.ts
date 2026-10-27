/**
 * Fotos reales. Mientras un valor sea null, la web usa la ilustración en SVG.
 *
 * Para poner la foto de verdad en el inicio:
 *  1. Una foto de una galleta partida por la mitad, con el relleno a la vista,
 *     con FONDO TRANSPARENTE (recortada) para que flote sobre el rosa como la ilustración.
 *     Cuadrada o casi, de unos 1200 × 1200 px.
 *  2. Exportarla en WebP con transparencia (y AVIF si se puede): pesa mucho menos que un PNG.
 *  3. Guardarla en public/fotos/ (por ejemplo public/fotos/galleta-hero.webp).
 *  4. Rellenar `galletaHero` aquí abajo. No hay que tocar nada más.
 */
export interface Foto {
  src: string // ruta relativa desde public/, sin barra inicial: 'fotos/galleta-hero.webp'
  srcAvif?: string
  alt: string
  ancho: number
  alto: number
}

export const fotos: { galletaHero: Foto | null } = {
  galletaHero: null,
  // Ejemplo de cómo quedaría:
  // galletaHero: {
  //   src: 'fotos/galleta-hero.webp',
  //   srcAvif: 'fotos/galleta-hero.avif',
  //   alt: 'Galleta clásica partida por la mitad, con el chocolate fundido a la vista',
  //   ancho: 1200,
  //   alto: 1200,
  // },
}
