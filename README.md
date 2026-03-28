# ♔ Chess Analyzer — Análisis Didáctico de Partidas de Ajedrez

Aplicación web para estudiar partidas de ajedrez jugada a jugada, con explicaciones didácticas generadas por IA (Claude, ChatGPT o Gemini).

**[→ Abrir la aplicación](https://rkarillo-tech.github.io/chess-library/)**

---

## Qué hace

- **Tablero interactivo** con navegación jugada a jugada (botones y flechas del teclado)
- **Explicaciones didácticas** de cada movimiento: por qué se hizo, pros, contras y conceptos estratégicos
- **Reproducción automática** de la partida completa
- **Biblioteca persistente** que guarda las partidas analizadas en el navegador
- **Sincronización con GitHub** para compartir partidas entre dispositivos (PC y móvil)
- **Temas visuales** personalizables: 6 colores de tablero y 5 estilos de piezas
- **Diseño responsive**: optimizado para PC, móvil en vertical y móvil en horizontal (tablero + análisis lado a lado)
- **La Partida Inmortal** (Anderssen vs Kieseritzky, 1851) incluida como ejemplo

## Cómo funciona

El sistema tiene dos partes:

1. **La aplicación** (`index.html`): un único archivo HTML autocontenido que se abre en cualquier navegador. Incluye un motor de ajedrez completo que parsea PGN, un visor interactivo y la gestión de la biblioteca.

2. **El prompt de análisis** (`prompt-analisis-ajedrez.md`): una plantilla optimizada que se usa en Claude, ChatGPT o Gemini para generar el análisis didáctico de cualquier partida. El LLM devuelve un archivo JSON que la aplicación carga y muestra.

### Flujo para analizar una partida

```
1. Busca el PGN de la partida (chess.com, lichess, libros, etc.)
2. Abre prompt-analisis-ajedrez.md y copia el prompt
3. Pégalo en Claude / ChatGPT / Gemini
4. Sustituye [PEGAR PGN AQUÍ] por tu PGN
5. Descarga el archivo .json que genera el LLM
6. Cárgalo en la aplicación (arrastrando o desde GitHub)
```

## Estructura del repositorio

```
chess-library/
├── index.html                          ← La aplicación (abrir en navegador)
├── prompt-analisis-ajedrez.md          ← Prompt para generar análisis con IA
├── ejemplo-la-inmortal.json            ← JSON de ejemplo/referencia
├── README.md                           ← Este archivo
└── partidas/                           ← Carpeta para tus partidas analizadas
    └── anderssen-vs-kieseritzky-1851.json
```

## Formas de cargar partidas

### Opción 1: Subir a GitHub (sincronización entre dispositivos)

Sube los archivos `.json` a la carpeta `partidas/` del repositorio. La aplicación los detecta automáticamente al abrirse usando la API de GitHub (no necesita ningún archivo índice).

Desde cualquier dispositivo (PC o móvil), al abrir la URL de GitHub Pages, las partidas se cargan solas.

### Opción 2: Carga local (archivo por archivo)

Arrastra un archivo `.json` sobre la zona de carga en la pantalla de inicio, o haz clic para seleccionarlo. Se guarda automáticamente en la biblioteca del navegador (localStorage).

Las partidas cargadas localmente solo están disponibles en ese navegador/dispositivo.

## Formato del JSON de análisis

Cada partida analizada es un archivo JSON con esta estructura:

```json
{
  "info": {
    "title": "Nombre descriptivo de la partida",
    "white": "Jugador de blancas",
    "black": "Jugador de negras",
    "event": "Torneo o evento",
    "date": "Fecha",
    "result": "1-0",
    "description": "Breve descripción de por qué es interesante."
  },
  "pgn": "1. e4 e5 2. d4 exd4 ...",
  "analysis": [
    {
      "san": "e4",
      "title": "1. e4 — Título descriptivo",
      "explanation": "Explicación didáctica del movimiento...",
      "pros": "Ventajas de la jugada...",
      "cons": "Desventajas o riesgos..."
    }
  ]
}
```

El archivo `ejemplo-la-inmortal.json` sirve como referencia completa del formato.

## Controles del visor

| Control | Acción |
|---------|--------|
| ⏮ | Ir al inicio |
| ◀ | Jugada anterior |
| ▶ (play) | Reproducción automática |
| ▶ | Jugada siguiente |
| ⏭ | Ir al final |
| ⚙ | Abrir/cerrar ajustes visuales |
| ← → | Navegación con teclado (PC) |
| Inicio / Fin | Ir al principio/final (PC) |
| Tira de jugadas | Clic en cualquier jugada para saltar |

## Personalización visual

Pulsando ⚙ junto a los controles se despliega un panel con:

- **5 estilos de piezas**: Clásico, Dorado, Neón, Elegante y Hielo (variaciones de color y sombra sobre los caracteres Unicode)
- **6 temas de tablero**: Clásico, Azul, Verde, Madera, Gris y Morado

Las preferencias se guardan automáticamente en el navegador.

## Vista en móvil

- **Vertical (portrait)**: tablero arriba, controles, tira de jugadas horizontal con scroll, y panel de análisis debajo
- **Horizontal (landscape)**: tablero a la izquierda, panel de análisis a la derecha con scroll independiente. Material y resultado se ocultan para maximizar el espacio

## Requisitos

- Un navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet solo para la carga inicial (fuentes de Google Fonts y React desde CDN)
- Para sincronización GitHub: repositorio público con GitHub Pages activado

## Tecnología

- **HTML/CSS/JavaScript** en un único archivo autocontenido
- **React 18** cargado desde CDN (cdnjs.cloudflare.com)
- **Babel** para transformar JSX en el navegador
- **Motor de ajedrez propio** que parsea PGN, incluyendo enroques, capturas al paso y promociones
- **localStorage** para persistencia de biblioteca y preferencias
- **API de GitHub** para descubrimiento automático de partidas en la carpeta `partidas/`
- **GitHub Pages** para hosting gratuito

## Consejos para nombrar archivos

Usa un formato descriptivo para los JSON:

```
anderssen-vs-kieseritzky-1851.json
kasparov-vs-topalov-1999.json
morphy-vs-duke-1858.json
fischer-vs-spassky-1972-g6.json
```

El nombre puede ser cualquiera (la app lee el contenido, no el nombre), pero un formato consistente facilita la organización.

## Licencia

Proyecto personal de aprendizaje de ajedrez. Las piezas utilizan caracteres Unicode estándar.
