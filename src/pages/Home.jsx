import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import CategoryBar from '../components/CategoryBar';
import BrandGrid from '../components/BrandGrid';
import WhatsAppButton from '../components/WhatsAppButton';
import CartModal from '../components/CartModal';
import ItemCustomModal from '../components/ItemCustomModal';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../lib/i18n';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();
  const [produtos, setProdutos] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

  // Cart & Modal State (Padrão Queijeira 504)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('publicarte_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  // Catalogo inicial padronizado de Comunicação Visual do Tércio Grassi (Public Arte) com imagens reais do Instagram
  const produtosPadrao = [
    {
      id: 1,
      codigo: 'PRD-001',
      nome: 'Banner de Vinil 440g com Ilhós',
      preco: 45.0,
      unidade: 'm²',
      marca: 'Banners & Lonas',
      categoria: 'Banners & Lonas',
      imagem_url: '/instagram/ig_18331346713195531.jpg',
      observacao: 'Ilhós reforçado e acabamento dobrado nas pontas'
    },
    {
      id: 2,
      codigo: 'PRD-002',
      nome: 'Adesivo Vinílico Recorte Eletrônico',
      preco: 40.0,
      unidade: 'm²',
      marca: 'Adesivos & Rótulos',
      categoria: 'Adesivos & Rótulos',
      imagem_url: '/instagram/ig_17946900017864550.jpg',
      observacao: 'Vinil calandrado atóxico de alta durabilidade'
    },
    {
      id: 3,
      codigo: 'PRD-003',
      nome: 'Adesivo Perfurado para Vitrines',
      preco: 55.0,
      unidade: 'm²',
      marca: 'Adesivos & Rótulos',
      categoria: 'Adesivos & Rótulos',
      imagem_url: '/instagram/ig_17884342929149903.jpg',
      observacao: 'Visibilidade 50/50 com película protetora UV'
    },
    {
      id: 4,
      codigo: 'PRD-004',
      nome: 'Placa em Metalon com Lona Impressa',
      preco: 180.0,
      unidade: 'm²',
      marca: 'Placas & Fachadas',
      categoria: 'Placas & Fachadas',
      imagem_url: '/instagram/ig_17962347830819280.jpg',
      observacao: 'Estrutura em tubo galvanizado anticorrosivo'
    },
    {
      id: 5,
      codigo: 'PRD-005',
      nome: 'Fachada Comercial em ACM',
      preco: 420.0,
      unidade: 'm²',
      marca: 'Placas & Fachadas',
      categoria: 'Placas & Fachadas',
      imagem_url: '/instagram/ig_17876414721565695.jpg',
      observacao: 'Painel de Alumínio Composto para alta elegância'
    },
    {
      id: 6,
      codigo: 'PRD-006',
      nome: 'Letra Caixa 3D em Acrílico / Inox',
      preco: 160.0,
      unidade: 'unidade',
      marca: 'Placas & Fachadas',
      categoria: 'Placas & Fachadas',
      imagem_url: '/instagram/ig_18054294236343666.jpg',
      observacao: 'Opção com ou sem iluminação interna em LED'
    },
    {
      id: 7,
      codigo: 'PRD-007',
      nome: 'Cartão de Visita 250g (1.000 un)',
      preco: 90.0,
      unidade: 'pacote',
      marca: 'Gráfica Rápida',
      categoria: 'Gráfica Rápida',
      imagem_url: '/instagram/ig_17892730401385549.jpg',
      observacao: 'Verniz localizado UV com acabamento especial'
    },
    {
      id: 8,
      codigo: 'PRD-008',
      nome: 'Panfletos e Folders Promocionais (1.000 un)',
      preco: 160.0,
      unidade: 'pacote',
      marca: 'Gráfica Rápida',
      categoria: 'Gráfica Rápida',
      imagem_url: '/instagram/ig_17983595972930658.jpg',
      observacao: 'Papel couchê 115g com impressão offset vibrante'
    },
    {
      id: 9,
      codigo: 'PRD-009',
      nome: 'Serigrafia & DTF em Camisetas',
      preco: 28.0,
      unidade: 'unidade',
      marca: 'Serigrafia & DTF',
      categoria: 'Serigrafia & DTF',
      imagem_url: '/instagram/ig_18318898819220395.jpg',
      observacao: 'Estampa em alta resolução e resistência à lavagem'
    },
    {
      id: 10,
      codigo: 'PRD-010',
      nome: 'Caneca Porcelana Personalizada',
      preco: 28.0,
      unidade: 'unidade',
      marca: 'Brindes Promocionais',
      categoria: 'Brindes Promocionais',
      imagem_url: '/instagram/ig_18081912410146324.jpg',
      observacao: 'Porcelana resinada própria para sublimação'
    },
    {
      id: 11,
      codigo: 'PRD-011',
      nome: 'Totem Comercial em ACM & Leds',
      preco: 750.0,
      unidade: 'unidade',
      marca: 'Placas & Fachadas',
      categoria: 'Placas & Fachadas',
      imagem_url: '/instagram/ig_17972466296964894.jpg',
      observacao: 'Sinalização vertical de alto impacto para calçadas'
    },
    {
      id: 12,
      codigo: 'PRD-012',
      nome: 'Envelopamento de Frotas e Veículos',
      preco: 250.0,
      unidade: 'm²',
      marca: 'Adesivos & Rótulos',
      categoria: 'Adesivos & Rótulos',
      imagem_url: '/instagram/ig_18142952848454778.jpg',
      observacao: 'Adesivo cast automotivo de altíssima durabilidade'
    },
    {
      id: 13,
      codigo: 'PRD-013',
      nome: 'Brindes Corporativos Personalizados',
      preco: 18.0,
      unidade: 'unidade',
      marca: 'Brindes Promocionais',
      categoria: 'Brindes Promocionais',
      imagem_url: '/instagram/ig_18136978291470795.jpg',
      observacao: 'Canetas, chaveiros e kits personalizados para empresas'
    }
  ];

  // Carrega produtos do localStorage e do Supabase
  useEffect(() => {
    const fetchProdutos = async () => {
      // 1. Tenta carregar do localStorage (sincronizado com Admin.jsx)
      const local = localStorage.getItem('publicarte_produtos');
      if (local && !local.includes('unsplash.com')) {
        try {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProdutos(parsed.map(p => ({
              ...p,
              imagem_url: p.foto || p.imagem_url,
              marca: p.categoria || p.marca
            })));
            return;
          }
        } catch (e) {}
      }

      // 2. Se não houver no local, consulta Supabase ou usa o catálogo mestre
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

  // Salva o carrinho no localStorage sempre que alterado
  useEffect(() => {
    try {
      localStorage.setItem('publicarte_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const formatarPreco = (preco) => {
    if (typeof preco === 'number') {
      return `R$ ${preco.toFixed(2).replace('.', ',')}`;
    }
    return 'Sob consulta';
  };

  const handleAddToCart = (itemCustomizado) => {
    const cartId = Date.now() + Math.random();
    setCart(prev => [...prev, { ...itemCustomizado, cartId }]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index, delta) => {
    setCart(prev => {
      const updated = [...prev];
      const target = updated[index];
      if (!target) return prev;
      target.quantidade += delta;
      if (target.quantidade <= 0) {
        updated.splice(index, 1);
      } else {
        target.precoTotal = (target.precoUnitario || target.preco) * target.quantidade;
      }
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('publicarte_cart');
  };

  const produtosFiltrados = produtos.filter((p) => {
    const atendeTexto = filtroTexto
      ? p.nome?.toLowerCase().includes(filtroTexto.toLowerCase()) ||
        p.marca?.toLowerCase().includes(filtroTexto.toLowerCase()) ||
        p.categoria?.toLowerCase().includes(filtroTexto.toLowerCase())
      : true;

    const atendeCategoria = categoriaSelecionada
      ? p.marca?.toLowerCase().includes(categoriaSelecionada.toLowerCase()) ||
        p.categoria?.toLowerCase().includes(categoriaSelecionada.toLowerCase())
      : true;

    return atendeTexto && atendeCategoria;
  });

  const cartCount = cart.reduce((sum, item) => sum + (item.quantidade || 1), 0);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="pt-16">
        <Hero
          instagram="terciograssi"
          altTexto="Public Arte – Comunicação Visual"
        />

        {/* CTA RAPIDO PARA ORÇAMENTO ONLINE */}
        <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white py-8 px-4 shadow-md border-y border-blue-800/40">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-300 block mb-1">
                <Sparkles size={14} className="text-yellow-400" /> {t('heroBadge')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {t('needQuoteTitle')}
              </h2>
              <p className="text-blue-100 text-sm mt-1 max-w-xl">
                {t('needQuoteSubtitle')}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-5 py-3.5 rounded-xl shadow-lg flex items-center gap-2 transition text-sm cursor-pointer"
              >
                <ShoppingBag size={18} />
                <span>Ver Sacola ({cartCount})</span>
              </button>

              <Link
                to="/orcamento"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-900/30 flex items-center gap-2 transition text-sm whitespace-nowrap"
              >
                <Calculator size={18} />
                {t('requestQuoteBtn')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* GRID DE ESPECIALIDADES / CATEGORIAS */}
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

        {/* SEÇÃO DE PRODUTOS E SERVIÇOS DO CATÁLOGO DE TÉRCIO GRASSI */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8 border-b pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
                {t('featuredProducts')}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Catálogo de Comunicação Visual do Instagram de Tércio Grassi (@terciograssi)
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
              <p className="col-span-full text-center text-gray-500 py-12 font-medium">
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
                    brandName: p.marca || p.categoria || 'Public Arte',
                    imageUrl: p.imagem_url || p.foto || 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=60',
                    observacao: p.observacao,
                    unidade: p.unidade || 'unidade'
                  }}
                  formatarPreco={formatarPreco}
                  onSelect={(productToBuy) => setSelectedProductForModal(productToBuy)}
                />
              ))
            )}
          </div>
        </section>
      </main>

      {/* MODAL DE PERSONALIZAÇÃO E MEDIDAS DE PRODUTO */}
      {selectedProductForModal && (
        <ItemCustomModal
          item={selectedProductForModal}
          isOpen={!!selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          onAddToCart={handleAddToCart}
          formatarPreco={formatarPreco}
        />
      )}

      {/* DRAWER / MODAL DE SACOLA DE COMPRAS E CHECKOUT WHATSAPP */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        formatarPreco={formatarPreco}
        whatsappNumber="5583986104153"
      />

      <Footer nomeEmpresa="Public Arte – Comunicação Visual" />
      <WhatsAppButton />
    </div>
  );
}
