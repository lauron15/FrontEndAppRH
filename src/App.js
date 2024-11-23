import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './componentes/Login';
import Home from './componentes/Home';
import Navbar from './componentes/Navbar';
import Vagas from './componentes/Vagas';
import Candidatos from './componentes/Candidatos';
import { CandidatoForm } from './componentes/candidatosForm';
import { VagasForm } from './componentes/vagasForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {!localStorage.getItem("token") ?
            <>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
            : null}
          {localStorage.getItem("token") ?
            <>
              <Route path="/vagas" Component={Vagas} />
              <Route path="/home" element={<Home />} />
              <Route path="/candidatos" element={<Candidatos />} />
              <Route path="/cadastrarCandidato" element={<CandidatoForm />} />
              <Route path="/cadastrarVagas" element={<VagasForm />} />
            </>
            : null}



        </Routes>
      </Router>
    </div>
  );
}

export default App;