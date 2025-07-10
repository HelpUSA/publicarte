import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pt-16">
        <Hero
          instagram="terciograssi"
          altTexto="Public Arte – Comunicação Visual"
        />
        <section className="text-center py-10 px-4">
          <h2 className="text-2xl font-bold text-blue-800">Seja bem-vindo!</h2>
          <p className="text-gray-700 mt-2">
            Aqui você encontra soluções criativas em comunicação visual:
            adesivos, lonas, placas, serigrafia, impressos e muito mais.
          </p>
        </section>
      </main>
      <Footer nomeEmpresa="Public Arte – Comunicação Visual" />
      <WhatsAppButton />
    </div>
  );
}
