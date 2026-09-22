import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserIcon from './UserIcon';
import { useLanguage } from '../lib/i18n';
import { ShieldCheck, FileText, Menu, X, Globe, ChevronDown } from 'lucide-react';

export default function Header({
  logo = '/logo-publicarte.png',
  nomeEmpresa = 'Public Arte – Comunicação Visual'
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { lang, changeLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const languages = [
    { code: 'pt', label: 'Português (PT)', flag: '🇧🇷' },
    { code: 'en', label: 'English (EN)', flag: '🇺🇸' },
    { code: 'es', label: 'Español (ES)', flag: '🇪🇸' },
  ];

  const activeLangObj = languages.find((l) => l.code === lang) || languages[0];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur shadow-md' : 'bg-white'
      } border-b border-gray-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Name */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:scale-105 transition-transform duration-300"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-800 text-white flex items-center justify-center font-black text-xl shadow-md">
            PA
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-blue-900 tracking-tight leading-tight">
              PUBLIC ARTE
            </span>
            <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">
              Comunicação Visual
            </span>
          </div>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition duration-200 ${
              location.pathname === '/' ? 'text-blue-800 font-bold' : 'text-gray-700 hover:text-blue-800'
            }`}
          >
            {t('navHome')}
          </Link>

          <Link
            to="/sobre"
            className={`text-sm font-medium transition duration-200 ${
              location.pathname === '/sobre' ? 'text-blue-800 font-bold' : 'text-gray-700 hover:text-blue-800'
            }`}
          >
            {t('navAbout')}
          </Link>

          <Link
            to="/contato"
            className={`text-sm font-medium transition duration-200 ${
              location.pathname === '/contato' ? 'text-blue-800 font-bold' : 'text-gray-700 hover:text-blue-800'
            }`}
          >
            {t('navContact')}
          </Link>

          <Link
            to="/orcamento"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition"
          >
            <FileText size={14} />
            {t('navQuote')}
          </Link>

          {/* Direct Admin Link */}
          <Link
            to="/admin"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-800 text-white text-xs font-semibold hover:bg-blue-900 transition shadow-sm"
          >
            <ShieldCheck size={15} />
            {t('navAdmin')}
          </Link>
        </nav>

        {/* Right Section: Language + User Icon + Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-blue-800 bg-gray-100 px-2.5 py-1.5 rounded-md border border-gray-200"
            >
              <Globe size={14} />
              <span>{activeLangObj.flag} {activeLangObj.code.toUpperCase()}</span>
              <ChevronDown size={12} />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      changeLanguage(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-blue-50 ${
                      lang === l.code ? 'font-bold text-blue-800 bg-blue-50/50' : 'text-gray-700'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <UserIcon />

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-800"
          >
            {t('navHome')}
          </Link>
          <Link
            to="/sobre"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-800"
          >
            {t('navAbout')}
          </Link>
          <Link
            to="/contato"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-800"
          >
            {t('navContact')}
          </Link>
          <Link
            to="/orcamento"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-emerald-700 hover:text-emerald-800"
          >
            {t('navQuote')}
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-sm font-bold text-blue-800"
          >
            <ShieldCheck size={16} />
            {t('navAdmin')}
          </Link>
        </div>
      )}
    </header>
  );
}
