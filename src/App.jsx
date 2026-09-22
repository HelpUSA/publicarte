import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Orcamento from './pages/Orcamento';
import Admin from './pages/Admin';
import Login from './pages/Login';
import NewsletterAdmin from './pages/NewsletterAdmin';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/orcamento" element={<Orcamento />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/newsletter" element={<NewsletterAdmin />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
