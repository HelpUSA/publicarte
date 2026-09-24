import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../lib/i18n';
import { Lock, User, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const { t } = useLanguage();
  const [usuarioInput, setUsuarioInput] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    const userInputClean = usuarioInput.trim().toLowerCase();

    // 1. Acesso Administrador (Tércio Grassi)
    if (
      (userInputClean === 'tercio' || userInputClean === 'tercio@publicarte.com.br') &&
      password === 'admin1993'
    ) {
      localStorage.setItem(
        'usuario',
        JSON.stringify({
          nome: 'Tércio Grassi',
          email: 'tercio@publicarte.com.br',
          tipo: 'admin'
        })
      );
      setLoading(false);
      navigate('/admin');
      return;
    }

    // 2. Acesso Funcionário / Vendedor (Restrito para Vendas e Orçamentos)
    if (
      (userInputClean === 'vendedor' || userInputClean === 'funcionario' || userInputClean === 'vendas') &&
      password === 'venda123'
    ) {
      localStorage.setItem(
        'usuario',
        JSON.stringify({
          nome: 'Atendente de Vendas',
          email: 'vendas@publicarte.com.br',
          tipo: 'vendedor'
        })
      );
      setLoading(false);
      navigate('/admin');
      return;
    }

    // Verificação em funcionários cadastrados
    const funcLocais = JSON.parse(localStorage.getItem('publicarte_funcionarios') || '[]');
    const funcMatch = funcLocais.find(
      (f) => f.usuario?.toLowerCase() === userInputClean && password === 'venda123'
    );

    if (funcMatch) {
      localStorage.setItem(
        'usuario',
        JSON.stringify({
          nome: funcMatch.nome,
          email: `${userInputClean}@publicarte.com.br`,
          tipo: funcMatch.nivel === 'Admin' ? 'admin' : 'vendedor'
        })
      );
      setLoading(false);
      navigate('/admin');
      return;
    }

    setLoading(false);
    setErro("Acesso negado. Admin: 'tercio' / 'admin1993' | Vendedor: 'vendedor' / 'venda123'");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Header />

      <main className="max-w-md mx-auto px-4 pt-28 pb-16 w-full">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-60 pointer-events-none"></div>

          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-900/30">
              <Shield size={28} />
            </div>
            <h1 className="text-2xl font-extrabold text-blue-900 tracking-tight">{t('loginTitle')}</h1>
            <p className="text-gray-500 text-xs mt-1">
              {t('loginSubtitle')}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 mb-5 text-xs text-blue-900 flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-blue-700 shrink-0" />
            <div className="space-y-0.5">
              <div><strong>Admin (Tércio):</strong> <code className="bg-white px-1 rounded font-mono font-bold">tercio</code> | <code className="bg-white px-1 rounded font-mono font-bold">admin1993</code></div>
              <div><strong>Funcionários (Vendas):</strong> <code className="bg-white px-1 rounded font-mono font-bold">vendedor</code> | <code className="bg-white px-1 rounded font-mono font-bold">venda123</code></div>
            </div>
          </div>

          {erro && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{erro}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {t('loginUserLabel')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={usuarioInput}
                  onChange={(e) => setUsuarioInput(e.target.value)}
                  placeholder="tercio"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm bg-gray-50/50"
                />
                <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {t('loginPassLabel')}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm bg-gray-50/50"
                />
                <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 hover:bg-blue-950 text-white font-extrabold py-3.5 rounded-xl transition shadow-xl hover:shadow-blue-900/20 text-sm mt-2 flex items-center justify-center gap-2"
            >
              {loading ? '...' : t('loginBtn')}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
