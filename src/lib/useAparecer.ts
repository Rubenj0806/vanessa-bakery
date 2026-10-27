import { useEffect } from 'react'

/**
 * Hace aparecer suavemente los elementos con [data-reveal] al llegar a ellos.
 * Si el usuario prefiere menos movimiento, o no hay IntersectionObserver, no hace nada:
 * el contenido se ve siempre (el CSS solo lo oculta cuando <html> tiene la clase `con-aparecer`).
 */
export function useAparecer() {
  useEffect(() => {
    const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (menosMovimiento || !('IntersectionObserver' in window)) return

    const html = document.documentElement
    html.classList.add('con-aparecer')
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            // atributo propio: React reescribe className al volver a renderizar y borraría una clase
            e.target.setAttribute('data-visible', '')
            obs.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => obs.observe(el))
    return () => {
      obs.disconnect()
      html.classList.remove('con-aparecer')
    }
  }, [])
}
