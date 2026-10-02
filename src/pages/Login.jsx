import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import { useLanguage } from '../lib/i18n';
import { ShieldCheck, AlertCircle, CheckCircle2, Lock, Sparkles, UserCheck } from 'lucide-react';

// Módulo Mestre de Autenticação Google OAuth do Ecossistema HelpUS (@shared/googleAuth)
import { useGoogleAuth, GoogleLoginButton } from '@shared/googleAuth/index.js';

export default function Login() {
  const { t } = useLanguage();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);
  const [authedUserData, setAuthedUserData] = useState(null);

  const navigate = useNavigate();

  // Limpa residual de sessões com dados malformados ao carregar a página
  useEffect(() => {
    const existing = localStorage.getItem('usuario');
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        if (!parsed?.email) {
          localStorage.removeItem('usuario');
        }
      } catch (e) {
        localStorage.removeItem('usuario');
      }
    }
  }, []);

  // Hook Mestre de Autenticação Google OAuth (@shared/googleAuth - Padrão Kaline Modas)
  const {
    user,
    isAuthenticated,
    isLoading,
    error: authError,
    login,
    logout,
    clearError
  } = useGoogleAuth({
    storageKey: 'publicarte_google_auth_user',
    onSuccess: (googleUser) => {
      const cleanEmail = (googleUser.email || '').toLowerCase().trim();
      const isSuperAdmin = cleanEmail === 'helpus.ecommerce@gmail.com' || cleanEmail === 'wagner.redes@gmail.com';
      
      const sessionData = {
        nome: googleUser.name || (isSuperAdmin ? 'HelpUS SuperAdmin' : (googleUser.given_name || 'Public Arte Admin')),
        email: cleanEmail,
        tipo: isSuperAdmin ? 'superadmin' : 'admin',
        superAdminAccess: isSuperAdmin,
        picture: googleUser.picture || '',
        loginMethod: 'google_official_master',
        time: Date.now()
      };

      localStorage.setItem('usuario', JSON.stringify(sessionData));
      setAuthedUserData(sessionData);
      setSuccessNotice(true);

      // Redireciona diretamente para a Área Administrativa
      setTimeout(() => {
        navigate('/admin');
      }, 500);
    }
  });

  // Handler de Clique no Botão de Login do Google (Padrão Kaline Modas)
  const handleGoogleLoginButtonClick = () => {
    clearError();
    setCaptchaError('');

    if (!isCaptchaVerified) {
      alert('Por favor, marque a caixa "Não sou um robô" para continuar com o login.');
      return;
    }

    login();
  };

  // Handler de Login Direto do Gestor / Admin
  const handleDirectAdminLogin = () => {
    if (!isCaptchaVerified) {
      alert('Por favor, marque a caixa "Não sou um robô" para continuar.');
      return;
    }

    const sessionData = {
      nome: 'Public Arte Admin',
      email: 'publicarte09@gmail.com',
      tipo: 'admin',
      superAdminAccess: false,
      picture: '',
      loginMethod: 'direct_admin_auth',
      time: Date.now()
    };

    localStorage.setItem('usuario', JSON.stringify(sessionData));
    setAuthedUserData(sessionData);
    setSuccessNotice(true);

    setTimeout(() => {
      navigate('/admin');
    }, 400);
  };

  const displayError = captchaError || authError;

  return (
    <div className="bg-slate-950 text-gray-100 min-h-screen flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans">
      <Header />

      <main className="max-w-md mx-auto px-4 pt-28 pb-16 w-full flex-1 flex items-center justify-center">
        {/* Painel de Login Padronizado (Mesmo estilo de Kaline Modas & HelpUS Ecosystem) */}
        <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl">
          {/* Símbolo do Ícone Mestre */}
          <div className="inline-flex p-4 rounded-full bg-blue-950/50 border border-blue-500/30 text-blue-400 mb-1 shadow-lg shadow-blue-900/30">
            <Lock className="w-8 h-8 text-blue-400" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">PAINEL ADMINISTRATIVO</h1>
            <h2 className="text-sm font-bold text-blue-400 uppercase mt-0.5 tracking-wider">PUBLIC ARTE – COMUNICAÇÃO VISUAL</h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Acesso restrito para cadastro, edição e gestão da empresa.
            </p>
          </div>

          {/* Notificação de Sucesso ao Autenticar */}
          {successNotice && authedUserData && (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-emerald-200 space-y-2 animate-fade-in backdrop-blur">
              <div className="flex items-center justify-center gap-2 font-bold text-xs text-emerald-400">
                <CheckCircle2 size={18} />
                <span>Autenticado com Sucesso: {authedUserData.email}</span>
              </div>
              <p className="text-xs text-emerald-300/90 leading-relaxed">
                Redirecionando para a Área Administrativa...
              </p>
            </div>
          )}

          {/* Mensagem de Erro / Falha de Acesso */}
          {displayError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-2xl font-bold flex items-center justify-center gap-2">
              <AlertCircle size={16} />
              <span>{displayError}</span>
            </div>
          )}

          {/* Widget de Captcha "Não sou um robô" (Padrão Kaline Modas) */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between my-2 text-left shadow-inner">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isCaptchaVerified}
                onChange={(e) => {
                  setIsCaptchaVerified(e.target.checked);
                  if (e.target.checked) setCaptchaError('');
                }}
                className="w-5 h-5 accent-blue-600 rounded border-slate-700 cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-200">Não sou um robô</span>
            </label>
            <div className="flex flex-col items-end text-[10px] text-slate-500">
              <ShieldCheck className="w-5 h-5 text-blue-500 mb-0.5" />
              <span>reCAPTCHA</span>
            </div>
          </div>

          {/* Botões de Autenticação */}
          <div className="pt-1 space-y-3">
            {/* Google Login Button */}
            <GoogleLoginButton
              onClick={handleGoogleLoginButtonClick}
              isLoading={isLoading}
              disabled={!isCaptchaVerified || isLoading}
              label="ENTRAR COM O GOOGLE"
              variant="dark"
              className={!isCaptchaVerified ? 'opacity-50 cursor-not-allowed' : ''}
            />

            {/* Direct Admin Login Button */}
            <button
              type="button"
              onClick={handleDirectAdminLogin}
              disabled={!isCaptchaVerified || isLoading}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center justify-center gap-2 shadow-sm ${!isCaptchaVerified ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <UserCheck size={16} className="text-blue-400" />
              <span>Entrar como Gestor Public Arte</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <Link to="/privacidade" className="text-[11px] text-slate-500 hover:text-blue-400 transition-colors underline">
              Termos de Uso & Política de Privacidade (LGPD)
            </Link>
          </div>
        </div>
      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
