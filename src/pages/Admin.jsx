// src/pages/Admin.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Admin() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Área Administrativa</h1>
        <p className="text-gray-700">Bem-vindo! Aqui você pode gerenciar produtos, usuários e conteúdos do site Public Arte.</p>
      </main>

      <Footer />
    </div>
  );
}
