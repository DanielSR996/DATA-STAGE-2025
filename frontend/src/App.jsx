import React from 'react'
import Navbar from './Navbar'
import UploadComponent from '../UploadComponent'
import './App.css'

function App() {
  return (
    <div className="App" style={{ minHeight: '100vh'}}>
      <Navbar />
      <UploadComponent />
    </div>
  )
}

export default App
