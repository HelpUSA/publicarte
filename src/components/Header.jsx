import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserIcon from './UserIcon';

export default function Header({
  logo = '/logo-publicarte.png',
  nomeEmpresa = 'Public Arte – Comunicação Visual'
}) {
  const [qtdItens, setQtdItens] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    const atualizarQtd = () => {
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      const total = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
      setQtdItens(total);
    };

    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    atualizarQtd();
    window.addEventListener('focus', atualizarQtd);
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('focus', atualizarQtd);
      window.removeEventListener('scroll', onScroll);
    };
  }, [location]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur shadow-md' : 'bg-white'
      } border-b border-gray-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
        >
          <img
            src={logo}
            alt={nomeEmpresa}
            className="h-10 w-auto"
          />
          <span className="hidden sm:block text-xl font-bold text-blue-800 tracking-tight">
            {nomeEmpresa}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Início', to: '/' },
            { label: 'Sobre', to: '/sobre' },
            { label: 'Contato', to: '/contato' },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="relative text-gray-700 font-medium hover:text-blue-800 transition duration-200 group"
            >
              {label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-800 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {usuario && (usuario.tipo === 'admin' || usuario.tipo === 'operacional') && (
            <div className="flex items-center gap-6 ml-4 border-l pl-6 border-gray-300">
              <Link to="/admin" className="text-sm text-gray-700 hover:text-blue-800">
                Admin
              </Link>
              <Link to="/admin/newsletter" className="text-sm text-gray-700 hover:text-blue-800">
                Newsletter
              </Link>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-5">
          <UserIcon />
        </div>
      </div>
    </header>
  );
}
