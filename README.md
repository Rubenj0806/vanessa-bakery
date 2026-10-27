# The Vanessa Bakery · propuesta de web

Propuesta de diseño para **The Vanessa Bakery**, la tienda de galletas estilo New York de la Estrecha de San Andrés (A Coruña). La hice para enseñársela a la dueña y que valore encargar una web.

> **No es la web oficial.** Es una demo sin autorización de la tienda. Los datos sacados de prensa o de directorios están marcados, y no uso ninguna foto suya ni de terceros: las galletas son ilustraciones hechas para la demo.

## Qué hace

- **Carta de sabores:** los 8 sabores fijos en una lista tipo pizarra de deli. En escritorio, la galleta elegida se ve en grande.
- **Qué hay hoy:** la semana de lunes a domingo, con el día de hoy marcado. Dice si hoy hay crookies y brookies (solo fines de semana).
- **Caja regalo:**
  - Eliges las galletas, escribes la tarjeta y, si quieres, para cuándo la necesitas.
  - La web prepara el mensaje. El botón lo copia y abre el chat de Instagram de la tienda.
  - **No es una tienda online:** no hay pagos, carrito ni servidor.
- **Sabor de la semana:** la web no inventa cuál es; manda a Instagram, donde lo anuncia ella.
- **Historia y prensa:** texto basado en lo publicado en El Ideal Gallego y Quincemil, con enlaces a los artículos.
- **Visítanos:** sus dos tiendas (Estrecha de San Andrés y Marineda City), con horario, Google Maps, pedidos a domicilio (Just Eat y Glovo) y contacto. Los enlaces salen de su Linktree.
- **Interruptor «Resaltar datos por confirmar»:** marca en amarillo todo lo que hay que confirmar con la tienda. Es para la reunión con la dueña.

## Con qué está hecho

- React 19 + TypeScript estricto + Vite
- Vitest para los tests de la lógica (caja regalo, días de la semana, dibujo de las galletas)
- CSS a mano con variables, sin librerías de componentes ni de animación
- Fuentes alojadas en la propia web (Archivo variable e Instrument Serif, de Fontsource), sin llamadas a Google Fonts
- Galletas ilustradas en SVG generadas con código: misma semilla, mismo dibujo

## Cómo arrancarlo

Necesitas Node 20 o superior.

```bash
npm install
npm run dev
```

Se abre en `http://localhost:5173` (o el puerto que diga la terminal).

Otros comandos:

```bash
npm test          # tests de la lógica
npm run build     # compila en dist/
npm run preview   # sirve la versión compilada
npm run lint      # revisa el código con oxlint
```

## Dónde se cambia cada cosa

| Qué | Archivo |
|---|---|
| Tiendas, horario, teléfono, redes, enlaces de reparto, tamaños de caja | `src/data/negocio.ts` |
| Foto real de la galleta del inicio | `src/data/imagenes.ts` (con la foto en `public/fotos/`) |
| Sabores y colores de cada galleta | `src/data/sabores.ts` |
| Mensaje del encargo | `src/lib/caja.ts` |
| Colores, tipografía y espacios | `src/index.css` (variables en `:root`) |

## Publicación

`.github/workflows/deploy.yml` pasa los tests, compila y publica en GitHub Pages en cada push a `main`. Vite usa `base: './'` para que funcione en una subcarpeta. **No está publicada**: antes habría que hablar con la tienda.

## Más documentación

- [Dirección creativa](docs/direccion-creativa.md): el concepto y por qué cada decisión.
- [Pendiente de confirmar](docs/pendiente-de-confirmar.md): datos, textos e imágenes que hay que confirmar o sustituir.
- [Informe de pruebas](docs/informe-de-pruebas.md): qué se ha probado y qué no.
- [Funciones y próximos pasos](docs/funciones-y-proximos-pasos.md): qué funciona ya y qué necesita la tienda.

## Qué aprendí

- **Fuentes variables.** Archivo tiene un eje de anchura. Con `font-stretch` se puede ensanchar o estrechar la misma letra, y uso eso para contar la idea de la web («Nueva York» ancha, «Estrecha» estrecha).
- **SVG generado con código.** Un generador de números con semilla dibuja galletas irregulares que siempre salen iguales, y así se pueden testear.
- **Ser honesto con los datos.** Separé los datos del negocio en un archivo, cada uno con su origen (prensa, directorio o ejemplo). La web marca sola los que no están confirmados.
- **No fingir funciones.** En lugar de un carrito falso, la caja regalo prepara un mensaje real para la tienda.
