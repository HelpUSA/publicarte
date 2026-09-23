// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin, ShieldCheck, ExternalLink } from 'lucide-react';
import NewsletterForm from './NewsletterForm';
import { useLanguage } from '../lib/i18n';

const Footer = ({ nomeEmpresa = 'Public Arte – Comunicação Visual' }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-100 text-gray-700 text-sm mt-10 pt-10 border-t">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-10">

        <div>
          <h4 className="font-semibold mb-2 uppercase text-gray-800">{t('footerInstitutional')}</h4>
          <ul className="space-y-1 text-blue-600">
            <li><Link to="/sobre" className="hover:underline">{t('navAbout')}</Link></li>
            <li><Link to="/orcamento" className="hover:underline">{t('navQuote')}</Link></li>
            <li><Link to="/contato" className="hover:underline">{t('navContact')}</Link></li>
            <li className="pt-2 border-t border-gray-200 mt-2">
              <Link
                to="/admin"
                className="font-bold text-blue-800 hover:text-blue-950 flex items-center gap-1.5 transition"
              >
                <ShieldCheck size={16} className="text-blue-700" />
                {t('navAdmin')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 uppercase text-gray-800">{t('footerContact')}</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Mail size={16} /> publicarte09@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> (83) 98610-4153
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={16} />
              <a
                href="https://instagram.com/terciograssi"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                @terciograssi
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Rua Ascendino Feitosa, 324 - Castelo Branco III
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 uppercase text-gray-800">{t('footerMessage')}</h4>
          <form className="flex flex-col gap-2">
            <input type="text" placeholder={t('formNamePlaceholder')} className="px-3 py-2 border rounded text-sm bg-white" />
            <input type="email" placeholder={t('formEmailPlaceholder')} className="px-3 py-2 border rounded text-sm bg-white" />
            <textarea placeholder={t('formMsgPlaceholder')} rows={3} className="px-3 py-2 border rounded text-sm bg-white"></textarea>
            <button type="submit" className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition font-semibold">
              {t('submitBtn')}
            </button>
          </form>
        </div>
      </div>

      {/* Newsletter movida para o final do footer */}
      <NewsletterForm />

      <div className="w-full h-64 mt-6">
        <iframe
          title="Localização"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.377925785303!2d-34.86358028588078!3d-7.110341194874597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ace9e6a4a72f2b%3A0x8617c3c69e2f1f7f!2sJo%C3%A3o%20Pessoa%2C%20PB!5e0!3m2!1spt-BR!2sbr!4v1699127746005!5m2!1spt-BR!2sbr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="text-center border-t border-gray-200 py-6 text-gray-600 text-xs leading-relaxed bg-white">
        © {new Date().getFullYear()} {nomeEmpresa}. {t('footerCopyright')}
        <div className="mt-3 flex flex-col items-center justify-center gap-2">
          <a
            href="https://helpusbr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-900 hover:text-blue-700 font-extrabold group"
          >
            <span>{t('footerDevBy')}</span>
            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* LOGO OFICIAL HELPUS */}
          <a href="https://helpusbr.com" target="_blank" rel="noopener noreferrer">
            <img
              src="/helpus-logo.png"
              alt="HelpUS Logo"
              className="h-14 w-auto object-contain rounded-xl hover:scale-105 transition-transform shadow-sm border border-gray-200 p-1 bg-white"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
