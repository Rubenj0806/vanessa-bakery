import type { Estado } from '../data/negocio'

const TEXTO: Record<Estado, string | null> = {
  propio: null,
  prensa: null,
  directorio: 'Por confirmar',
  ejemplo: 'Ejemplo',
}

const AYUDA: Record<Estado, string> = {
  propio: '',
  prensa: '',
  directorio: 'Dato sacado de un directorio online. Hay que confirmarlo con la tienda.',
  ejemplo: 'Contenido de ejemplo para la demo. Hay que sustituirlo.',
}

/** Etiqueta pequeña que avisa de que un dato no es oficial. Los datos de prensa no llevan etiqueta. */
export function Marca({ estado }: { estado: Estado }) {
  const texto = TEXTO[estado]
  if (!texto) return null
  return (
    <span className={`marca marca--${estado}`} title={AYUDA[estado]}>
      {texto}
      <span className="sr-only">: {AYUDA[estado]}</span>
    </span>
  )
}
