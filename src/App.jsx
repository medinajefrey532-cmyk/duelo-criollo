// Importación de React y hooks de estado (useState) y efectos (useEffect)
import React, { useState, useEffect } from 'react';
// Importación de la librería canvas-confetti para animación de victoria
import confetti from 'canvas-confetti';
// Importación de componentes visuales de la interfaz
import { Square } from './components/Square';
import { WinnerModal } from './components/WinnerModal';
import { ScoreBoard } from './components/ScoreBoard';
import { MatchHistory } from './components/MatchHistory';
// Importación de constantes de juego y funciones de lógica del tablero
import { TURNS, PLAYERS, checkWinner, checkEndGame } from './logic/board';
// Importación de la hoja de estilos del juego
import './App.css';

export function App() {
  // Estado del tablero: arreglo de 9 posiciones con recuperación inicial desde localStorage
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board_quisqueya');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });

  // Estado del turno activo: 'X' o 'O', con recuperación inicial desde localStorage
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn_quisqueya');
    return turnFromStorage ?? TURNS.X;
  });

  // Estado del ganador: null (en curso), false (empate), 'X' o 'O' (jugador ganador)
  const [winner, setWinner] = useState(null);

  // Estado para el almacenamiento de los índices de la combinación ganadora
  const [winningCombo, setWinningCombo] = useState([]);

  // Estado del marcador: conteo de victorias y empates con persistencia en localStorage
  const [score, setScore] = useState(() => {
    const scoreFromStorage = window.localStorage.getItem('score_quisqueya');
    return scoreFromStorage ? JSON.parse(scoreFromStorage) : { x: 0, o: 0, ties: 0 };
  });

  // Estado para la lista del historial de partidas jugadas con persistencia en localStorage
  const [history, setHistory] = useState(() => {
    const historyFromStorage = window.localStorage.getItem('history_quisqueya');
    return historyFromStorage ? JSON.parse(historyFromStorage) : [];
  });

  // Efecto de sincronización del tablero y turno en localStorage ante cada cambio
  useEffect(() => {
    window.localStorage.setItem('board_quisqueya', JSON.stringify(board));
    window.localStorage.setItem('turn_quisqueya', turn);
  }, [board, turn]);

  // Efecto de sincronización del marcador en localStorage ante cada actualización
  useEffect(() => {
    window.localStorage.setItem('score_quisqueya', JSON.stringify(score));
  }, [score]);

  // Efecto de sincronización del historial en localStorage ante cada nueva partida
  useEffect(() => {
    window.localStorage.setItem('history_quisqueya', JSON.stringify(history));
  }, [history]);

  // Función de reinicio de la ronda actual y limpieza de la partida en curso
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    setWinningCombo([]);
    window.localStorage.removeItem('board_quisqueya');
    window.localStorage.removeItem('turn_quisqueya');
  };

  // Función de restablecimiento a cero de las puntuaciones acumuladas
  const resetScores = () => {
    const newScore = { x: 0, o: 0, ties: 0 };
    setScore(newScore);
    window.localStorage.removeItem('score_quisqueya');
  };

  // Función de vaciado completo del historial de partidas
  const clearHistory = () => {
    setHistory([]);
    window.localStorage.removeItem('history_quisqueya');
  };

  // Función controladora del clic sobre una casilla del tablero
  const updateBoard = (index) => {
    // Validación de casilla ocupada o partida terminada para evitar jugadas inválidas
    if (board[index] || winner) return;

    // Copia inmutable del arreglo del tablero previa a la actualización del estado
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Alternancia del turno hacia el siguiente jugador
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Evaluación de victoria tras el movimiento realizado
    const winnerResult = checkWinner(newBoard);

    if (winnerResult) {
      // Disparo de animación de confeti con la paleta de colores patrios
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#002F6C', '#FFFFFF', '#CE1126']
      });

      // Actualización de estados de ganador y combinación ganadora
      setWinner(winnerResult.winner);
      setWinningCombo(winnerResult.combo);

      // Incremento de puntuación del jugador ganador en el marcador
      const winnerKey = winnerResult.winner === TURNS.X ? 'x' : 'o';
      setScore(prev => ({ ...prev, [winnerKey]: prev[winnerKey] + 1 }));

      // Registro de la partida ganada en el historial con hora local
      const winnerName = winnerResult.winner === TURNS.X ? PLAYERS.X.name : PLAYERS.O.name;
      const newEntry = {
        result: 'Victoria: ' + winnerName + ' (' + winnerResult.winner + ')',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setHistory(prev => [newEntry, ...prev.slice(0, 9)]);

    } else if (checkEndGame(newBoard)) {
      // Declaración de empate ante tablero lleno sin ganador
      setWinner(false);
      setScore(prev => ({ ...prev, ties: prev.ties + 1 }));

      // Registro del empate en el historial con hora local
      const newEntry = {
        result: 'Empate',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setHistory(prev => [newEntry, ...prev.slice(0, 9)]);
    }
  };

  return (
    <main className="board-game">
      {/* Cabecera con título del juego y subtítulo de los rivales */}
      <header className="game-header">
        <h1 className="game-title">
          Duelo Criollo
        </h1>
        <p className="game-subtitle">
          <strong>Quisqueyano (X)</strong> vs <strong>Tropical (O)</strong>
        </p>
      </header>

      {/* Marcador de puntuaciones */}
      <ScoreBoard score={score} resetScores={resetScores} />

      {/* Indicadores visuales de turno activo */}
      <section className="turn-section">
        <span className="turn-label">Turno actual</span>
        <div className="turn-indicators">
          <div className={'turn-badge ' + (turn === TURNS.X ? 'active-turn-x' : '')}>
            <span>{PLAYERS.X.icon} {PLAYERS.X.name} (X)</span>
          </div>
          <div className={'turn-badge ' + (turn === TURNS.O ? 'active-turn-o' : '')}>
            <span>{PLAYERS.O.icon} {PLAYERS.O.name} (O)</span>
          </div>
        </div>
      </section>

      {/* Cuadrícula interactiva de 9 casillas del tablero */}
      <section className="game-board">
        {board.map((square, index) => (
          <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            isWinningSquare={winningCombo.includes(index)}
          >
            {square}
          </Square>
        ))}
      </section>

      {/* Botón de acción para el reinicio del tablero actual */}
      <div style={{ marginTop: '0.4rem', marginBottom: '0.4rem' }}>
        <button className="btn-primary-dominican" onClick={resetGame}>
          🔄 Reiniciar Tablero
        </button>
      </div>

      {/* Sección con el historial de partidas disputadas */}
      <MatchHistory history={history} clearHistory={clearHistory} />

      {/* Ventana modal de notificación de victoria o empate */}
      <WinnerModal resetGame={resetGame} winner={winner} />

      {/* Pie de página del proyecto */}
      <footer className="game-footer">
        <p>Desarrollado con sabor dominicano por <strong>Jefrey Encarnacion Medina</strong></p>
      </footer>
    </main>
  );
}

export default App;
