import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const usuarioRaw = localStorage.getItem('usuario');
  let usuario = null;

  try {
    usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;
  } catch (e) {
    usuario = null;
  }

  // Verifica se existe usuário autenticado
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
