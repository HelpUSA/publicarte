import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cookie, X, Check, FileText } from 'lucide-react';

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(true); // default true to hide until check
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('publicarte_cookie_consent');
    if (!consent) {
      setAccepted(false);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('publicarte_cookie_consent', JSON.stringify({
      acceptedAt: new Date().toISOString(),
      essentials: true,
      analytics: true,
      marketing: true,
      status: 'accepted_all'
    }));
    setAccepted(true);
  };

  const handleAcceptEssentials = () => {
    localStorage.setItem('publicarte_cookie_consent', JSON.stringify({
      acceptedAt: new Date().toISOString(),
      essentials: true,
      analytics: false,
      marketing: false,
      status: 'accepted_essentials'
    }));
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-slate-900/95 text-white backdrop-blur-md border-t border-slate-700 shadow-2xl transition-all duration-300 animate-slide-up">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        <div className="flex items-start gap-3.5 max-w-3xl">
          <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-2xl border border-blue-500/30 shrink-0 mt-0.5">
            <Cookie size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm sm:text-base flex items-center gap-2 text-white">
              Privacidade & Controle de Cookies <ShieldCheck size={16} className="text-emerald-400" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Utilizamos cookies e tecnologias semelhantes para garantir o funcionamento correto da plataforma, autenticação segura da Área Administrativa e personalizar sua experiência de acordo com a nossa{' '}
              <Link to="/privacidade" className="text-blue-400 hover:text-blue-300 underline font-semibold">
                Política de Privacidade (LGPD)
              </Link>.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
          <button
            onClick={handleAcceptEssentials}
            className="px-4 py-2.5 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-600 transition flex items-center gap-1.5"
          >
            Apenas Essenciais
          </button>
          
          <button
            onClick={handleAcceptAll}
            className="px-5 py-2.5 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-1.5"
          >
            <Check size={16} /> Aceitar Todos
          </button>

          <Link
            to="/privacidade"
            className="p-2.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition border border-slate-700"
            title="Ver Política de Privacidade"
          >
            <FileText size={18} />
          </Link>
        </div>

      </div>
    </div>
  );
}
