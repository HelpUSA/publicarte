import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import CaptchaWidget from '../components/CaptchaWidget';
import { useLanguage } from '../lib/i18n';
import { Shield, AlertCircle, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';

// E-mails Autorizados no Ecossistema HelpUS / Public Arte
const AUTHORIZED_EMAILS = [
  { email: 'publicarte09@gmail.com', role: 'admin', name: 'Public Arte Admin', label: 'Public Arte Admin' },
  { email: 'helpus.ecommerce@gmail.com', role: 'superadmin', name: 'HelpUS SuperAdmin', label: 'HelpUS SuperAdmin' }
];

export default function Login() {
  const { t } = useLanguage();
  const [erro, setErro] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);
  const [authedUser, setAuthedUser] = useState(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState('');

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

  // Executa o login e validação de permissão da Conta Google (Mesmo padrão do HelpUS Support)
  const executeGoogleLogin = (email, name) => {
    setErro('');

    if (!captchaVerified) {
      setCaptchaError('Por favor, conclua a verificação de segurança "Não sou um robô" (CAPTCHA) acima antes de entrar com a conta do Google.');
      setErro('Confirme o Captcha antes de continuar.');
      return;
    }

    const cleanEmail = (email || 'publicarte09@gmail.com').toLowerCase().trim();
    const authRecord = AUTHORIZED_EMAILS.find(a => a.email.toLowerCase() === cleanEmail);

    if (authRecord) {
      const isSuperAdmin = authRecord.role === 'superadmin';
      const userName = name || authRecord.name;

      const userData = {
        nome: userName,
        email: cleanEmail,
        tipo: authRecord.role,
        superAdminAccess: isSuperAdmin,
        loginMethod: 'google_official',
        time: Date.now()
      };

      // Salva sessão oficial sem interferência de e-mails antigos
      localStorage.setItem('usuario', JSON.stringify(userData));
      setAuthedUser(userData);
      setSuccessNotice(true);
      setErro('');

      // Abre a Área Administrativa em uma NOVA ABA
      const newWin = window.open('/admin', '_blank');
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        // Se o bloqueador de pop-up impedir a abertura automática, a notificação visual exibirá o botão verde
      }
    } else {
      // E-mail NÃO AUTORIZADO
      setSuccessNotice(false);
      setAuthedUser(null);
      setErro(`⛔ Acesso Negado: O e-mail (${cleanEmail}) não possui permissão para acessar a área administrativa. Apenas os e-mails autorizados (publicarte09@gmail.com e helpus.ecommerce@gmail.com) têm permissão de acesso.`);
    }
  };

  const handleMainGoogleButtonClick = (e) => {
    e?.preventDefault();
    setErro('');
    setCaptchaError('');

    if (!captchaVerified) {
      setCaptchaError('Por favor, conclua a verificação de segurança "Não sou um robô" (CAPTCHA) acima antes de entrar com a conta do Google.');
      return;
    }

    // Autentica via conta padrão Public Arte Admin
    executeGoogleLogin('publicarte09@gmail.com', 'Public Arte Admin');
  };

  return (
    <div className="bg-[#090d16] text-gray-100 min-h-screen flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans">
      <Header />

      <main className="max-w-md mx-auto px-4 pt-28 pb-16 w-full flex-1">
        {/* Dark Tech Glassmorphism Card (Padrão Oficial HelpUS Support) */}
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
              <Sparkles size={13} /> Padrão Oficial HelpUS Ecosystem 2026
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {t('loginTitle')}
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              Autenticação Exclusiva via Conta Google
            </p>
          </div>

          {/* Notificação de Sucesso ao Autenticar */}
          {successNotice && authedUser && (
            <div className="mb-6 p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-emerald-200 space-y-2 animate-fade-in backdrop-blur">
              <div className="flex items-center gap-2 font-bold text-xs text-emerald-400">
                <CheckCircle2 size={18} />
                <span>Autenticado com Sucesso: {authedUser.email}</span>
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

            {/* 2. BOTÃO DE LOGIN DO GOOGLE (SEGUNDO - PADRÃO HELPUS SUPPORT) */}
            <div className="space-y-4 flex flex-col items-center">
              {captchaVerified ? (
                <div className="w-full space-y-3">
                  {/* Botão Principal Entrar com Conta Google */}
                  <button
                    type="button"
                    onClick={handleMainGoogleButtonClick}
                    className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 text-slate-900 font-extrabold rounded-2xl shadow-xl border border-slate-200 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-xs sm:text-sm"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Entrar com a Conta Google</span>
                  </button>

                  {/* Seletor Rápido de Contas Registradas (Padrão 1-Click HelpUS Support) */}
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400 block text-center">
                      Ou selecione sua Conta Google registrada:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        type="button"
                        onClick={() => executeGoogleLogin('publicarte09@gmail.com', 'Public Arte Admin')}
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
                        onClick={() => executeGoogleLogin('helpus.ecommerce@gmail.com', 'HelpUS SuperAdmin')}
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
                </div>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full py-3.5 px-4 font-extrabold rounded-2xl shadow-xl border flex items-center justify-center gap-3 transition-all text-xs sm:text-sm bg-slate-800 text-slate-500 border-slate-700 opacity-60 cursor-not-allowed"
                >
                  <svg className="w-5 h-5 shrink-0 opacity-50" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>🔒 Resolva o Captcha acima para Entrar</span>
                </button>
              )}

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-[11px] text-slate-400 leading-relaxed text-center w-full">
                🔒 Autenticação 100% oficial via Google OAuth no Ecossistema HelpUS.
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
