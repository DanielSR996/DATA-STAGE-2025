import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavegacionSignify from './NavegacionSignify';
import UploadComponentSignify from './UploadComponentSignify';
import VistaGeneralSignify from './VistaGeneralSignify';

const SignifyContainer = () => {
  return (
    <div>
      <NavegacionSignify />
      <Routes>
        <Route path="/upload" element={<UploadComponentSignify />} />
        <Route path="/vista-general" element={<VistaGeneralSignify />} />
      </Routes>
    </div>
  );
};

export default SignifyContainer; 