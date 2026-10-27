# Dirección creativa

## La idea: «Nueva York cabe en la calle Estrecha»

The Vanessa Bakery vende galletas estilo New York, que son gruesas y grandes, en un local pequeñito de la Estrecha de San Andrés, una de las calles más estrechas de A Coruña. Todo el diseño sale de ese contraste: **algo grande en un sitio estrecho**.

- **Tipografía que se estira.** Uso una sola familia, Archivo, que es variable en anchura. En el titular, «COOKIES» va al 125 % de ancho y «NEW YORK» al 62 %, entre dos líneas, como una calle estrecha.
- **El titular usa sus propias palabras, no un eslogan inventado.** «Cookies artesanales» sale de su bio de Instagram y de su Linktree, y «Al estilo New York» de su bio de TikTok. Juntas forman el titular: «Cookies artesanales al estilo New York». La primera versión decía «Nueva York cabe en la calle Estrecha», pero era una frase mía.
- **Galletas enormes.** La galleta del hero ocupa media pantalla y se parte al cargar: las mitades giran desde abajo y se abren en V. Dentro se ve el chocolate fundido, con brillo, gotas y hilos entre las mitades. Es lo que la prensa destaca de sus galletas: casi todas van rellenas.
- **El remate.** En el esquema de la calle, la galleta del nº 8 es más ancha que la propia calle. Es la misma idea, contada sin palabras.

## Lo que evité a propósito

- Plantillas de pastelería genéricas. Los colores sí son los de su marca (ver abajo), pero la composición y la tipografía son propias de esta web.
- Fotos de stock de galletas que no son suyas. Si la web enseña una galleta, tiene que poder ser la suya. Por eso uso ilustraciones hasta tener fotos reales.
- Tarjetas iguales repetidas. Cada sección tiene su composición: carta de deli numerada, semana con forma de arco, caja kraft vista desde arriba, tique de compra y cartel final.

## Colores: los de su marca

La primera versión usaba un rojo tomate «de deli» sobre crema. Luego miré su Instagram y vi que su identidad es otra:

- Logo «Vanessa Bakery» en cursiva granate sobre rosa claro.
- Portadas de historias en granate, rosa fuerte y rosa pálido.
- Camisetas rosas en el mostrador.

Así que cambié la paleta a la suya y mantuve el concepto y la tipografía. Las letras condensadas y grandes contrastan bien con su logo cursivo, que irá en la cabecera cuando lo pase en archivo (no lo copio de Instagram).

## Sistema visual

| Pieza | Decisión |
|---|---|
| Papel `#F7EEE8` | Crema con un punto rosado y un grano muy suave, como papel de envolver |
| Rosa pálido `#F6DDE2` | Segundo fondo (sección «Hoy», vitrina de sabores, esquema de la calle), como el fondo de su logo |
| Granate `#8E1B2E` | Botones, acentos, sello y días de fin de semana. Es el color de su logo |
| Granate noche `#4A0D1B` | Fondo de la caja regalo |
| Rosa `#F6B3C3` | Acentos sobre fondos oscuros (etiquetas, pie) |
| Cacao `#24150E` | Texto principal, bloque de prensa y pie: el chocolate de las galletas |
| Kraft `#C99B62` | La caja regalo y detalles de packaging |
| Archivo variable | Titulares condensados (62–80 %) y anchos (125 %); texto al 100 % |
| Instrument Serif cursiva | Contrapunto cálido en pocas palabras («cabe en la calle», «probando») |
| Sombra «pegatina» | Desplazada y sin difuminar (`4px 4px 0`), como un cartel impreso |
| Bordes de 2 px | Líneas de cartel que separan la carta y las secciones |

## Movimiento

- La galleta del hero se abre una vez al cargar.
- El sello del sabor de la semana gira despacio.
- Las secciones aparecen suavemente al llegar a ellas.
- En la carta, el nombre se ensancha al pasar por encima.
- Las galletas caen en la caja al añadirlas.
- Con `prefers-reduced-motion` todo queda quieto en su estado final. Si falla JavaScript o no hay `IntersectionObserver`, el contenido se ve igual.

## Ilustraciones de galletas

Se generan en SVG con código (`src/lib/galleta.ts`). La forma irregular, las grietas y las pepitas salen de una semilla, así que cada sabor tiene siempre el mismo dibujo. Los colores son una interpretación mía de cada sabor: **hay que cambiarlos por fotos reales**.

## Contrastes medidos (WCAG 2.x)

| Combinación | Contraste |
|---|---|
| Granate sobre papel | 7,82:1 |
| Granate sobre rosa pálido | 6,97:1 |
| Blanco sobre granate (botones) | 8,49:1 |
| Rosa sobre granate (fin de semana) | 5,18:1 |
| Papel sobre granate noche | 13,45:1 |
| Texto de ejemplo en los campos de la caja | Por encima de 4,5:1, tras subirlo desde 4,28:1 |

Todo el texto pasa 4,5:1.
