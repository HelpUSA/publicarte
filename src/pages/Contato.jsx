// src/pages/Contato.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Phone, Instagram, MapPin } from 'lucide-react';

export default function Contato() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Fale com a Public Arte</h1>
        <div className="space-y-4 text-gray-700 text-base">
          <p className="flex items-center gap-2">
            <Mail size={18} /> contato@publicarte.com.br
          </p>
          <p className="flex items-center gap-2">
            <Phone size={18} /> (83) 98610-4153 (WhatsApp)
          </p>
          <p className="flex items-center gap-2">
            <Instagram size={18} />
            <a
              href="https://instagram.com/terciograssi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              @terciograssi – 1,9 mil seguidores
            </a>
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={18} /> João Pessoa - PB, Brasil
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Envie uma mensagem</h2>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full px-4 py-2 border rounded text-sm"
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              className="w-full px-4 py-2 border rounded text-sm"
            />
            <textarea
              placeholder="Sua mensagem"
              rows={4}
              className="w-full px-4 py-2 border rounded text-sm"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
            >
              Enviar
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
