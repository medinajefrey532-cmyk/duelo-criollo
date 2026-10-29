// Importación de la librería principal React
import React from 'react';
// Importación del método createRoot para el montaje en el DOM del navegador
import ReactDOM from 'react-dom/client';
// Importación del componente raíz de la aplicación
import { App } from './App.jsx';
// Importación de la hoja de estilos globales
import './index.css';

// Montaje y renderizado de la aplicación en el contenedor con id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
