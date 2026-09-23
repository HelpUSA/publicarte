// src/pages/Contato.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Phone, Instagram, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

export default function Contato() {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16 w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 space-y-8">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-950">{t('contactTitle')}</h1>
            <p className="text-gray-500 text-sm mt-1">{t('contactSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-700 text-sm bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <p className="flex items-center gap-3 font-medium">
                <Mail size={18} className="text-blue-800" /> contato@publicarte.com.br
              </p>
              <p className="flex items-center gap-3 font-medium">
                <Phone size={18} className="text-blue-800" /> (83) 98610-4153 (WhatsApp)
              </p>
              <p className="flex items-center gap-3 font-medium">
                <Instagram size={18} className="text-blue-800" />
                <a
                  href="https://instagram.com/terciograssi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  @terciograssi – Tércio Grassi
                </a>
              </p>
              <p className="flex items-center gap-3 font-medium">
                <MapPin size={18} className="text-blue-800" /> Rua Ascendino Feitosa, 324 - Castelo Branco III · João Pessoa - PB
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-3">{t('sendMessageHeader')}</h2>
              <form className="space-y-3">
                <input
                  type="text"
                  placeholder={t('formNamePlaceholder')}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                />
                <input
                  type="email"
                  placeholder={t('formEmailPlaceholder')}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                />
                <textarea
                  placeholder={t('formMsgPlaceholder')}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 rounded-xl transition shadow-md text-sm flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  {t('submitBtn')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
