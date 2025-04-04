import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardEmpresas from './DashboardEmpresas';
import WocoContainer from './WocoContainer';
import SignifyContainer from './SignifyContainer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardEmpresas />} />
        <Route path="/woco/*" element={<WocoContainer />} />
        <Route path="/signify/*" element={<SignifyContainer />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App; 