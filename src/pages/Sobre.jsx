// src/pages/Sobre.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Sobre() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Sobre a Public Arte</h1>
        <p className="text-gray-700 leading-relaxed">
          A <strong>Public Arte – COMUNICAÇÃO</strong> é especializada em soluções criativas para divulgação visual. Atendemos clientes com serviços de:
        </p>
        <ul className="list-disc list-inside text-gray-700 my-4 space-y-1">
          <li>Adesivos personalizados</li>
          <li>Serigrafia e impressão DTF</li>
          <li>Placas em metalon com lona</li>
          <li>Ecobags, canecas e brindes promocionais</li>
          <li>Gráfica rápida e copiadora</li>
        </ul>
        <p className="text-gray-700">
          Localizada em João Pessoa – PB, a Public Arte atua com criatividade, agilidade e compromisso com a qualidade.
        </p>
      </main>

      <Footer />
    </div>
  );
}