// Importación de la librería React
import React from 'react';
// Importación de datos de configuración de los jugadores
import { PLAYERS } from '../logic/board';

// Componente para la visualización del marcador de puntos
export const ScoreBoard = ({ score, resetScores }) => {
  return (
    <div className="scoreboard-container">
      {/* Tarjeta de puntuación para Quisqueyano (X) */}
      <div className="score-card player-x">
        <span className="score-icon">{PLAYERS.X.icon}</span>
        <span className="score-name">{PLAYERS.X.name}</span>
        <span className="score-points">{score.x}</span>
      </div>

      {/* Tarjeta de conteo de empates */}
      <div className="score-card ties">
        <span className="score-icon">🤝</span>
        <span className="score-name">Empates</span>
        <span className="score-points">{score.ties}</span>
      </div>

      {/* Tarjeta de puntuación para Tropical (O) */}
      <div className="score-card player-o">
        <span className="score-icon">{PLAYERS.O.icon}</span>
        <span className="score-name">{PLAYERS.O.name}</span>
        <span className="score-points">{score.o}</span>
      </div>

      {/* Botón para el restablecimiento de los marcadores a cero */}
      <button className="btn-reset-scores" onClick={resetScores} title="Reiniciar Marcador">
        🔄 Reiniciar Marcador
      </button>
    </div>
  );
};
