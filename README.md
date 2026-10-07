# graphify-slop

Base de conocimiento topológica para bases de código mediante grafos y AST, sin dependencia de bases de datos vectoriales.

---

## Contexto y Fundamentos

### Naturaleza Estocástica de los LLMs

Los modelos de lenguaje (LLMs) son sistemas estocásticos entrenados mediante descenso de gradiente para predecir la palabra o token estadísticamente más probable, en lugar de evaluar la verdad lógica.

Una analogía directa es el teclado del móvil: funcionan en principio como el texto predictivo o autocompletador de un teléfono (sugieren la palabra más probable a continuación según el historial previo), pero operando a una escala masiva de parámetros.

Al optimizar patrones estadísticos en lugar de hechos comprobables, los modelos generan alucinaciones: respuestas convincentes y fluidas pero ficticias o técnicamente incorrectas.

### ¿Por qué nace RAG (Retrieval-Augmented Generation)?

RAG fue diseñado para mitigar las alucinaciones inyectando contexto verificado a la consulta del usuario antes de que el modelo genere una respuesta.

#### ¿Cómo funciona el Retrieval (Recuperación)?

1. **Consulta**: El usuario realiza una pregunta o petición.
2. **Búsqueda**: El sistema busca en archivos o fuentes de datos los fragmentos relevantes para esa consulta.
3. **Inyección**: Inserta los fragmentos encontrados directamente en el prompt ("responde basándote exclusivamente en este texto").
4. **Generación**: El LLM redacta la respuesta final sustentada en los datos provistos en lugar de adivinar de memoria.

### RAG Vectorial y Embeddings

- **Embeddings**: Traducción de texto a vectores numéricos en un espacio geométrico donde ideas con significado similar quedan ubicadas cerca entre sí.
- **Limitación en código**: Fragmenta archivos en bloques arbitrarios (cortando clases o funciones) y busca por afinidad de vocabulario en lugar de seguir dependencias de llamada, herencia o ejecución.

### Enfoque Graphify y AST

- **¿Qué es un AST (Abstract Syntax Tree)?**: Representación en árbol de la estructura sintáctica de un programa, generada por el analizador gramatical (parser).
- **Algorítmico, no AI**: Utiliza algoritmos deterministas de ciencias de la computación, sin inteligencia artificial, sin redes neuronales y sin consumo de tokens.
- **Mapeo topológico exacto**: Extrae con certeza matemática quién define una función, qué módulo importa a cuál y dónde se ejecuta cada componente, relacionando dependencias aunque su vocabulario textual sea completamente dispar.

### Diferencias Clave

| Aspecto | RAG Vectorial | Graphify |
| :--- | :--- | :--- |
| **Indexación** | Vectores / Embeddings | AST determinista |
| **Almacenamiento** | Base de datos vectorial | Grafo topológico (`graph.json`) |
| **Unidad mínima** | Chunks de texto arbitrarios | Entidades sintácticas completas |
| **Relaciones** | Similitud geométrica aproximada | Causa, llamada, herencia, importación |
| **Auditoría** | Opaca | Trazabilidad explícita (extraído vs inferido) |

### Artefactos Generados

Al indexar se crean tres salidas principales en `graphify-out/`:
- `graph.html`: Visualización interactiva en navegador (comunidades y nodos clave).
- `graph.json`: Estructura del grafo serializada para consumo en GraphRAG y agentes.
- `GRAPH_REPORT.md`: Auditoría en lenguaje natural con God Nodes, cohesión y comunidades detectadas.

---

## Instalación de Herramientas

### 1. Prerrequisitos

- Python 3.10+ ([python.org](https://www.python.org/downloads/))
```bash
python3 --version
```

- Gestor `uv` ([docs.astral.sh/uv](https://docs.astral.sh/uv/)):
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 2. Instalar Graphify CLI

El paquete oficial en PyPI utiliza el nombre `graphifyy` ([repositorio](https://github.com/Graphify-Labs/graphify)):

```bash
uv tool install graphifyy
```

### 3. Integración con Agentes

Registra las skills de Graphify en el entorno del asistente de IA:

```bash
graphify install
```

---

## Proyecto Demo (Node.js)

Estructura modular de prueba disponible en `js-demo/`.

### 1. Inicialización y Estructura

```bash
mkdir -p js-demo/src
cd js-demo
npm init -y
```

Añadir `"type": "commonjs"` y `"main": "src/index.js"` en `js-demo/package.json`.

### 2. Archivos Fuente

- **`js-demo/src/math.js`**: Operaciones base.
```javascript
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

- **`js-demo/src/formatter.js`**: Formato de salida.
```javascript
function formatMsg(name, score) {
  return `${name} scored ${score} points.`;
}

module.exports = { formatMsg };
```

- **`js-demo/src/user.js`**: Lógica de dominio conectada a `math.js`.
```javascript
const { add } = require('./math');

function createUser(name, baseScore, bonus) {
  const score = add(baseScore, bonus);
  return {
    name,
    score
  };
}

module.exports = { createUser };
```

- **`js-demo/src/index.js`**: Punto de entrada orquestador.
```javascript
const { createUser } = require('./user');
const { formatMsg } = require('./formatter');

console.log('--- Processing Alice ---');
const userAlice = createUser('Alice', 100, 20);
console.log('Alice created:', userAlice);
const messageAlice = formatMsg(userAlice.name, userAlice.score);
console.log('Message for Alice:', messageAlice);

console.log('\n--- Processing Bob ---');
const userBob = createUser('Bob', 80, 15);
console.log('Bob created:', userBob);
const messageBob = formatMsg(userBob.name, userBob.score);
console.log('Message for Bob:', messageBob);

console.log('\n--- Finished ---');
```

### 3. Ejecutar Demo

```bash
node .
```

---

## Generación y Consulta del Grafo

### 1. Construir Grafo

Ejecutar sobre el directorio del proyecto para análisis AST:

```bash
# Desde la raíz del repositorio hacia js-demo
graphify js-demo

# O directamente dentro del directorio objetivo
cd js-demo && graphify .
```

### 2. Comandos de Consulta

- **Preguntas sobre la base de código (BFS)**:
```bash
graphify query "How does user creation calculate scores?"
```

- **Explicar un nodo o símbolo específico**:
```bash
graphify explain "createUser"
```

- **Ruta de dependencia más corta entre dos entidades**:
```bash
graphify path "index.js" "math.js"
```

- **Actualización incremental** (re-escaneo AST sin consumo LLM):
```bash
graphify update .
```
