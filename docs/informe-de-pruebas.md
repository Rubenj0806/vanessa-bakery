# Informe de pruebas (25/10/2026)

## Automáticas

| Prueba | Resultado |
|---|---|
| `npm test` (Vitest) | 16 de 16 pasan: caja regalo, semana y dibujo de galletas |
| `npm run build` (TypeScript estricto + Vite) | Compila sin errores. JS: 256 kB (80 kB gzip). CSS: 30 kB (7,5 kB gzip) |
| `npm run lint` (oxlint) | Sin avisos |

## En el navegador (pestaña del navegador integrado en el escritorio, motor Chromium)

| Prueba | Resultado |
|---|---|
| Scroll horizontal a 320, 375, 430, 768, 1024, 1280 y 1440 px | Ninguno, tras corregir dos desbordes (320 y 768 px) |
| Consola al cargar y recorrer toda la página | Sin errores |
| Enlaces | Todos llevan a una sección que existe o a una web real (Instagram, TikTok, Google Maps, artículos de prensa) |
| Menú móvil | Abre y cierra; con Escape devuelve el foco al botón; el fondo queda inerte (no se puede tabular por debajo); al pulsar un enlace se cierra y baja a la sección |
| Caja regalo | Avisa si faltan galletas; no deja pasar de 6; quitar y añadir mueve bien el foco; genera el mensaje con sabores, tarjeta y fecha |
| Botón «Copiar» | Copia en `localhost`. Si no hay API de portapapeles, usa el método antiguo |
| Qué hay hoy | Hoy (domingo) marca el domingo y dice que hay crookies y brookies |
| Interruptor «Resaltar datos por confirmar» | Marca en amarillo los datos de directorio y de ejemplo |

## Revisión de accesibilidad (agente de QA, con script de contraste WCAG)

Problemas que encontró y ya están corregidos:

- foco que se perdía al quitar galletas o al llenar la caja
- menú móvil sin foco atrapado
- tres contrastes justos: etiqueta roja sobre beige (4,4:1), etiqueta «Ejemplo» (4,1:1) y foco amarillo sobre el kraft (1,5:1)
- anuncios duplicados para lectores de pantalla
- retardos de animación con `prefers-reduced-motion`
- zoom de iOS en el texto del mensaje
- alternativa a `overflow-x: clip` para Safari anterior a 16

Contrastes medidos que pasan:

| Combinación | Contraste |
|---|---|
| Granate sobre papel | 7,82:1 |
| Texto secundario sobre papel | 7,96:1 |
| Rosa sobre chocolate | 10,23:1 |
| Blanco sobre granate | 8,49:1 |

## Lo que NO he podido comprobar

- **Safari de iOS en un iPhone real.** Solo he probado con la emulación de móvil del navegador integrado, que usa Chromium. Revisé a mano el CSS que suele fallar en Safari (fuente variable, `mask`, `backdrop-filter`, campos de 16 px), pero hay que mirarlo en tu iPhone antes de enseñarlo.
- **«Copiar y abrir chat» en un móvil real.** No sé si `ig.me` abre la app de Instagram o la web en cada móvil. Tampoco sé si Safari permite abrir la pestaña después de copiar: el código lo intenta en el mismo toque.
- **Lector de pantalla real** (VoiceOver o NVDA). Revisé la semántica y el foco, pero no lo he escuchado.
- **Lighthouse.** No lo he pasado, así que no doy puntuación.
- **`prefers-reduced-motion` activado.** Está en el CSS y lo revisó el agente, pero no lo he emulado.
