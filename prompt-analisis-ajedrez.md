# Prompt para analizar partidas con IA (formato v2)

Este prompt genera el archivo `.json` que lee **Chess Analyzer**. La forma más cómoda de usarlo es desde la propia aplicación: **Pegar PGN → Preparar prompt para IA** lo rellena con tu partida y lo copia al portapapeles.

## Uso manual

1. Copia todo el bloque de abajo.
2. Sustituye `[PEGAR PGN AQUÍ]` por el PGN de tu partida.
3. Pégalo en Claude, ChatGPT o Gemini. Usa el modelo más potente disponible y, si puede ejecutar código, mejor: así verificará las jugadas con python-chess.
4. Descarga el `.json` que te devuelva y ábrelo en la aplicación o súbelo a la carpeta `partidas/` del repositorio.

La aplicación comprueba que cada jugada es legal y que cada comentario corresponde a su jugada, y te avisa si la IA se ha equivocado.

## Prompt

```text
Eres un entrenador de ajedrez de nivel Gran Maestro y un gran divulgador. Vas a anotar una partida para un jugador de club que la estudiará jugada a jugada en una aplicación. La aplicación comprueba cada jugada, dibuja tus flechas sobre el tablero y compara tus valoraciones con Stockfish, así que la precisión importa más que la retórica.

PARTIDA (PGN):
[PEGAR PGN AQUÍ]

## Cómo trabajar, en este orden
1. Reproduce la partida y comprueba que todas las jugadas son legales. Si puedes ejecutar código, usa python-chess para leer el PGN, obtener el SAN exacto de cada jugada y verificar variantes, flechas y casillas. Si dispones de un motor (Stockfish), úsalo para las valoraciones y para encontrar las mejores alternativas.
2. Identifica la apertura (nombre y código ECO), los planes de cada bando, los 4-8 momentos clave (sacrificios, errores, cambios de valoración) y entre 3 y 6 lecciones generales.
3. Anota cada media jugada.

## Qué escribir en cada jugada
- "explanation": de 2 a 5 frases con ideas concretas: qué amenaza, qué defiende, qué plan sigue, qué pieza o casilla es el objetivo. Cita jugadas («amenaza 12.Nxf7+») en lugar de generalidades («mejora la posición»). En jugadas forzadas u obvias basta una frase.
- "pros" y "cons": una línea cada uno. Si no hay contras, escribe «Ninguna significativa.».
- Sé honesto: si una jugada famosa no es la mejor según el análisis moderno, dilo y explica cuál era mejor. No inventes datos históricos.
- En los momentos clave añade una pregunta para que el alumno piense antes de leer, con su respuesta.
- Partidas largas (más de 60 jugadas): sé breve en las jugadas forzadas o evidentes para que todo quepa en un único archivo, pero no omitas ninguna entrada.
- Variantes ("lines"): solo cuando aporten algo (la mejor jugada que no se jugó, la refutación de un error, la amenaza que se evita). Cortas: de 2 a 8 medias jugadas, todas legales.

## Formato de salida
Devuelve un ARCHIVO .json descargable llamado blancas-vs-negras-año.json (por ejemplo kasparov-vs-topalov-1999.json). Si no puedes crear archivos, responde SOLO con el JSON: sin texto antes ni después y sin bloques de código.

Ejemplo de la estructura. Solo se muestran dos entradas de "analysis" (1.e4 y 2.f4) para ver todos los campos; tú incluirás TODAS las medias jugadas, también 1...e5:

{
  "format": "chess-analyzer/2",
  "info": {
    "title": "La Partida Inmortal",
    "white": "Adolf Anderssen",
    "black": "Lionel Kieseritzky",
    "whiteElo": "",
    "blackElo": "",
    "event": "Partida amistosa, Londres",
    "site": "Londres",
    "date": "21/06/1851",
    "result": "1-0",
    "opening": "Gambito de Rey, Gambito del Alfil",
    "eco": "C33",
    "description": "Dos o tres frases sobre por qué merece la pena estudiar esta partida."
  },
  "pgn": "1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ ...",
  "lessons": ["Primera lección general", "Segunda lección general", "Tercera lección general"],
  "analysis": [
    {
      "san": "e4",
      "title": "El peón de rey",
      "explanation": "Ocupa el centro y abre las diagonales del alfil de f1 y de la dama.",
      "pros": "Control central y desarrollo rápido.",
      "cons": "El peón de e4 puede ser atacado.",
      "phase": "apertura",
      "concepts": ["Centro"],
      "eval": 0.3
    },
    {
      "san": "f4",
      "title": "¡Gambito de Rey!",
      "explanation": "Ofrece el peón de f para desviar el de e5 y construir un centro con d4.",
      "pros": "Abre la columna f y prepara d4.",
      "cons": "Debilita la diagonal e1-h4.",
      "symbol": "!?",
      "eval": -0.6,
      "key": true,
      "phase": "apertura",
      "concepts": ["Gambito", "Columna abierta"],
      "arrows": ["Rf4e5", "Gd2d4"],
      "squares": ["Rf7"],
      "question": "¿Qué gana el blanco a cambio del peón?",
      "answer": "Tiempo, la columna f y la posibilidad de dominar el centro con d4.",
      "lines": [
        { "title": "Lo más habitual: 2.Nf3", "start": "before", "moves": "Nf3 Nc6 Bb5", "comment": "Desarrollo tranquilo sin entregar material." },
        { "title": "Si las negras rechazan el gambito: 2...Bc5", "start": "after", "moves": "Bc5 Nf3 d6", "comment": "El alfil vigila g1 y dificulta el enroque corto blanco." }
      ]
    }
  ]
}

## Significado de cada campo
- Obligatorios: "san", "title", "explanation", "pros", "cons".
- "san": la jugada en notación algebraica inglesa (K, Q, R, B, N), exactamente como en el PGN, sin número de jugada y sin símbolos ! o ?.
- "title": título corto, sin número de jugada ni la propia jugada.
- "symbol" (opcional): uno de !!, !, !?, ?!, ?, ??. Úsalos con criterio.
- "eval" (opcional): valoración tras la jugada en peones, desde el punto de vista de las blancas (0.3, -1.5). Mate: "#3" si dan mate las blancas en 3, "#-2" si lo dan las negras en 2.
- "key" (opcional): true solo en los 4-8 momentos clave.
- "phase" (opcional): "apertura", "medio juego" o "final".
- "concepts" (opcional): de 1 a 3 conceptos (Clavada, Desarrollo, Columna abierta, Sacrificio, Ataque doble, Peón pasado...).
- "arrows" (opcional): flechas con el formato color + casilla de origen + casilla de destino. Colores: G verde (idea o plan), R rojo (amenaza), B azul (alternativa), Y amarillo (atención). Ejemplo: "Rf3f7".
- "squares" (opcional): casillas destacadas con el mismo código de color: "Rf7".
- "question" y "answer" (opcionales): pregunta para el alumno y su respuesta.
- "lines" (opcional): variantes. "start": "before" si la variante sustituye a la jugada comentada (empieza en la posición anterior a ella) o "after" si continúa después de ella. "moves": jugadas en notación inglesa separadas por espacios, sin números.

## Reglas críticas
- "analysis" tiene EXACTAMENTE una entrada por cada media jugada y en orden: primero 1.e4, después 1...e5, después 2.Nf3...
- Las flechas salen de la casilla de una pieza que existe en la posición tras la jugada comentada, y las casillas deben ser correctas.
- Todo el texto en español. JSON válido: comillas dobles, sin comas finales, sin comentarios.
- Antes de responder, revisa que el número de entradas de "analysis" coincide con el número de medias jugadas del PGN.
```
