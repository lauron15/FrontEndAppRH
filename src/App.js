// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './componentes/Login';
import Home from './componentes/Home';
import Navbar from './componentes/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      <Router>
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          {isAuthenticated ? (
            <Route path="/home" element={<Home />} />
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
