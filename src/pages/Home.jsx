import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import CategoryBar from '../components/CategoryBar';
import BrandGrid from '../components/BrandGrid';
import WhatsAppButton from '../components/WhatsAppButton';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../lib/i18n';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();
  const [produtos, setProdutos] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

  // Produtos iniciais de comunicação visual para vitrine
  const produtosPadrao = [
    {
      id: 101,
      nome: 'Banner de Vinil 440g com Ilhós',
      preco: 45.0,
      marca: 'Banners & Lonas',
      imagem_url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 102,
      nome: 'Adesivo Vinílico Recorte Eletrônico',
      preco: 40.0,
      marca: 'Adesivos Vinílicos',
      imagem_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 103,
      nome: 'Placa em Metalon com Lona Impressa',
      preco: 120.0,
      marca: 'Placas & Fachadas',
      imagem_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 104,
      nome: 'Cartão de Visita 250g (1.000 unidades)',
      preco: 90.0,
      marca: 'Gráfica Rápida',
      imagem_url: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 105,
      nome: 'Serigrafia & DTF em Camisetas',
      preco: 25.0,
      marca: 'Serigrafia & DTF',
      imagem_url: 'https://images.unsplash.com/photo-1622445268465-8438165a2683?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 106,
      nome: 'Caneca Porcelana Personalizada',
      preco: 28.0,
      marca: 'Brindes Promocionais',
      imagem_url: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=500&auto=format&fit=crop&q=60'
    }
  ];

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setProdutos(data);
        } else {
          setProdutos(produtosPadrao);
        }
      } catch (err) {
        setProdutos(produtosPadrao);
      }
    };

    fetchProdutos();
  }, []);

  const formatarPreco = (preco) => {
    if (typeof preco === 'number') {
      return `R$ ${preco.toFixed(2).replace('.', ',')}`;
    }
    return 'Sob consulta';
  };

  const produtosFiltrados = produtos.filter((p) => {
    const atendeTexto = filtroTexto
      ? p.nome?.toLowerCase().includes(filtroTexto.toLowerCase()) ||
        p.marca?.toLowerCase().includes(filtroTexto.toLowerCase())
      : true;

    const atendeCategoria = categoriaSelecionada
      ? p.marca?.toLowerCase().includes(categoriaSelecionada.toLowerCase()) ||
        p.categoria?.toLowerCase().includes(categoriaSelecionada.toLowerCase())
      : true;

    return atendeTexto && atendeCategoria;
  });

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Header />

      <main className="pt-16">
        <Hero
          instagram="terciograssi"
          altTexto="Public Arte – Comunicação Visual"
        />

        {/* CTA RAPIDO PARA ORÇAMENTO ONLINE */}
        <section className="bg-gradient-to-r from-blue-950 to-blue-850 text-white py-8 px-4 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200 block mb-1">
                {t('heroBadge')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {t('needQuoteTitle')}
              </h2>
              <p className="text-blue-100 text-sm mt-1 max-w-xl">
                {t('needQuoteSubtitle')}
              </p>
            </div>

            <Link
              to="/orcamento"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-900/30 flex items-center gap-2 transition text-sm whitespace-nowrap"
            >
              <Calculator size={18} />
              {t('requestQuoteBtn')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* GRID DE ESPECIALIDADES */}
        <BrandGrid
          categoriaSelecionada={categoriaSelecionada}
          onCategoriaSelect={(cat) => setCategoriaSelecionada(cat)}
        />

        {/* BARRA DE PESQUISA E FILTROS */}
        <CategoryBar
          onFiltroTextoChange={(txt) => setFiltroTexto(txt)}
          onCategoriaSelect={(cat) => setCategoriaSelecionada(cat)}
          categoriaSelecionada={categoriaSelecionada}
        />

        {/* SEÇÃO DE PRODUTOS E SERVIÇOS */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8 border-b pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
                {t('featuredProducts')}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {t('featuredSubtitle')}
              </p>
            </div>

            {categoriaSelecionada && (
              <button
                onClick={() => setCategoriaSelecionada('')}
                className="text-xs font-bold text-blue-800 hover:underline"
              >
                {t('clearFilter')} ({categoriaSelecionada})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtosFiltrados.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 py-12">
                {t('noProducts')}
              </p>
            ) : (
              produtosFiltrados.map((p) => (
                <ProductCard
                  key={p.id}
                  product={{
                    id: p.id,
                    name: p.nome,
                    price: p.preco_promocional || p.preco,
                    brandName: p.marca || 'Public Arte',
                    imageUrl: p.imagem_url || 'https://via.placeholder.com/300x200?text=Public+Arte',
                  }}
                  formatarPreco={formatarPreco}
                />
              ))
            )}
          </div>
        </section>
      </main>

      <Footer nomeEmpresa="Public Arte – Comunicação Visual" />
      <WhatsAppButton />
    </div>
  );
}
