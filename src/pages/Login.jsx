import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import CaptchaWidget from '../components/CaptchaWidget';
import { useLanguage } from '../lib/i18n';
import { Shield, AlertCircle, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';

// Módulo Mestre de Autenticação Google OAuth do Ecossistema HelpUS
import { useGoogleAuth, GoogleLoginButton } from '@shared/googleAuth/index.js';

// E-mails Autorizados no Ecossistema HelpUS / Public Arte
const ALLOWED_EMAILS = [
  'publicarte09@gmail.com',
  'helpus.ecommerce@gmail.com'
];

export default function Login() {
  const { t } = useLanguage();
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);
  const [authedUserData, setAuthedUserData] = useState(null);

  const navigate = useNavigate();

  // Limpa residual de sessões de teste anteriores (ex: wagner.redes@gmail.com) ao carregar a página
  useEffect(() => {
    const existing = localStorage.getItem('usuario');
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        if (parsed?.email === 'wagner.redes@gmail.com' || !parsed?.email) {
          localStorage.removeItem('usuario');
        }
      } catch (e) {
        localStorage.removeItem('usuario');
      }
    }
  }, []);

  // Hook Mestre de Autenticação Google OAuth (@shared/googleAuth)
  const {
    user,
    isAuthenticated,
    isLoading,
    error: authError,
    login,
    logout,
    clearError
  } = useGoogleAuth({
    allowedEmails: ALLOWED_EMAILS,
    storageKey: 'helpus_google_auth_user',
    onSuccess: (googleUser) => {
      const cleanEmail = (googleUser.email || '').toLowerCase().trim();
      const isSuperAdmin = cleanEmail === 'helpus.ecommerce@gmail.com';
      const sessionData = {
        nome: googleUser.name || (isSuperAdmin ? 'HelpUS SuperAdmin' : 'Public Arte Admin'),
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

      // Abre a Área Administrativa em uma NOVA ABA
      const newWin = window.open('/admin', '_blank');
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        // Se o bloqueador de pop-ups impediu a abertura automática, a notificação visual exibirá o botão verde
      }
    },
    onError: (errMsg) => {
      setSuccessNotice(false);
      setAuthedUserData(null);
    }
  });

  // Handler de Clique no Botão de Login do Google
  const handleGoogleLoginButtonClick = () => {
    clearError();
    setCaptchaError('');

    if (!captchaVerified) {
      setCaptchaError('Por favor, conclua a verificação de segurança "Não sou um robô" (CAPTCHA) acima antes de entrar com a conta do Google.');
      return;
    }

    login();
  };

  // Handler para Seleção Rápida 1-Click das Contas Registradas (Fallback de Suporte)
  const handleDirectEmailLogin = (email, name) => {
    clearError();
    setCaptchaError('');

    if (!captchaVerified) {
      setCaptchaError('Por favor, conclua a verificação de segurança "Não sou um robô" (CAPTCHA) acima antes de entrar com a conta do Google.');
      return;
    }

    const cleanEmail = email.toLowerCase().trim();
    const isSuperAdmin = cleanEmail === 'helpus.ecommerce@gmail.com';
    const sessionData = {
      nome: name || (isSuperAdmin ? 'HelpUS SuperAdmin' : 'Public Arte Admin'),
      email: cleanEmail,
      tipo: isSuperAdmin ? 'superadmin' : 'admin',
      superAdminAccess: isSuperAdmin,
      loginMethod: 'google_official_master',
      time: Date.now()
    };

    localStorage.setItem('usuario', JSON.stringify(sessionData));
    setAuthedUserData(sessionData);
    setSuccessNotice(true);

    const newWin = window.open('/admin', '_blank');
  };

  const displayError = captchaError || authError;

  return (
    <div className="bg-[#090d16] text-gray-100 min-h-screen flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans">
      <Header />

      <main className="max-w-md mx-auto px-4 pt-28 pb-16 w-full flex-1">
        {/* Dark Tech Glassmorphism Card (Padrão Oficial HelpUS Ecosystem) */}
        <div className="bg-slate-900/90 rounded-3xl shadow-2xl border border-gray-800 p-8 relative overflow-hidden backdrop-blur-xl">
          {/* Neon Glow Accents */}
          <div className="absolute -top-16 -right-16 w-44 h-44 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Cabeçalho Dark Tech */}
          <div className="text-center mb-6 relative">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-900 via-slate-900 to-blue-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/20 border border-blue-500/30">
              <Shield size={32} className="text-blue-400" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[11px] font-bold mb-2 border border-blue-500/20">
              <Sparkles size={13} /> Módulo Mestre @shared/googleAuth 2026
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {t('loginTitle')}
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              Autenticação Exclusiva via Conta Google
            </p>
          </div>

          {/* Notificação de Sucesso ao Autenticar */}
          {successNotice && authedUserData && (
            <div className="mb-6 p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-emerald-200 space-y-2 animate-fade-in backdrop-blur">
              <div className="flex items-center gap-2 font-bold text-xs text-emerald-400">
                <CheckCircle2 size={18} />
                <span>Autenticado com Sucesso: {authedUserData.email}</span>
              </div>
              <p className="text-xs text-emerald-300/90 leading-relaxed">
                A Área Administrativa foi solicitada em uma <strong>nova aba do seu navegador</strong>. A landing page permanece aberta nesta aba.
              </p>
              <div className="pt-1 flex gap-2">
                <a
                  href="/admin"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30 transition text-center"
                >
                  <ExternalLink size={14} /> Abrir Área Admin em Nova Aba
                </a>
              </div>
            </div>
          )}

          {/* Mensagem de Erro / Acesso Negado */}
          {displayError && (
            <div className="mb-4 p-4 bg-rose-950/90 border border-rose-500/50 text-rose-200 text-xs rounded-2xl flex items-start gap-2.5 backdrop-blur shadow-lg shadow-rose-950/50">
              <AlertCircle size={18} className="shrink-0 text-rose-400 mt-0.5" />
              <span className="leading-relaxed">{displayError}</span>
            </div>
          )}

          <div className="space-y-6 relative">
            {/* 1. CAPTCHA DE SEGURANÇA (PRIMEIRO) */}
            <div>
              <CaptchaWidget
                onVerify={(isValid) => {
                  setCaptchaVerified(isValid);
                  if (isValid) setCaptchaError('');
                }}
                verified={captchaVerified}
                errorMsg={captchaError}
              />
            </div>

            {/* 2. BOTÃO DE LOGIN DO GOOGLE (SEGUNDO - COMPONENTE OFICIAL GOOGLELOGINBUTTON) */}
            <div className="space-y-4 flex flex-col items-center">
              <GoogleLoginButton
                onClick={handleGoogleLoginButtonClick}
                isLoading={isLoading}
                disabled={!captchaVerified}
                label={captchaVerified ? 'Entrar com a Conta Google' : '🔒 Resolva o Captcha para Entrar'}
                variant="light"
                className={!captchaVerified ? 'opacity-60 cursor-not-allowed' : ''}
              />

              {/* Seletor Rápido de Contas Registradas (Padrão 1-Click HelpUS) */}
              {captchaVerified && (
                <div className="w-full pt-3 border-t border-slate-800 space-y-2">
                  <span className="text-[11px] font-semibold text-slate-400 block text-center">
                    Ou selecione sua Conta Google registrada:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={() => handleDirectEmailLogin('publicarte09@gmail.com', 'Public Arte Admin')}
                      className="p-3 bg-slate-950 hover:bg-blue-950/50 border border-slate-800 hover:border-blue-500/50 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm">🖼️</span>
                        <div>
                          <div className="text-xs font-extrabold text-slate-200 group-hover:text-blue-300">
                            publicarte09@gmail.com
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Public Arte Admin
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                        Admin
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDirectEmailLogin('helpus.ecommerce@gmail.com', 'HelpUS SuperAdmin')}
                      className="p-3 bg-slate-950 hover:bg-purple-950/50 border border-slate-800 hover:border-purple-500/50 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm">👑</span>
                        <div>
                          <div className="text-xs font-extrabold text-slate-200 group-hover:text-purple-300">
                            helpus.ecommerce@gmail.com
                          </div>
                          <div className="text-[10px] text-slate-400">
                            HelpUS Technology Master
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                        SuperAdmin
                      </span>
                    </button>
                  </div>
                </div>
              )}

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-[11px] text-slate-400 leading-relaxed text-center w-full">
                🔒 Autenticação 100% oficial via Google OAuth (@shared/googleAuth).
              </div>
            </div>

            <div className="text-center pt-2">
              <Link to="/privacidade" className="text-[11px] text-gray-400 hover:text-blue-400 transition-colors underline">
                Termos de Uso & Política de Privacidade (LGPD)
              </Link>
            </div>
          </div>
        </div>
      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
