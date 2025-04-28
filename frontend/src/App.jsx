import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import UploadComponent from '../UploadComponent'
import VistaGeneral from '../VistaGeneral'
import ExcelImportComponent from './components/ExcelImportComponent'

import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/upload" element={<UploadComponent />} />
          <Route path="/tablas" element={<VistaGeneral />} />
          <Route path="/excel/import" element={<ExcelImportComponent />} />
          <Route path="/" element={<UploadComponent />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
