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

  // Verifica se existe usuário autenticado como gestor/admin tercio
  if (!usuario || (usuario.email !== 'tercio@publicarte.com.br' && usuario.tipo !== 'admin')) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
