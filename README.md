# Proyecto: Duelo Criollo (Tres en Raya en React)

### Datos del Estudiante
- **Nombre completo:** Jefrey Encarnacion Medina
- **Matrícula:** 100687695

---

### Breve descripción del juego
Es el clásico juego de Tres en Raya (Tic-Tac-Toe) desarrollado en React con Vite. El juego tiene una temática dominicana donde se enfrentan dos rivales: **Quisqueyano (X)** y **Tropical (O)**. Cuenta con un tablero de 3x3 interactivo, cambio automático de turnos, detección de victoria o empate, un marcador de puntos y almacenamiento en `localStorage` para que la partida y las puntuaciones no se borren al recargar la página.

---

### Qué aprendí
- A estructurar una aplicación dividiéndola en componentes reutilizables (`Square`, `ScoreBoard`, `WinnerModal`, `MatchHistory`).
- El uso del hook `useState` para controlar el estado reactivo del tablero, los turnos y las puntuaciones.
- La importancia del principio de inmutabilidad en React al actualizar arreglos usando el operador spread (`[...board]`).
- Cómo usar el hook `useEffect` para sincronizar y guardar automáticamente los datos en el `localStorage` del navegador.

---

### Qué parte fue más difícil
La parte más desafiante fue programar la lógica para evaluar las combinaciones ganadoras en tiempo real y coordinar el cambio de turnos sin que se sobreescribieran casillas ya jugadas ni se permitieran movimientos después de que la partida hubiese terminado.
