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
import { Calculator, ArrowRight, ShieldCheck, Sparkles, Award } from 'lucide-react';

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
      imagem_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 102,
      nome: 'Adesivo Vinílico Recorte Eletrônico',
      preco: 40.0,
      marca: 'Adesivos & Rótulos',
      imagem_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 103,
      nome: 'Placa em Metalon com Lona Impressa',
      preco: 120.0,
      marca: 'Fachadas & Placas',
      imagem_url: 'https://images.unsplash.com/photo-1542744094-3a3172720449?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 104,
      nome: 'Cartão de Visita 250g (1.000 unidades)',
      preco: 90.0,
      marca: 'Gráfica Rápida',
      imagem_url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 105,
      nome: 'Serigrafia & DTF em Camisetas',
      preco: 25.0,
      marca: 'Serigrafia & DTF',
      imagem_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 106,
      nome: 'Caneca Porcelana Personalizada',
      preco: 28.0,
      marca: 'Brindes & Canecas',
      imagem_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60'
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
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8 px-4 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200 block mb-1">
                Atendimento Rápido & Personalizado
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Precisa de um orçamento para sua empresa?
              </h2>
              <p className="text-blue-100 text-sm mt-1 max-w-xl">
                Calcule a estimativa de banners, placas, adesivos ou brindes em segundos e envie via WhatsApp.
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
              <h2 className="text-2xl font-bold text-gray-800">
                {t('featuredProducts')}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Soluções em alta definição para alavancar a presença visual do seu negócio
              </p>
            </div>

            {categoriaSelecionada && (
              <button
                onClick={() => setCategoriaSelecionada('')}
                className="text-xs font-bold text-blue-800 hover:underline"
              >
                Limpar Filtro ({categoriaSelecionada})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtosFiltrados.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 py-12">
                Nenhum produto encontrado para a busca especificada.
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
