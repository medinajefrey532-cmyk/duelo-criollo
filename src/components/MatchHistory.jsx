// Importación de la librería React
import React from 'react';

// Componente para el despliegue del historial de partidas finalizadas
export const MatchHistory = ({ history, clearHistory }) => {
  // Retorno nulo en caso de no existir registros previos
  if (!history || history.length === 0) return null;

  return (
    <section className="history-container">
      {/* Encabezado de la sección con título y botón de vaciado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
        <h3 className="history-title" style={{ margin: 0 }}>📋 Historial de Partidas</h3>
        {/* Botón para vaciar los registros almacenados */}
        <button onClick={clearHistory} className="btn-reset-scores" style={{ width: 'auto', padding: '0.2rem 0.6rem' }}>
          Limpiar
        </button>
      </div>

      {/* Lista iterativa de resultados de partidas anteriores */}
      <ul className="history-list">
        {history.map((item, idx) => (
          <li key={idx} className="history-item">
            <span className="history-result">{item.result}</span>
            <span className="history-time">{item.time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
