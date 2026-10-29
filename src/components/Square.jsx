// Importación de la librería React
import React from 'react';

// Componente funcional que representa cada casilla individual del tablero de 3x3
export const Square = ({ children, isSelected, updateBoard, index, isWinningSquare }) => {
  // Construcción de la clase CSS dinámica según estado activo o casilla ganadora
  const className = 'square ' + (isSelected ? 'is-selected ' : '') + (isWinningSquare ? 'is-winning' : '');

  // Manejador del evento de clic sobre la casilla
  const handleClick = () => {
    // Ejecución de la función controladora recibida por props enviando el índice correspondiente
    if (updateBoard) {
      updateBoard(index);
    }
  };

  return (
    // Renderizado del elemento casilla con su evento onClick y contenido visual (X u O)
    <div onClick={handleClick} className={className.trim()}>
      {children}
    </div>
  );
};
