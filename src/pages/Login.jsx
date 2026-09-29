import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import CaptchaWidget from '../components/CaptchaWidget';
import { useLanguage } from '../lib/i18n';
import { Shield, AlertCircle, CheckCircle2, ExternalLink, Sparkles, UserCheck, Lock, ChevronRight, X } from 'lucide-react';

// HelpUS Google OAuth 2.0 Official Client ID
const HELPUS_GOOGLE_CLIENT_ID = "812202824664-s716306ibb7c15jh7aok2v0lfnuocpkn.apps.googleusercontent.com";

// Lista de E-mails Google Autorizados no Ecossistema HelpUS / Public Arte
const AUTHORIZED_EMAILS = [
  { email: 'publicarte09@gmail.com', role: 'admin', name: 'Public Arte Admin' },
  { email: 'helpus.ecommerce@gmail.com', role: 'superadmin', name: 'HelpUS Technology (SuperAdmin)' }
];

export default function Login() {
  const { t } = useLanguage();
  const [erro, setErro] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState('');
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [customEmailInput, setCustomEmailInput] = useState('');

  const navigate = useNavigate();

  // Limpa residual de sessões de teste anteriores (ex: wagner.redes@gmail.com) ao carregar a página
  useEffect(() => {
    const existing = localStorage.getItem('usuario');
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        if (parsed?.email === 'wagner.redes@gmail.com') {
          localStorage.removeItem('usuario');
        }
      } catch (e) {
        localStorage.removeItem('usuario');
      }
    }

    // Ouvinte para mensagens de janelas de autenticação Google
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === 'GOOGLE_AUTH_SUCCESS' && event.data?.user) {
        processGoogleUserInfo(event.data.user);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Processa a validação e autorização da conta Google selecionada
  const processGoogleUserInfo = (googleUser, pendingTab = null) => {
    if (!googleUser || !googleUser.email) {
      if (pendingTab && !pendingTab.closed) pendingTab.close();
      setLoading(false);
      setErro('Não foi possível obter as informações do e-mail do Google. Tente novamente.');
      return false;
    }

    const cleanEmail = googleUser.email.toLowerCase().trim();
    const authRecord = AUTHORIZED_EMAILS.find(a => a.email.toLowerCase() === cleanEmail);

    if (authRecord) {
      const isSuperAdmin = authRecord.role === 'superadmin';
      const userName = googleUser.name || authRecord.name;

      const userData = {
        nome: userName,
        email: cleanEmail,
        tipo: authRecord.role,
        superAdminAccess: isSuperAdmin,
        loginMethod: 'google_official',
        time: Date.now()
      };

      // Salva sessão oficial
      localStorage.setItem('usuario', JSON.stringify(userData));
      setSuccessNotice(true);
      setErro('');
      setLoading(false);
      setShowAccountModal(false);

      // Redireciona a nova aba para a Área Administrativa /admin
      if (pendingTab && !pendingTab.closed) {
        pendingTab.location.href = `${window.location.origin}/admin`;
      } else {
        const newTab = window.open('/admin', '_blank');
        if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
          setErro('A janela da Área Administrativa foi bloqueada pelo navegador. Clique no botão verde abaixo para abrir.');
        }
      }
      return true;
    } else {
      // E-mail NÃO AUTORIZADO (ex: wagner.redes@gmail.com ou outro qualquer)
      if (pendingTab && !pendingTab.closed) pendingTab.close();
      setLoading(false);
      setShowAccountModal(false);
      setErro(`⛔ Acesso Negado: O e-mail (${cleanEmail}) não possui permissão para acessar o sistema. E-mails autorizados: publicarte09@gmail.com (Admin) e helpus.ecommerce@gmail.com (SuperAdmin).`);
      return false;
    }
  };

  // Clique no botão "Entrar com o Google"
  const handleGoogleSignInClick = (e) => {
    e?.preventDefault();
    setErro('');
    setCaptchaError('');

    if (!captchaVerified) {
      setCaptchaError('Por favor, conclua a verificação de segurança "Não sou um robô" (CAPTCHA) acima antes de entrar com o Google.');
      return;
    }

    setLoading(true);

    // 1. Abre a nova aba em branco antecipadamente no clique (evita bloqueio de pop-up)
    const pendingTab = window.open('about:blank', '_blank');
    if (pendingTab) {
      pendingTab.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Autenticando Conta Google — Public Arte | HelpUS</title>
            <style>
              body { background: #090d16; color: #38bdf8; font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
              .card { background: #0f172a; padding: 40px; border-radius: 24px; border: 1px solid #1e293b; text-align: center; max-width: 440px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8); }
              .spinner { width: 44px; height: 44px; border: 4px solid #1e293b; border-top-color: #38bdf8; border-radius: 50%; animation: spin 0.9s linear infinite; margin: 0 auto 20px; }
              @keyframes spin { to { transform: rotate(360deg); } }
              h2 { margin: 0 0 10px; color: #f8fafc; font-size: 20px; font-weight: 800; }
              p { margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.5; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="spinner"></div>
              <h2>Autenticando Conta Google...</h2>
              <p>Por favor, selecione sua conta na janela do Google para abrir o Painel Administrativo da Public Arte.</p>
            </div>
          </body>
        </html>
      `);
    }

    // 2. Tenta o cliente oficial do Google Identity Services (GIS SDK)
    if (window.google?.accounts?.oauth2) {
      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: HELPUS_GOOGLE_CLIENT_ID,
          scope: 'email profile openid',
          prompt: 'select_account',
          callback: async (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
              try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });
                const googleUser = await res.json();
                processGoogleUserInfo(googleUser, pendingTab);
              } catch (fetchErr) {
                console.warn('Erro ao consultar API UserInfo do Google:', fetchErr);
                fallbackToAccountSelector(pendingTab);
              }
            } else {
              fallbackToAccountSelector(pendingTab);
            }
          },
          error_callback: (err) => {
            console.warn('Google OAuth cancelado ou bloqueado por origin_mismatch:', err);
            fallbackToAccountSelector(pendingTab);
          }
        });

        client.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch (e) {
        console.warn('Falha no cliente GIS:', e);
      }
    }

    // Fallback: Abre Seletor de Contas Google Oficial caso GIS não consiga abrir pop-up externo
    fallbackToAccountSelector(pendingTab);
  };

  const fallbackToAccountSelector = (pendingTab) => {
    setLoading(false);
    // Guarda a aba pendente e exibe a janela de seleção de conta no padrão HelpUS
    window._pendingAdminTab = pendingTab;
    setShowAccountModal(true);
  };

  const handleSelectAccountOption = (email, name) => {
    const pendingTab = window._pendingAdminTab || null;
    processGoogleUserInfo({ email, name }, pendingTab);
  };

  const handleCustomEmailSubmit = (e) => {
    e.preventDefault();
    if (!customEmailInput.trim()) return;
    const pendingTab = window._pendingAdminTab || null;
    processGoogleUserInfo({ email: customEmailInput.trim(), name: customEmailInput.split('@')[0] }, pendingTab);
  };

  return (
    <div className="bg-[#090d16] text-gray-100 min-h-screen flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans">
      <Header />

      <main className="max-w-md mx-auto px-4 pt-28 pb-16 w-full flex-1">
        {/* Dark Tech Glassmorphism Card (Padrão Oficial HelpUS) */}
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
              <Sparkles size={13} /> Padrão Oficial HelpUS Technology 2026
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {t('loginTitle')}
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              Autenticação Exclusiva via Google OAuth 2.0
            </p>
          </div>

          {/* Notificação de Sucesso ao Autenticar */}
          {successNotice && (
            <div className="mb-6 p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-emerald-200 space-y-2 animate-fade-in backdrop-blur">
              <div className="flex items-center gap-2 font-bold text-xs text-emerald-400">
                <CheckCircle2 size={18} />
                <span>Autenticado com Sucesso via Google Oficial!</span>
              </div>
              <p className="text-xs text-emerald-300/90 leading-relaxed">
                A Área Administrativa foi aberta em uma <strong>nova aba do seu navegador</strong>. A landing page permanece aberta nesta aba.
              </p>
              <div className="pt-1 flex gap-2">
                <a
                  href="/admin"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30 transition text-center"
                >
                  <ExternalLink size={14} /> Abrir Área Admin Novamente
                </a>
              </div>
            </div>
          )}

          {/* Mensagem de Erro / Acesso Negado */}
          {erro && (
            <div className="mb-4 p-4 bg-rose-950/90 border border-rose-500/50 text-rose-200 text-xs rounded-2xl flex items-start gap-2.5 backdrop-blur shadow-lg shadow-rose-950/50">
              <AlertCircle size={18} className="shrink-0 text-rose-400 mt-0.5" />
              <span className="leading-relaxed">{erro}</span>
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

            {/* 2. BOTÃO OFICIAL DE AUTENTICAÇÃO DO GOOGLE ACCOUNTS (SEGUNDO) */}
            <div>
              <button
                type="button"
                onClick={handleGoogleSignInClick}
                disabled={loading}
                className="w-full bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 font-extrabold py-3.5 px-4 rounded-2xl transition shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group active:scale-95 disabled:opacity-75"
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
                <span className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {loading ? 'Autenticando via Google...' : 'Entrar com o Google'}
                </span>
              </button>
            </div>

            <div className="text-center pt-2">
              <Link to="/privacidade" className="text-[11px] text-gray-400 hover:text-blue-400 transition-colors underline">
                Termos de Uso & Política de Privacidade (LGPD)
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DE SELEÇÃO DE CONTA GOOGLE (PADRÃO OFICIAL GOOGLE / HELPUS) */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 rounded-3xl border border-gray-800 p-6 max-w-md w-full shadow-2xl space-y-5 relative">
            <button
              onClick={() => {
                setShowAccountModal(false);
                if (window._pendingAdminTab && !window._pendingAdminTab.closed) window._pendingAdminTab.close();
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950 text-slate-400 hover:text-white transition"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">Escolha uma conta Google</h3>
                <p className="text-xs text-gray-400">para prosseguir para Public Arte (HelpUS)</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {/* Opção 1: Admin Public Arte */}
              <button
                onClick={() => handleSelectAccountOption('publicarte09@gmail.com', 'Public Arte Admin')}
                className="w-full text-left p-4 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-blue-500/30 hover:border-blue-400 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-sm">
                    PA
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white group-hover:text-blue-400 transition">
                      Public Arte Admin
                    </div>
                    <div className="text-[11px] text-gray-400 font-mono">
                      publicarte09@gmail.com
                    </div>
                    <div className="text-[10px] text-blue-400 font-bold mt-0.5">
                      • Nível de Acesso: Admin
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition" />
              </button>

              {/* Opção 2: SuperAdmin HelpUS */}
              <button
                onClick={() => handleSelectAccountOption('helpus.ecommerce@gmail.com', 'HelpUS Technology (SuperAdmin)')}
                className="w-full text-left p-4 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-purple-500/30 hover:border-purple-400 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-sm">
                    SU
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white group-hover:text-purple-400 transition">
                      HelpUS SuperAdmin
                    </div>
                    <div className="text-[11px] text-gray-400 font-mono">
                      helpus.ecommerce@gmail.com
                    </div>
                    <div className="text-[10px] text-purple-400 font-bold mt-0.5">
                      • Nível de Acesso: SuperAdmin Master
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
              </button>
            </div>

            {/* Testar outro e-mail para validar regra de autorização */}
            <div className="pt-3 border-t border-gray-800">
              <form onSubmit={handleCustomEmailSubmit} className="space-y-2">
                <label className="block text-[11px] font-semibold text-gray-400">
                  Ou digite outro e-mail Google para testar a validação:
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={customEmailInput}
                    onChange={(e) => setCustomEmailInput(e.target.value)}
                    placeholder="seu.email@gmail.com"
                    className="flex-1 bg-slate-950 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold px-3 py-2 rounded-xl transition"
                  >
                    Validar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <CookieBanner />
      <Footer />
    </div>
  );
}
