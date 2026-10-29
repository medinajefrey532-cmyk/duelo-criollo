// Matriz con las 8 combinaciones posibles para ganar (3 horizontales, 3 verticales y 2 diagonales)
export const WINNER_COMBOS = [
  [0, 1, 2], // Fila 1 superior
  [3, 4, 5], // Fila 2 central
  [6, 7, 8], // Fila 3 inferior
  [0, 3, 6], // Columna 1 izquierda
  [1, 4, 7], // Columna 2 central
  [2, 5, 8], // Columna 3 derecha
  [0, 4, 8], // Diagonal principal
  [2, 4, 6]  // Diagonal secundaria
];

// Función de evaluación del tablero para determinar la existencia de un ganador
export const checkWinner = (boardToCheck) => {
  // Recorrido de cada combinación ganadora
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    // Validación de casilla ocupada y coincidencia de símbolos en las 3 posiciones
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      // Retorno del símbolo ganador y del arreglo de casillas ganadoras
      return { winner: boardToCheck[a], combo };
    }
  }
  // Retorno nulo en caso de no existir ganador
  return null;
};

// Función de verificación de tablero lleno para la declaración de empate
export const checkEndGame = (boardToCheck) => {
  // Retorno de true únicamente cuando todas las casillas son distintas de null
  return boardToCheck.every((square) => square !== null);
};

// Definición de constantes para los símbolos de turno
export const TURNS = {
  X: 'X',
  O: 'O'
};

// Objeto de configuración con datos de presentación de cada jugador
export const PLAYERS = {
  X: { name: 'Quisqueyano', symbol: 'X', icon: '🇩🇴', color: '#002F6C' },
  O: { name: 'Tropical', symbol: 'O', icon: '🌴', color: '#CE1126' }
};
