import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { Lock, User, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const [usuarioInput, setUsuarioInput] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    const userInputClean = usuarioInput.trim().toLowerCase();

    // Login especial para o proprietário Tércio e equipe
    if (
      (userInputClean === 'tercio' || userInputClean === 'tercio@publicarte.com.br' || userInputClean === 'admin') &&
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

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: usuarioInput.includes('@') ? usuarioInput : `${usuarioInput}@publicarte.com.br`,
        password,
      });

      if (error) {
        setErro('Credenciais incorretas. Utilize usuário "tercio" e senha "admin1993".');
      } else {
        localStorage.setItem(
          'usuario',
          JSON.stringify({ email: data.user.email, tipo: 'admin', nome: 'Tércio' })
        );
        navigate('/admin');
      }
    } catch (err) {
      setErro('Erro de conexão. Utilize as credenciais padrão de acesso.');
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-2xl font-extrabold text-blue-900 tracking-tight">Área Administrativa</h1>
            <p className="text-gray-500 text-xs mt-1">
              Public Arte – Comunicação Visual · Painel do Gestor
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 mb-5 text-xs text-blue-900 flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-blue-700 shrink-0" />
            <div>
              <strong>Acesso do Proprietário:</strong><br />
              Usuário: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold">tercio</code> | Senha: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold">admin1993</code>
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
                Usuário / E-mail
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
                Senha de Acesso
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
              {loading ? 'Acessando Sistema...' : 'Entrar na Área Administrativa'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
