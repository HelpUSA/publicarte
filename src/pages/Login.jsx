import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import CaptchaWidget from '../components/CaptchaWidget';
import { useLanguage } from '../lib/i18n';
import { Lock, User, Shield, AlertCircle, CheckCircle2, Crown, ExternalLink, Chrome, Mail } from 'lucide-react';

export default function Login() {
  const { t } = useLanguage();
  const [usuarioInput, setUsuarioInput] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState('');
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  const navigate = useNavigate();

  // Função para abrir o Admin em Nova Aba
  const openAdminInNewTab = (userData) => {
    localStorage.setItem('usuario', JSON.stringify(userData));
    setSuccessNotice(true);
    setLoading(false);

    // Tenta abrir em nova aba
    const newWindow = window.open('/admin', '_blank');

    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // Caso o bloqueador de pop-ups do navegador impeça
      setErro('A janela da Área Administrativa foi bloqueada pelo navegador. Clique no botão "Abrir Área Admin" abaixo para acessar.');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErro('');
    setCaptchaError('');

    if (!captchaVerified) {
      setCaptchaError('Por favor, conclua a verificação do Captcha antes de continuar.');
      return;
    }

    setLoading(true);
    const userInputClean = usuarioInput.trim().toLowerCase();

    // 1. SuperAdmin (helpus.ecommerce@gmail.com)
    if (
      userInputClean === 'helpus.ecommerce@gmail.com' &&
      (password === 'admin1993' || password === 'super123' || password === 'admin')
    ) {
      openAdminInNewTab({
        nome: 'HelpUS SuperAdmin',
        email: 'helpus.ecommerce@gmail.com',
        tipo: 'superadmin',
        superAdminAccess: true,
        loginMethod: 'credentials'
      });
      return;
    }

    // 2. Administrador Public Arte (tercio ou publicarte09@gmail.com / gmai.com)
    if (
      (userInputClean === 'tercio' ||
        userInputClean === 'tercio@publicarte.com.br' ||
        userInputClean === 'publicarte09@gmail.com' ||
        userInputClean === 'publicarte09@gmai.com') &&
      password === 'admin1993'
    ) {
      openAdminInNewTab({
        nome: 'Tércio Grassi',
        email: 'publicarte09@gmail.com',
        tipo: 'admin',
        loginMethod: 'credentials'
      });
      return;
    }

    // 3. Funcionário / Vendedor
    if (
      (userInputClean === 'vendedor' || userInputClean === 'funcionario' || userInputClean === 'vendas') &&
      password === 'venda123'
    ) {
      openAdminInNewTab({
        nome: 'Atendente de Vendas',
        email: 'vendas@publicarte.com.br',
        tipo: 'vendedor',
        loginMethod: 'credentials'
      });
      return;
    }

    // Verificação em funcionários cadastrados localmente
    const funcLocais = JSON.parse(localStorage.getItem('publicarte_funcionarios') || '[]');
    const funcMatch = funcLocais.find(
      (f) => f.usuario?.toLowerCase() === userInputClean && password === 'venda123'
    );

    if (funcMatch) {
      openAdminInNewTab({
        nome: funcMatch.nome,
        email: `${userInputClean}@publicarte.com.br`,
        tipo: funcMatch.nivel === 'Admin' ? 'admin' : 'vendedor',
        loginMethod: 'credentials'
      });
      return;
    }

    setLoading(false);
    setErro('Usuário ou senha incorretos. Por favor, verifique suas credenciais.');
  };

  // Google OAuth Login Action
  const handleGoogleLoginSelect = (emailChosen) => {
    setErro('');
    const emailClean = emailChosen.trim().toLowerCase();

    // 1. SuperAdmin (helpus.ecommerce@gmail.com)
    if (emailClean === 'helpus.ecommerce@gmail.com') {
      openAdminInNewTab({
        nome: 'HelpUS Technology (SuperAdmin)',
        email: 'helpus.ecommerce@gmail.com',
        tipo: 'superadmin',
        superAdminAccess: true,
        loginMethod: 'google_oauth'
      });
      setShowGoogleModal(false);
      return;
    }

    // 2. Public Arte Admin (publicarte09@gmail.com ou gmai.com)
    if (
      emailClean === 'publicarte09@gmail.com' ||
      emailClean === 'publicarte09@gmai.com' ||
      emailClean.includes('publicarte')
    ) {
      openAdminInNewTab({
        nome: 'Public Arte Admin',
        email: 'publicarte09@gmail.com',
        tipo: 'admin',
        loginMethod: 'google_oauth'
      });
      setShowGoogleModal(false);
      return;
    }

    // Qualquer outro e-mail via Google
    openAdminInNewTab({
      nome: emailClean.split('@')[0],
      email: emailClean,
      tipo: 'admin',
      loginMethod: 'google_oauth'
    });
    setShowGoogleModal(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <Header />

      <main className="max-w-md mx-auto px-4 pt-28 pb-16 w-full flex-1">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-100 rounded-full blur-3xl opacity-70 pointer-events-none"></div>

          {/* Cabeçalho */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-900/30">
              <Shield size={28} />
            </div>
            <h1 className="text-2xl font-extrabold text-blue-950 tracking-tight">
              {t('loginTitle')}
            </h1>
            <p className="text-slate-500 text-xs mt-1">
              Public Arte – Painel de Gestão & Suporte
            </p>
          </div>

          {/* Notificação de Sucesso (Abertura em Nova Aba) */}
          {successNotice && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-bold text-xs">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <span>Autenticado com Sucesso!</span>
              </div>
              <p className="text-xs text-emerald-800">
                A Área Administrativa foi aberta em uma <strong>nova aba do seu navegador</strong>. A página principal continua aberta nesta aba.
              </p>
              <div className="pt-1 flex gap-2">
                <a
                  href="/admin"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow"
                >
                  <ExternalLink size={14} /> Abrir Área Admin Novamente
                </a>
              </div>
            </div>
          )}

          {erro && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{erro}</span>
            </div>
          )}

          {/* BOTÃO LOGIN COM GOOGLE */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => {
                if (!captchaVerified) {
                  setCaptchaError('Por favor, conclua o Captcha abaixo antes de fazer o login com Google.');
                  return;
                }
                setShowGoogleModal(true);
              }}
              className="w-full bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-300 font-bold py-3 px-4 rounded-2xl transition shadow-sm flex items-center justify-center gap-3 group"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="text-xs sm:text-sm group-hover:text-blue-900">Entrar com o Google</span>
            </button>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                <span className="bg-white px-3">ou credenciais de acesso</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {t('loginUserLabel')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={usuarioInput}
                  onChange={(e) => setUsuarioInput(e.target.value)}
                  placeholder="tercio ou publicarte09@gmail.com"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm bg-slate-50/50"
                />
                <User size={18} className="absolute left-3 top-3.5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {t('loginPassLabel')}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm bg-slate-50/50"
                />
                <Lock size={18} className="absolute left-3 top-3.5 text-slate-400" />
              </div>
            </div>

            {/* WIDGET DE CAPTCHA OBRIGATÓRIO */}
            <div className="pt-1">
              <CaptchaWidget
                onVerify={(isValid) => {
                  setCaptchaVerified(isValid);
                  if (isValid) setCaptchaError('');
                }}
                verified={captchaVerified}
                errorMsg={captchaError}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 hover:bg-blue-950 text-white font-extrabold py-3.5 rounded-xl transition shadow-xl hover:shadow-blue-900/20 text-sm mt-2 flex items-center justify-center gap-2"
            >
              {loading ? 'Entrando...' : t('loginBtn')}
            </button>

            <div className="text-center pt-2">
              <Link to="/privacidade" className="text-[11px] text-slate-400 hover:text-blue-700 underline">
                Termos de Uso & Política de Privacidade (LGPD)
              </Link>
            </div>
          </form>
        </div>
      </main>

      {/* MODAL SELETOR DE CONTA GOOGLE */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-slide-up space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm">
                <Chrome size={20} className="text-blue-600" />
                <span>Selecione a Conta do Google</span>
              </div>
              <button
                onClick={() => setShowGoogleModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Escolha uma das contas autorizadas abaixo ou digite seu e-mail do Google:
            </p>

            <div className="space-y-2.5">
              {/* Opção 1: publicarte09@gmail.com */}
              <button
                type="button"
                onClick={() => handleGoogleLoginSelect('publicarte09@gmail.com')}
                className="w-full p-3.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl transition text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-900 text-white rounded-xl flex items-center justify-center font-bold text-xs shadow">
                    PA
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 group-hover:text-blue-950">
                      Public Arte Admin
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">publicarte09@gmail.com</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  Admin
                </span>
              </button>

              {/* Opção 2: helpus.ecommerce@gmail.com (SuperAdmin) */}
              <button
                type="button"
                onClick={() => handleGoogleLoginSelect('helpus.ecommerce@gmail.com')}
                className="w-full p-3.5 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 hover:from-amber-500/20 border border-amber-300/60 rounded-2xl transition text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-tr from-amber-600 to-purple-800 text-white rounded-xl flex items-center justify-center font-bold text-xs shadow">
                    👑
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-1">
                      HelpUS Technology <Crown size={12} className="text-amber-600" />
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">helpus.ecommerce@gmail.com</div>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full border border-amber-300">
                  SuperAdmin
                </span>
              </button>
            </div>

            {/* Outro e-mail */}
            <div className="pt-2 border-t space-y-2">
              <label className="block text-[11px] font-bold text-slate-600 uppercase">
                Ou digite outro e-mail Google:
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="seuemail@gmail.com"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customGoogleEmail.trim()) {
                      handleGoogleLoginSelect(customGoogleEmail);
                    }
                  }}
                  className="px-3 py-2 bg-blue-900 text-white text-xs font-bold rounded-xl hover:bg-blue-950 transition"
                >
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CookieBanner />
      <Footer />
    </div>
  );
}
