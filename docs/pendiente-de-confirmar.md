# Qué hay que confirmar o sustituir

Todo lo que dice la web sobre el negocio está en dos archivos: `src/data/negocio.ts` y `src/data/sabores.ts`. Cada dato lleva un `estado`:

- **propio**: lo publica la tienda en su Instagram, Linktree o TikTok (consultados el 25/10/2026).
- **prensa**: publicado en El Ideal Gallego (13/10/2025) o Quincemil (08/08/2025). Aun así, Vanessa debería revisarlo.
- **directorio**: solo sale en la ficha de Páxinas Galegas. Puede estar desactualizado. En la web lleva la etiqueta «Por confirmar».
- **ejemplo**: inventado para la demo. En la web lleva la etiqueta «Ejemplo».

El interruptor «Resaltar datos por confirmar» de la franja superior marca en amarillo todo lo que no es definitivo. Sirve para enseñárselo a Vanessa en la reunión.

## Datos

| Dato | Estado | Qué hacer |
|---|---|---|
| Tienda 1: Estrecha de San Andrés, 8, 15003 | propio | — |
| Tienda 2: Marineda City («diagonal al Arenal, al lado de Cero da Costa») | propio | — |
| Horario de la Estrecha | directorio | Confirmar con Vanessa |
| Horario de Marineda | no hay | Pedírselo |
| Just Eat (las dos tiendas), Glovo y Google Maps | propio | Enlaces sacados de su Linktree |
| Tarjeta de fidelidad (favecard) | propio | No está en la web. Preguntarle si quiere enseñarla |
| Teléfono 600 376 884 | directorio | Confirmar. Hasta entonces sale sin enlace para llamar |
| TikTok @vanessabakeryartesanal | propio | Confirmado: su Linktree enlaza a esta cuenta |
| WhatsApp | existe, pero sin número | Su Linktree tiene un botón de WhatsApp, pero el número no se ve. Pedírselo para que la caja regalo mande el encargo ya escrito |
| Tamaños de caja (4 y 6) | ejemplo | Pedir los tamaños reales y los precios |
| Instagram @thevanessabakery | propio | — |

## Textos

| Texto | Dónde | Qué hacer |
|---|---|---|
| Historia de Vanessa | `src/components/Historia.tsx` | Está redactada por mí a partir de la prensa. Que la revise o la cuente con sus palabras |
| Cita de Quincemil «la primera tienda de galletas al estilo New York de la ciudad» | `Historia.tsx` | Es el titular del artículo. Preguntarle si quiere usarla |
| Definiciones de crookie y brookie | `src/components/Hoy.tsx` | Salen de la prensa; que confirme que son así las suyas |
| Descripción de cada sabor | `src/data/sabores.ts` | No hay ninguna porque no están publicadas. Pedírselas (sobre todo Matilda y Ruby) |
| Textos legales (aviso legal, privacidad, cookies) | `src/components/Pie.tsx` | Pendientes. La web definitiva los necesita |

## Imágenes

| Imagen | Qué hacer |
|---|---|
| Galleta del inicio | Foto de una galleta partida, recortada con fondo transparente, en WebP. Se pone en `public/fotos/` y se rellena `src/data/imagenes.ts`; la web la usa sola. Instrucciones dentro de ese archivo |
| Resto de galletas ilustradas (carta, caja) | Sustituir por fotos reales de sus galletas, con fondo y luz parecidos entre sí |
| Esquema de la calle | Es ilustrativo. Se puede mantener; el botón lleva a Google Maps |
| Favicon de galleta | Cambiarlo por su logo si tiene uno |

No he usado ninguna foto ni recurso de su Instagram ni de terceros.
