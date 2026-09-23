// src/pages/Sobre.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../lib/i18n';
import { CheckCircle2, ShieldCheck, Award } from 'lucide-react';

export default function Sobre() {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16 w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 space-y-6">
          <div className="border-b pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-3">
              <Award size={16} /> Public Arte João Pessoa
            </div>
            <h1 className="text-3xl font-extrabold text-blue-950">{t('aboutTitle')}</h1>
            <p className="text-gray-600 leading-relaxed mt-2 text-sm sm:text-base">
              {t('aboutIntro')}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <ShieldCheck size={20} className="text-blue-800" />
              {t('aboutServicesHeader')}
            </h2>

            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                <CheckCircle2 size={18} className="text-blue-800 shrink-0 mt-0.5" />
                <span>{t('aboutItem1')}</span>
              </li>
              <li className="flex items-start gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                <CheckCircle2 size={18} className="text-blue-800 shrink-0 mt-0.5" />
                <span>{t('aboutItem2')}</span>
              </li>
              <li className="flex items-start gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                <CheckCircle2 size={18} className="text-blue-800 shrink-0 mt-0.5" />
                <span>{t('aboutItem3')}</span>
              </li>
              <li className="flex items-start gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                <CheckCircle2 size={18} className="text-blue-800 shrink-0 mt-0.5" />
                <span>{t('aboutItem4')}</span>
              </li>
              <li className="flex items-start gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                <CheckCircle2 size={18} className="text-blue-800 shrink-0 mt-0.5" />
                <span>{t('aboutItem5')}</span>
              </li>
            </ul>
          </div>

          <div className="border-t pt-4 text-xs sm:text-sm text-gray-600 italic">
            {t('aboutConclusion')}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}