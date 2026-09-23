import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import {
  BookOpen,
  ArrowLeft,
  ShoppingCart,
  FileSpreadsheet,
  Package,
  DollarSign,
  Smartphone,
} from 'lucide-react';

export default function Manual() {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <Header />

      <main className="max-w-5xl mx-auto px-4 pt-24 pb-16 w-full">
        {/* Header do Manual */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2">
              <BookOpen size={16} /> {t('manualDocBadge')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
              {t('manualDocTitle')}
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              {t('manualDocSubtitle')}
            </p>
          </div>

          <Link
            to="/admin"
            className="bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition"
          >
            <ArrowLeft size={16} /> {t('btnBackAdmin')}
          </Link>
        </div>

        <div className="space-y-6">
          {/* CREDENCIAIS */}
          <div className="bg-blue-900 text-white rounded-3xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block">
                {t('authBoxTitle')}
              </span>
              <h2 className="text-xl font-bold mt-1">{t('authBoxTitle')}</h2>
              <p className="text-blue-200 text-xs mt-1">
                {t('authBoxSubtitle')}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-2xl text-xs space-y-1">
              <div>
                <strong>{t('loginUserLabel')}:</strong> <code className="bg-white text-blue-900 px-2 py-0.5 rounded font-mono font-bold">tercio</code>
              </div>
              <div>
                <strong>{t('loginPassLabel')}:</strong> <code className="bg-white text-blue-900 px-2 py-0.5 rounded font-mono font-bold">admin1993</code>
              </div>
            </div>
          </div>

          {/* MÓDULOS DO SISTEMA */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-8">

            {/* Módulo 1 */}
            <div className="border-b pb-6 space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-blue-100 rounded-xl text-blue-800">
                  <ShoppingCart size={22} />
                </div>
                <h3 className="text-lg font-bold">{t('manualSec1Title')}</h3>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {t('manualSec1Desc')}
              </p>
            </div>

            {/* Módulo 2 */}
            <div className="border-b pb-6 space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-800">
                  <FileSpreadsheet size={22} />
                </div>
                <h3 className="text-lg font-bold">{t('manualSec2Title')}</h3>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {t('manualSec2Desc')}
              </p>
            </div>

            {/* Módulo 3 */}
            <div className="border-b pb-6 space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-purple-100 rounded-xl text-purple-800">
                  <Package size={22} />
                </div>
                <h3 className="text-lg font-bold">{t('manualSec3Title')}</h3>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {t('manualSec3Desc')}
              </p>
            </div>

            {/* Módulo 4 */}
            <div className="border-b pb-6 space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-amber-100 rounded-xl text-amber-800">
                  <DollarSign size={22} />
                </div>
                <h3 className="text-lg font-bold">{t('manualSec4Title')}</h3>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {t('manualSec4Desc')}
              </p>
            </div>

            {/* Módulo 5 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-indigo-100 rounded-xl text-indigo-800">
                  <Smartphone size={22} />
                </div>
                <h3 className="text-lg font-bold">{t('manualSec5Title')}</h3>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {t('manualSec5Desc')}
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
