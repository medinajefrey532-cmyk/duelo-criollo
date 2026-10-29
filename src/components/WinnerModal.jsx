// Importación de la librería React
import React from 'react';
// Importación del componente de casilla para la muestra visual
import { Square } from './Square';

// Componente modal emergente para el anuncio del resultado final de la partida
export const WinnerModal = ({ winner, resetGame }) => {
  // Retorno nulo mientras la partida continúe activa
  if (winner === null) return null;

  // Validación de resultado de empate
  const isTie = winner === false;

  // Generación de textos descriptivos e insignia según el resultado obtenido
  const getMessage = () => {
    if (isTie) {
      return {
        title: '¡Empate!',
        subtitle: '¡Se trancó el juego! Buen duelo entre Quisqueyano y Tropical.',
        badge: 'EMPATE'
      };
    }
    if (winner === 'X') {
      return {
        title: '¡Ganó Quisqueyano!',
        subtitle: '¡Victoria contundente para Quisqueyano (X)! 🇩🇴',
        badge: 'VICTORIA'
      };
    }
    return {
      title: '¡Ganó Tropical!',
      subtitle: '¡Victoria contundente para Tropical (O)! 🌴',
      badge: 'VICTORIA'
    };
  };

  const message = getMessage();

  return (
    // Capa de superposición oscura sobre la pantalla
    <section className="winner-overlay">
      <div className="winner-card">
        {/* Insignia indicadora de estado */}
        <span className="winner-badge">{message.badge}</span>
        
        {/* Título del resultado final */}
        <h2 className="winner-title">{message.title}</h2>

        {/* Muestra del símbolo ganador o icono representativo de empate */}
        <header className="winner-symbol">
          {winner && <Square>{winner}</Square>}
          {isTie && <span className="tie-icon">🤝</span>}
        </header>

        {/* Mensaje descriptivo del cierre de la ronda */}
        <p className="winner-description">{message.subtitle}</p>

        {/* Botón de acción para iniciar una nueva partida */}
        <footer>
          <button className="btn-primary-dominican" onClick={resetGame}>
            🎮 Jugar Otra Partida
          </button>
        </footer>
      </div>
    </section>
  );
};
