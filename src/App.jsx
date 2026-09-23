import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Orcamento from './pages/Orcamento';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Manual from './pages/Manual';
import NewsletterAdmin from './pages/NewsletterAdmin';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/orcamento" element={<Orcamento />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/manual" element={<Manual />} />
      <Route
        path="/admin/newsletter"
        element={
          <ProtectedRoute>
            <NewsletterAdmin />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
