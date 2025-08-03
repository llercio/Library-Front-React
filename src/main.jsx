import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Usando o alias
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router> {/* Agora a aplicação é envolvida pelo componente <Router> */}
      <App />
    </Router>
  </React.StrictMode>
);