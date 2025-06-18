import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { DocumentProvider } from './contexts/DocumentContext';
import { AuditProvider } from './contexts/AuditContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DocumentProvider>
          <AuditProvider>
            <Routes>
              {/* Rutas públicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Rutas protegidas */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Layout />
                  </PrivateRoute>
                }
              >
                <Route index element={<Home />} />
                <Route
                  path="documentos"
                  element={
                    <PrivateRoute requiredRole="user">
                      <div className="p-6">Página de Documentos</div>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="categorias"
                  element={
                    <PrivateRoute requiredRole="admin">
                      <div className="p-6">Página de Categorías</div>
                    </PrivateRoute>
                  }
                />
              </Route>

              {/* Ruta para acceso no autorizado */}
              <Route
                path="/unauthorized"
                element={
                  <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Acceso No Autorizado
                      </h2>
                      <p className="mt-2 text-center text-sm text-gray-600">
                        No tienes permisos para acceder a esta página.
                      </p>
                    </div>
                  </div>
                }
              />
            </Routes>
          </AuditProvider>
        </DocumentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App; 