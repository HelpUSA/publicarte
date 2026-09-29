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
    <div className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-4 shadow-sm space-y-3">
      
      {/* Botão Checkbox Estilo ReCAPTCHA */}
      <div className="flex items-center justify-between">
        <div
          onClick={handleCheckboxClick}
          className={`flex items-center gap-3 cursor-pointer select-none py-1.5 px-2 rounded-xl transition ${
            internalVerified ? 'opacity-90' : 'hover:bg-slate-200/60'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
              internalVerified
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'border-slate-400 bg-white hover:border-blue-600'
            }`}
          >
            {internalVerified && <CheckCircle2 size={18} />}
          </div>
          <span className="text-xs font-bold text-slate-700">
            {internalVerified ? 'Verificação de Segurança Concluída' : 'Não sou um robô (Captcha)'}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
          <ShieldCheck size={16} className={internalVerified ? 'text-emerald-500' : 'text-slate-400'} />
          <span>HelpUS Guard</span>
        </div>
      </div>

      {/* Caixa de Desafio se ainda não verificado */}
      {showChallenge && !internalVerified && (
        <div className="bg-white border border-blue-200 p-3.5 rounded-xl shadow-inner space-y-2.5 animate-fade-in">
          <div className="flex items-center justify-between text-xs text-blue-950 font-bold">
            <span className="flex items-center gap-1.5">
              <Lock size={14} className="text-blue-600" /> Desafio Antirobô:
            </span>
            <button
              type="button"
              onClick={generateChallenge}
              className="text-slate-400 hover:text-blue-600 p-1 transition"
              title="Gerar nova conta"
            >
              <RotateCw size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-100 px-3 py-2 rounded-lg font-mono font-bold text-sm text-slate-800 border border-slate-300">
              {num1} + {num2} = ?
            </div>

            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Resultado"
              className="w-24 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white font-bold"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleValidate(e);
              }}
            />

            <button
              type="button"
              onClick={handleValidate}
              className="px-3.5 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-extrabold rounded-lg transition shadow"
            >
              Validar
            </button>
          </div>

          {captchaError && (
            <div className="text-[11px] font-semibold text-red-600 flex items-center gap-1">
              <AlertCircle size={13} /> {captchaError}
            </div>
          )}
        </div>
      )}

      {errorMsg && !internalVerified && (
        <div className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 p-2 rounded-xl flex items-center gap-1.5">
          <AlertCircle size={14} /> {errorMsg}
        </div>
      )}

    </div>
  );
}
