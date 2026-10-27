# Funciones y próximos pasos

## Funciona ya (sin servidor)

| Función | Cómo funciona |
|---|---|
| Carta de sabores | Lista con la galleta elegida en grande (en escritorio) y botón para añadirla a la caja |
| Qué hay hoy | Lee la fecha del navegador y marca el día. Entre semana: cheesecake y lemon pie. Fin de semana: también crookies y brookies |
| Caja regalo | Eliges galletas, tarjeta y fecha. Valida que la caja esté completa y que la tarjeta no pase de 140 caracteres. Prepara el mensaje |
| Copiar y abrir chat | Copia el mensaje y abre `ig.me/m/thevanessabakery`, el enlace oficial de Instagram para escribir a una cuenta |
| Cómo llegar | Abre Google Maps con la búsqueda de la dirección |
| Resaltar datos por confirmar | Marca en amarillo los datos de directorio y de ejemplo. Se recuerda en el navegador (`localStorage`) |
| Menú móvil | Se abre y se cierra con el botón o con Escape, bloquea el scroll de fondo y devuelve el foco al botón |

## Necesita algo de la tienda

| Función | Qué hace falta |
|---|---|
| Encargo por WhatsApp con el mensaje ya escrito (`wa.me/...?text=`) | Un número de WhatsApp confirmado |
| Precios de galletas y cajas | Que Vanessa los dé |
| Tamaños reales de caja y antelación para encargar | Que Vanessa los dé |
| Fotos reales en lugar de ilustraciones | Una sesión de fotos o fotos suyas autorizadas |
| Descripción de cada sabor | Que Vanessa la escriba |
| Horario de hoy y «abierto ahora» | Horario confirmado |
| Pedidos con pago online | Pasarela de pago (Stripe, Redsys...), backend y textos legales. No lo recomiendo para empezar: su volumen se gestiona bien por mensaje |
| Aparecer en Google («galletas Coruña») | Dominio propio, quitar `noindex` y ficha de Google Business Profile |

## Próximos pasos, por orden

1. **Enseñarle la demo** con el interruptor de «datos por confirmar» encendido, y apuntar sus correcciones.
2. **Fotos reales** de 8–10 galletas, la caja regalo y la fachada. Es lo que más cambia la web.
3. **Confirmar datos:** horario, teléfono, WhatsApp, tamaños y precios de las cajas.
4. **Textos con su voz:** historia y una línea por sabor.
5. **Dominio, textos legales** (aviso legal y privacidad) **y quitar el `noindex`**.
6. **Google Business Profile** enlazado a la web.
7. Si quiere: un apartado para encargos de tartas (la prensa dice que las hace por encargo para bodas y comuniones).

## Cómo se hizo (agentes y skills usados de verdad)

- **Skill `impeccable`** (diseño frontend): solo se cargaron sus principios. Su script de contexto y sus referencias no estaban instalados, así que no se ejecutaron.
- **Agente de QA y accesibilidad:** revisó el código y el navegador, y calculó contrastes con un script. Sus correcciones están aplicadas.
- **Agente de conversión y dirección creativa:** revisó textos, llamadas a la acción y concepto. De sus propuestas apliqué estas:
  - botón principal hacia la caja y dirección en el hero
  - quitar el sabor de la semana inventado y mandar a Instagram
  - chat directo de Instagram y campo de fecha
  - cita de prensa
  - galleta más ancha que la calle
- **Lo demás** (investigación, dirección creativa, código y pruebas) lo hice yo, sin más agentes.
