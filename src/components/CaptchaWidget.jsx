import React, { useState, useEffect } from 'react';
import { ShieldCheck, RotateCw, CheckCircle2, AlertCircle, Lock } from 'lucide-react';

export default function CaptchaWidget({ onVerify, verified, errorMsg }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [internalVerified, setInternalVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState('');
  const [showChallenge, setShowChallenge] = useState(false);

  const generateChallenge = () => {
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer('');
    setCaptchaError('');
  };

  useEffect(() => {
    generateChallenge();
  }, []);

  const handleCheckboxClick = () => {
    if (internalVerified) return;
    setShowChallenge(true);
  };

  const handleValidate = (e) => {
    e?.preventDefault();
    if (parseInt(userAnswer.trim(), 10) === num1 + num2) {
      setInternalVerified(true);
      setCaptchaError('');
      setShowChallenge(false);
      onVerify(true);
    } else {
      setCaptchaError('Resposta incorreta. Tente novamente.');
      generateChallenge();
      onVerify(false);
    }
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3 backdrop-blur-md">
      
      {/* Botão Checkbox Estilo ReCAPTCHA Dark Tech */}
      <div className="flex items-center justify-between">
        <div
          onClick={handleCheckboxClick}
          className={`flex items-center gap-3 cursor-pointer select-none py-1.5 px-2 rounded-xl transition ${
            internalVerified ? 'opacity-90' : 'hover:bg-slate-800/80'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
              internalVerified
                ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'border-slate-600 bg-slate-950 hover:border-cyan-400'
            }`}
          >
            {internalVerified && <CheckCircle2 size={18} className="font-extrabold" />}
          </div>
          <span className="text-xs font-bold text-slate-200">
            {internalVerified ? 'Verificação de Segurança Concluída' : 'Não sou um robô (Captcha)'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
          <ShieldCheck size={16} className={internalVerified ? 'text-emerald-400' : 'text-slate-500'} />
          <span className="text-slate-400">HelpUS Guard</span>
        </div>
      </div>

      {/* Caixa de Desafio Antirobô Dark Tech */}
      {showChallenge && !internalVerified && (
        <div className="bg-slate-950 border border-cyan-500/30 p-3.5 rounded-xl shadow-inner space-y-2.5 animate-fade-in">
          <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
            <span className="flex items-center gap-1.5">
              <Lock size={14} className="text-cyan-400" /> Desafio Antirobô:
            </span>
            <button
              type="button"
              onClick={generateChallenge}
              className="text-slate-400 hover:text-cyan-400 p-1 transition"
              title="Gerar nova conta"
            >
              <RotateCw size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-900 px-3.5 py-2 rounded-lg font-mono font-extrabold text-sm text-cyan-400 border border-slate-800">
              {num1} + {num2} = ?
            </div>

            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Resultado"
              className="w-24 px-3 py-2 text-sm border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none bg-slate-900 text-white font-bold font-mono"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleValidate(e);
              }}
            />

            <button
              type="button"
              onClick={handleValidate}
              className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-extrabold rounded-lg transition shadow-md shadow-cyan-600/20"
            >
              Validar
            </button>
          </div>

          {captchaError && (
            <div className="text-[11px] font-semibold text-rose-400 flex items-center gap-1">
              <AlertCircle size={13} /> {captchaError}
            </div>
          )}
        </div>
      )}

      {errorMsg && !internalVerified && (
        <div className="text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-500/30 p-2.5 rounded-xl flex items-center gap-1.5 backdrop-blur">
          <AlertCircle size={14} className="text-amber-400" /> {errorMsg}
        </div>
      )}

    </div>
  );
}
