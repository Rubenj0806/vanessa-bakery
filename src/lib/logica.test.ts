import { describe, expect, it } from 'vitest'
import { contornoGalleta, crearAleatorio, grietas, posicionesTopping, semillaDe } from './galleta'
import { fraseDeHoy, infoDia, listar, semanaDesdeLunes } from './semana'
import { anadir, cajaVacia, cambiarTamano, construirMensaje, quitar, resumen, validarCaja, validarTarjeta } from './caja'
import { MAX_TARJETA } from '../data/negocio'

describe('galleta', () => {
  it('el generador con semilla es determinista y está entre 0 y 1', () => {
    const a = crearAleatorio(42)
    const b = crearAleatorio(42)
    for (let i = 0; i < 50; i++) {
      const x = a()
      expect(x).toBe(b())
      expect(x).toBeGreaterThanOrEqual(0)
      expect(x).toBeLessThan(1)
    }
  })

  it('la misma semilla da el mismo contorno y otra semilla uno distinto', () => {
    expect(contornoGalleta(1)).toBe(contornoGalleta(1))
    expect(contornoGalleta(1)).not.toBe(contornoGalleta(2))
    expect(contornoGalleta(1)).toMatch(/^M.*Z$/)
  })

  it('semillaDe es estable', () => {
    expect(semillaDe('clasica')).toBe(semillaDe('clasica'))
    expect(semillaDe('clasica')).not.toBe(semillaDe('ruby'))
  })

  it('los toppings quedan dentro de la galleta y separados', () => {
    const pts = posicionesTopping(7, 12, 100)
    expect(pts.length).toBeGreaterThan(0)
    for (const p of pts) expect(Math.hypot(p.x, p.y)).toBeLessThanOrEqual(78.01)
    for (let i = 0; i < pts.length; i++)
      for (let j = i + 1; j < pts.length; j++)
        expect(Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)).toBeGreaterThan(16)
  })

  it('genera el número de grietas pedido', () => {
    expect(grietas(3, 5)).toHaveLength(5)
  })
})

describe('semana', () => {
  it('entre semana hay cheesecake y lemon pie', () => {
    expect(infoDia(3).extras).toEqual(['Cheesecake', 'Lemon pie'])
    expect(infoDia(3).esFinDeSemana).toBe(false)
  })

  it('el fin de semana se añaden crookies y brookies', () => {
    expect(infoDia(6).extras).toContain('Crookies')
    expect(infoDia(0).extras).toContain('Brookies')
  })

  it('la semana empieza en lunes y acaba en domingo', () => {
    const s = semanaDesdeLunes()
    expect(s.map((d) => d.corto).join('')).toBe('LMXJVSD')
  })

  it('frase de hoy', () => {
    expect(fraseDeHoy(new Date(2026, 9, 24))).toBe('Hoy es sábado: además de las galletas hay crookies y brookies.') // sábado
    expect(fraseDeHoy(new Date(2026, 9, 23))).toContain('mañana') // viernes
    expect(fraseDeHoy(new Date(2026, 9, 19))).toContain('en 5 días') // lunes
  })

  it('listar une con comas e «y»', () => {
    expect(listar(['a'])).toBe('a')
    expect(listar(['a', 'b', 'c'])).toBe('a, b y c')
  })
})

describe('caja regalo', () => {
  const nombres = { clasica: 'Clásica', ruby: 'Ruby' }

  it('no deja añadir más galletas de las que caben', () => {
    let c = cajaVacia(2)
    c = anadir(c, 'clasica')
    c = anadir(c, 'ruby')
    c = anadir(c, 'ruby')
    expect(c.sabores).toEqual(['clasica', 'ruby'])
  })

  it('quitar por posición y cambiar de tamaño', () => {
    let c = { tamano: 6, sabores: ['clasica', 'ruby', 'clasica', 'ruby'] }
    c = quitar(c, 1)
    expect(c.sabores).toEqual(['clasica', 'clasica', 'ruby'])
    expect(quitar(c, 10)).toBe(c)
    expect(cambiarTamano(c, 2).sabores).toEqual(['clasica', 'clasica'])
  })

  it('resumen agrupa repetidas', () => {
    expect(resumen({ tamano: 4, sabores: ['ruby', 'clasica', 'ruby'] }, nombres)).toEqual([
      { nombre: 'Ruby', cantidad: 2 },
      { nombre: 'Clásica', cantidad: 1 },
    ])
  })

  it('valida caja y tarjeta', () => {
    expect(validarCaja(cajaVacia(4))).toMatch(/al menos una/)
    expect(validarCaja({ tamano: 4, sabores: ['ruby', 'ruby', 'ruby'] })).toMatch(/falta 1 galleta/)
    expect(validarCaja({ tamano: 2, sabores: ['ruby', 'ruby'] })).toBeNull()
    expect(validarTarjeta('x'.repeat(MAX_TARJETA))).toBeNull()
    expect(validarTarjeta('x'.repeat(MAX_TARJETA + 1))).not.toBeNull()
  })

  it('construye el mensaje con la tarjeta solo si hay texto', () => {
    const c = { tamano: 2, sabores: ['ruby', 'ruby'] }
    const conTarjeta = construirMensaje(c, nombres, '  ¡Feliz cumple!  ')
    expect(conTarjeta).toContain('2 × Ruby')
    expect(conTarjeta).toContain('«¡Feliz cumple!»')
    expect(construirMensaje(c, nombres, '   ')).not.toContain('tarjeta')
  })

  it('añade la fecha solo si se escribe', () => {
    const c = { tamano: 2, sabores: ['ruby', 'clasica'] }
    expect(construirMensaje(c, nombres, '', 'sábado por la tarde')).toContain('La necesitaría para: sábado por la tarde')
    expect(construirMensaje(c, nombres, '', '  ')).not.toContain('necesitaría')
    expect(construirMensaje(c, nombres, '')).toContain('con estas 2 galletas')
  })
})
