import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navegacion from './Navegacion';
import UploadComponent from './UploadComponent';
import VistaGeneral from './VistaGeneral';

const WocoContainer = () => {
  return (
    <>
      <Navegacion />
      <Routes>
        <Route path="upload" element={<UploadComponent />} />
        <Route path="upload-asc" element={<UploadComponent />} />
        <Route path="vista-general" element={<VistaGeneral />} />
      </Routes>
    </>
  );
};

export default WocoContainer; 