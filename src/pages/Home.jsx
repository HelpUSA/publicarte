import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import WhatsAppButton from '../components/WhatsAppButton';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar produtos:', error.message);
      } else {
        setProdutos(data);
      }
    };

    fetchProdutos();
  }, []);

  const formatarPreco = (preco) => {
    if (typeof preco === 'number') {
      return `R$ ${preco.toFixed(2).replace('.', ',')}`;
    }
    return '';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        logo="/logo-publicarte.png"
        nomeEmpresa="Public Arte – Comunicação Visual"
      />

      <Hero
        videoUrl="/video-publicarte.mp4"
        altTexto="Public Arte – Comunicação Visual"
        instagram="terciograssi"
      />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Produtos em Destaque
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {produtos.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              Nenhum produto disponível no momento.
            </p>
          ) : (
            produtos.map((p) => (
              <ProductCard
                key={p.id}
                product={{
                  id: p.id,
                  name: p.nome,
                  price: p.preco_promocional || p.preco,
                  brandName: p.marca,
                  imageUrl: p.imagem_url || 'https://via.placeholder.com/150',
                }}
                formatarPreco={formatarPreco}
              />
            ))
          )}
        </div>
      </section>

      <Footer nomeEmpresa="Public Arte – Comunicação Visual" />

      <WhatsAppButton />
    </div>
  );
}
