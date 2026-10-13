# ♞ Chess Analyzer

Estudia partidas de ajedrez jugada a jugada: comentarios didácticos generados con IA, verificados con Stockfish dentro del navegador, y modos de entrenamiento activo.

**[→ Abrir la aplicación](https://rkarillo-tech.github.io/chess-library/)**

Es un único archivo `index.html`: funciona en PC y móvil, sin instalar nada, y se publica gratis con GitHub Pages.

## Qué incluye

- **Tres partidas clásicas comentadas**: la Partida de la Ópera (Morphy, 1858), la Inmortal (Anderssen, 1851) y la Partida del Siglo (Byrne–Fischer, 1956), con análisis de Stockfish 17.1.
- **Visor completo**: flechas y casillas sobre el tablero, barra de valoración, gráfica de la partida, lista de jugadas con símbolos (!!, ?, ★ momentos clave), material capturado y animaciones.
- **Comentario rico**: explicación, pros y contras, conceptos con glosario, preguntas para pensar y variantes que se reproducen en el tablero.
- **Entrenar (adivina la jugada)**: juegas con un bando e intentas encontrar la jugada del maestro; 3, 2 o 1 punto según el intento.
- **Explorar**: mueve piezas para probar tus ideas sin modificar la partida.
- **Motor Stockfish** en el navegador: análisis en vivo con dos líneas y «Analizar partida», que marca imprecisiones, errores y errores graves y calcula la precisión de cada jugador.
- **Validación automática**: comprueba que cada jugada es legal y que cada comentario corresponde a su jugada, y avisa cuando la IA se equivoca.
- **Importación flexible**: JSON de la IA (formatos antiguo y nuevo) y PGN, incluidos los PGN anotados de Lichess o ChessBase (comentarios, variantes, símbolos, `[%eval]`, `[%cal]`, `[%csl]`).
- **Biblioteca** con búsqueda, progreso guardado, «Continuar», copia de seguridad y sincronización con la carpeta `partidas/` del repositorio.
- **Comodidad**: notación con figuras, española o inglesa; 6 tableros y 6 estilos de piezas; tema claro u oscuro; narración en voz alta; atajos de teclado y gestos en el móvil.

## Estructura del repositorio

```
chess-library/
├── index.html                    ← la aplicación
├── README.md
├── prompt-analisis-ajedrez.md    ← prompt para generar análisis con IA
├── ejemplo-la-inmortal.json      ← ejemplo del formato JSON v2
└── partidas/                     ← tus partidas (.json o .pgn)
    └── kasparov-vs-topalov-1999.json
```

Al abrir la aplicación desde GitHub Pages, todo lo que haya en `partidas/` se carga solo. Si alojas la app en otro sitio, añade `partidas/index.json` con `{"games": ["archivo1.json", "archivo2.pgn"]}`.

## Añadir una partida analizada

1. En la app: **Pegar PGN → Preparar prompt para IA**. El prompt se copia con tu partida dentro.
2. Pégalo en Claude, ChatGPT o Gemini y descarga el `.json` que devuelva.
3. Ábrelo con **Abrir archivo** o súbelo a `partidas/`.

El formato está descrito en `prompt-analisis-ajedrez.md`. Los campos obligatorios por jugada son `san`, `title`, `explanation`, `pros` y `cons`; los opcionales (`symbol`, `eval`, `key`, `phase`, `concepts`, `arrows`, `squares`, `question`, `answer`, `lines`) enriquecen la lección.

## Atajos

`←` `→` jugadas · `↑` `↓` inicio y final · `Espacio` reproducir · `N` / `B` momento clave · `F` girar · `T` entrenar · `X` explorar · `E` motor · `R` mostrar comentario · `V` narrar · `S` ajustes · `?` ayuda · `Esc` salir

## Notas técnicas

- JavaScript sin dependencias ni compilación: motor de reglas propio (validado con perft y con 35.000 jugadas aleatorias contra python-chess).
- Stockfish 10 (WebAssembly, con alternativa en JavaScript) se descarga desde jsDelivr o unpkg solo al activar el motor. Stockfish es software libre con licencia GPL.
- Los datos (biblioteca, progreso, preferencias y análisis de motor) se guardan en el navegador de cada dispositivo. Usa «Copia de seguridad» para llevarlos a otro.
- Las piezas son caracteres Unicode con la fuente Noto Sans Symbols 2 de Google Fonts.
