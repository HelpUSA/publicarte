import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import {
  ShoppingCart,
  Package,
  DollarSign,
  Plus,
  Trash2,
  Printer,
  Send,
  Clock,
  Lock,
  Unlock,
  BookOpen,
  User as UserIcon,
  CheckCircle2,
  Receipt,
  Edit2,
  Save
} from 'lucide-react';

export default function Admin() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('pdv');

  // State: Caixa
  const [caixaAberto, setCaixaAberto] = useState(true);

  // State: PDV / Frente de Caixa estilo Softcom
  const [pdvCliente, setPdvCliente] = useState('');
  const [pdvTelefone, setPdvTelefone] = useState('');
  const [pdvSearchQuery, setPdvSearchQuery] = useState('');
  const [pdvCarrinho, setPdvCarrinho] = useState([]);
  const [pdvDesconto, setPdvDesconto] = useState('');
  const [pdvFormaPagamento, setPdvFormaPagamento] = useState('PIX');
  const [pdvValorRecebido, setPdvValorRecebido] = useState('');
  const [pdvEntrada, setPdvEntrada] = useState('');
  const [cupomModal, setCupomModal] = useState(null);

  // State: Vendas / Histórico de Vendas
  const [comandas, setComandas] = useState(() => {
    const local = localStorage.getItem('publicarte_comandas');
    return local
      ? JSON.parse(local)
      : [
          {
            id: 'VND-1001',
            cliente: 'Maria Silva',
            telefone: '(83) 99888-1122',
            itens: [{ produto: 'Banner de Vinil 440g (1.5m x 1.0m)', qtd: 2, unit: 67.5, total: 135.0 }],
            subtotal: 135.0,
            desconto: 0,
            total: 135.0,
            pago: 135.0,
            formaPagamento: 'PIX',
            valorRecebido: 135.0,
            troco: 0,
            status: 'Entregue & Concluído',
            data: '2026-09-24 14:30',
            prazo: false
          },
          {
            id: 'VND-1002',
            cliente: 'João Souza (Mercadinho João)',
            telefone: '(83) 98765-4321',
            itens: [{ produto: 'Placa Metalon + Lona (2.0m x 1.0m)', qtd: 1, unit: 240.0, total: 240.0 }],
            subtotal: 240.0,
            desconto: 0,
            total: 240.0,
            pago: 100.0,
            formaPagamento: 'A Prazo',
            valorRecebido: 100.0,
            troco: 0,
            status: 'Aguardando',
            data: '2026-09-24 15:10',
            prazo: true
          }
        ];
  });

  // State: Produtos e Serviços (Sem controle restritivo de estoque)
  const [produtos, setProdutos] = useState(() => {
    const local = localStorage.getItem('publicarte_produtos');
    return local
      ? JSON.parse(local)
      : [
          { id: 1, nome: 'Banner de Vinil 440g', categoria: 'Banners & Lonas', preco: 45.0, unidade: 'm²' },
          { id: 2, nome: 'Adesivo Vinílico Brilho', categoria: 'Adesivos & Rótulos', preco: 40.0, unidade: 'm²' },
          { id: 3, nome: 'Cartão de Visita 250g (1000un)', categoria: 'Gráfica Rápida', preco: 90.0, unidade: 'pacote' },
          { id: 4, nome: 'Placa em Metalon com Lona', categoria: 'Placas & Fachadas', preco: 180.0, unidade: 'm²' },
          { id: 5, nome: 'Camiseta Serigrafia / DTF', categoria: 'Serigrafia & DTF', preco: 35.0, unidade: 'un' },
          { id: 6, nome: 'Caneca Promocional Personalizada', categoria: 'Brindes Promocionais', preco: 28.0, unidade: 'un' }
        ];
  });

  const [produtoEditando, setProdutoEditando] = useState(null);

  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    categoria: 'Impressão Digital',
    preco: '',
    unidade: 'un'
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('publicarte_comandas', JSON.stringify(comandas));
  }, [comandas]);

  useEffect(() => {
    localStorage.setItem('publicarte_produtos', JSON.stringify(produtos));
  }, [produtos]);

  // Cálculos PDV Frente de Caixa
  const pdvSubtotal = pdvCarrinho.reduce((acc, item) => acc + (Number(item.total) || 0), 0);
  const pdvValorDesconto = Number(pdvDesconto) || 0;
  const pdvTotalFinal = Math.max(0, pdvSubtotal - pdvValorDesconto);
  const pdvTroco =
    pdvFormaPagamento === 'Dinheiro' && Number(pdvValorRecebido) > pdvTotalFinal
      ? Number(pdvValorRecebido) - pdvTotalFinal
      : 0;

  // Handlers PDV
  const handleAdicionarAoCarrinho = (produto) => {
    const idx = pdvCarrinho.findIndex((c) => c.produto === produto.nome);
    if (idx >= 0) {
      const copy = [...pdvCarrinho];
      copy[idx].qtd += 1;
      copy[idx].total = copy[idx].qtd * copy[idx].unit;
      setPdvCarrinho(copy);
    } else {
      setPdvCarrinho([
        ...pdvCarrinho,
        {
          id: Date.now(),
          produto: produto.nome,
          unit: Number(produto.preco),
          qtd: 1,
          total: Number(produto.preco)
        }
      ]);
    }
  };

  const handleAlterarQtdCarrinho = (index, delta) => {
    const copy = [...pdvCarrinho];
    const novaQtd = copy[index].qtd + delta;
    if (novaQtd <= 0) {
      copy.splice(index, 1);
    } else {
      copy[index].qtd = novaQtd;
      copy[index].total = novaQtd * copy[index].unit;
    }
    setPdvCarrinho(copy);
  };

  const handleAdicionarItemAvulso = () => {
    const nome = prompt('Nome do Produto/Serviço Avulso:', 'Serviço sob medida');
    if (!nome) return;
    const val = prompt('Valor Unitário (R$):', '50.00');
    if (!val || isNaN(val)) return;
    setPdvCarrinho([
      ...pdvCarrinho,
      {
        id: Date.now(),
        produto: nome,
        unit: Number(val),
        qtd: 1,
        total: Number(val)
      }
    ]);
  };

  const handleFinalizarVendaPDV = (e) => {
    e.preventDefault();
    if (pdvCarrinho.length === 0) {
      alert(t('pdvEmptyCart'));
      return;
    }

    const clienteNome = pdvCliente.trim() || 'Cliente Balcão';
    const clienteFone = pdvTelefone.trim() || '(83) 90000-0000';
    const ePrazo = pdvFormaPagamento === 'A Prazo';
    const valorPago = ePrazo ? Number(pdvEntrada || 0) : pdvTotalFinal;

    const novaVenda = {
      id: `VND-${Math.floor(1000 + Math.random() * 9000)}`,
      cliente: clienteNome,
      telefone: clienteFone,
      itens: pdvCarrinho,
      subtotal: pdvSubtotal,
      desconto: pdvValorDesconto,
      total: pdvTotalFinal,
      pago: valorPago,
      formaPagamento: pdvFormaPagamento,
      valorRecebido: Number(pdvValorRecebido) || pdvTotalFinal,
      troco: pdvTroco,
      status: ePrazo ? 'Aguardando' : 'Entregue & Concluído',
      data: new Date().toLocaleString('pt-BR').slice(0, 16),
      prazo: ePrazo
    };

    setComandas([novaVenda, ...comandas]);
    setCupomModal(novaVenda);

    // Limpar PDV para o próximo atendimento
    setPdvCarrinho([]);
    setPdvCliente('');
    setPdvTelefone('');
    setPdvDesconto('');
    setPdvValorRecebido('');
    setPdvEntrada('');
  };

  // Handlers Produtos
  const handleCriarOuSalvarProduto = (e) => {
    e.preventDefault();
    if (!novoProduto.nome || !novoProduto.preco) return;

    if (produtoEditando) {
      setProdutos(
        produtos.map((p) =>
          p.id === produtoEditando.id
            ? {
                ...p,
                nome: novoProduto.nome,
                categoria: novoProduto.categoria || 'Geral',
                preco: Number(novoProduto.preco),
                unidade: novoProduto.unidade || 'un'
              }
            : p
        )
      );
      setProdutoEditando(null);
    } else {
      const prod = {
        id: Date.now(),
        nome: novoProduto.nome,
        categoria: novoProduto.categoria || 'Geral',
        preco: Number(novoProduto.preco),
        unidade: novoProduto.unidade || 'un'
      };
      setProdutos([...produtos, prod]);
    }
    setNovoProduto({ nome: '', categoria: 'Impressão Digital', preco: '', unidade: 'un' });
  };

  const handleCancelarEdicaoProduto = () => {
    setProdutoEditando(null);
    setNovoProduto({ nome: '', categoria: 'Impressão Digital', preco: '', unidade: 'un' });
  };

  const handleEditarProduto = (prod) => {
    setProdutoEditando(prod);
    setNovoProduto({
      nome: prod.nome,
      categoria: prod.categoria,
      preco: prod.preco,
      unidade: prod.unidade || 'un'
    });
  };

  const handleDeletarProduto = (id) => {
    setProdutos(produtos.filter((p) => p.id !== id));
    if (produtoEditando && produtoEditando.id === id) {
      setProdutoEditando(null);
      setNovoProduto({ nome: '', categoria: 'Impressão Digital', preco: '', unidade: 'un' });
    }
  };

  const handleQuitarComanda = (id) => {
    setComandas(comandas.map((c) => (c.id === id ? { ...c, pago: c.total, prazo: false, status: 'Entregue & Concluído' } : c)));
  };

  // Cálculos Financeiros
  const totalFaturamento = comandas.reduce((sum, c) => sum + Number(c.pago), 0);
  const totalContasAReceber = comandas.reduce((sum, c) => sum + (Number(c.total) - Number(c.pago)), 0);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16 w-full flex-1">
        {/* HEADER DA ÁREA ADMINISTRATIVA SIMPLIFICADA */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-800 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                SISTEMA SOFTCOM PDV
              </span>
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {caixaAberto ? t('cashOpen') : t('cashClosed')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mt-2">
              Área Administrativa · Frente de Caixa
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              Public Arte – Comunicação Visual · Gestor: Tércio Grassi
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/manual"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md transition"
            >
              <BookOpen size={16} />
              {t('btnSystemManual')}
            </Link>

            <button
              onClick={() => setCaixaAberto(!caixaAberto)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                caixaAberto
                  ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {caixaAberto ? <Lock size={15} /> : <Unlock size={15} />}
              {caixaAberto ? t('closeCashBtn') : t('openCashBtn')}
            </button>
          </div>
        </div>

        {/* NAVEGAÇÃO DE ABAS SIMPLIFICADA (APENAS 3 ABAS DIRETA E CLARA) */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
          {[
            { id: 'pdv', label: '🛒 Frente de Caixa (PDV)', icon: ShoppingCart },
            { id: 'produtos', label: '📦 Produtos & Serviços', icon: Package, count: produtos.length },
            { id: 'financeiro', label: '💰 Financeiro & Vendas', icon: DollarSign }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-800 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-900'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* --- ABA 1: FRENTE DE CAIXA / PDV ESTILO SOFTCOM --- */}
        {activeTab === 'pdv' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* PAINEL ESQUERDO: CLIENTE + BUSCA & CATÁLOGO DE PRODUTOS */}
            <div className="lg:col-span-7 space-y-6">
              {/* BANNER FRENTE DE CAIXA */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-2xl p-5 shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase font-extrabold tracking-wider text-amber-300">
                    ATENDIMENTO DE BALCÃO · MODELO SOFTCOM
                  </div>
                  <h2 className="text-xl font-extrabold">{t('pdvTitle')}</h2>
                  <p className="text-xs text-blue-100 mt-1">{t('pdvSubtitle')}</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl text-xs font-bold">
                  <Clock size={16} />
                  <span>{new Date().toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              {/* DADOS DO CLIENTE */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                    <UserIcon size={18} className="text-blue-800" />
                    {t('pdvCustomerSelect')}
                  </h2>
                  <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    ⚡ Venda sem Controle de Estoque
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      {t('lblClientName')}
                    </label>
                    <input
                      type="text"
                      value={pdvCliente}
                      onChange={(e) => setPdvCliente(e.target.value)}
                      placeholder={t('pdvCustomerPlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      {t('lblClientPhone')}
                    </label>
                    <input
                      type="text"
                      value={pdvTelefone}
                      onChange={(e) => setPdvTelefone(e.target.value)}
                      placeholder={t('pdvPhonePlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* BUSCA DE PRODUTOS & CATÁLOGO */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-3">
                  <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                    <Package size={18} className="text-blue-800" />
                    Lançamento de Produtos & Serviços
                  </h2>
                  <button
                    type="button"
                    onClick={handleAdicionarItemAvulso}
                    className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold px-3 py-1.5 rounded-xl border border-amber-300 transition flex items-center gap-1 shadow-sm"
                  >
                    <Plus size={14} />
                    {t('pdvAddCustomItem')}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={pdvSearchQuery}
                    onChange={(e) => setPdvSearchQuery(e.target.value)}
                    placeholder={t('pdvProductSearch')}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-sm"
                  />
                  <Package size={16} className="absolute left-3 top-3 text-gray-400" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                  {produtos
                    .filter((p) => p.nome.toLowerCase().includes(pdvSearchQuery.toLowerCase()))
                    .map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => handleAdicionarAoCarrinho(prod)}
                        className="p-3 border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 rounded-xl cursor-pointer transition flex items-center justify-between group shadow-sm bg-white"
                      >
                        <div>
                          <div className="font-extrabold text-xs text-gray-900 group-hover:text-blue-900">
                            {prod.nome}
                          </div>
                          <div className="text-[11px] text-gray-500 mt-0.5">
                            {prod.categoria} · R$ {Number(prod.preco).toFixed(2)} / {prod.unidade || 'un'}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="bg-blue-800 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg group-hover:bg-blue-900 transition flex items-center gap-1"
                        >
                          <Plus size={13} /> Add
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* PAINEL DIREITO: CARRINHO + TOTAIS + FORMA DE PAGAMENTO + FINALIZAR */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b pb-3 mb-3">
                    <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                      <ShoppingCart size={18} className="text-blue-800" />
                      {t('pdvCartTitle')} ({pdvCarrinho.length})
                    </h2>
                    {pdvCarrinho.length > 0 && (
                      <button
                        onClick={() => setPdvCarrinho([])}
                        className="text-[11px] text-red-600 hover:underline font-bold"
                      >
                        Limpar Carrinho
                      </button>
                    )}
                  </div>

                  {pdvCarrinho.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 text-xs">
                      <ShoppingCart size={32} className="mx-auto mb-2 opacity-30 text-blue-800" />
                      {t('pdvEmptyCart')}
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                      {pdvCarrinho.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs"
                        >
                          <div className="flex-1 pr-2">
                            <div className="font-bold text-gray-900">{item.produto}</div>
                            <div className="text-[11px] text-gray-500">
                              R$ {item.unit.toFixed(2)} x {item.qtd} ={' '}
                              <strong className="text-blue-900">R$ {item.total.toFixed(2)}</strong>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleAlterarQtdCarrinho(index, -1)}
                              className="w-6 h-6 bg-white border border-gray-300 hover:bg-gray-200 text-gray-700 font-bold rounded flex items-center justify-center text-xs"
                            >
                              -
                            </button>
                            <span className="font-extrabold text-xs w-4 text-center">{item.qtd}</span>
                            <button
                              type="button"
                              onClick={() => handleAlterarQtdCarrinho(index, 1)}
                              className="w-6 h-6 bg-white border border-gray-300 hover:bg-gray-200 text-gray-700 font-bold rounded flex items-center justify-center text-xs"
                            >
                              +
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAlterarQtdCarrinho(index, -item.qtd)}
                              className="text-red-500 hover:text-red-700 p-1 ml-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 space-y-3 mt-4">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{t('pdvSubtotal')}</span>
                    <span className="font-bold">R$ {pdvSubtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-gray-600">{t('pdvDiscount')}</span>
                    <input
                      type="number"
                      step="0.01"
                      value={pdvDesconto}
                      onChange={(e) => setPdvDesconto(e.target.value)}
                      placeholder="0.00"
                      className="w-24 text-right px-2 py-1 border border-gray-300 rounded-lg text-xs font-bold focus:ring-1 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="bg-blue-900 text-white p-3.5 rounded-xl flex items-center justify-between shadow-md">
                    <span className="text-xs font-bold uppercase tracking-wider">{t('pdvTotalToPay')}</span>
                    <span className="text-2xl font-black text-amber-300">R$ {pdvTotalFinal.toFixed(2)}</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      {t('pdvPaymentMethod')}
                    </label>
                    <select
                      value={pdvFormaPagamento}
                      onChange={(e) => setPdvFormaPagamento(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-bold text-blue-900 focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                    >
                      <option value="PIX">⚡ PIX (Transferência Instantânea)</option>
                      <option value="Cartão de Crédito">💳 Cartão de Crédito</option>
                      <option value="Cartão de Débito">💳 Cartão de Débito</option>
                      <option value="Dinheiro">💵 Dinheiro (Espécie)</option>
                      <option value="A Prazo">📝 A Prazo (Fiado / Convênio)</option>
                    </select>
                  </div>

                  {pdvFormaPagamento === 'Dinheiro' && (
                    <div className="grid grid-cols-2 gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs">
                      <div>
                        <label className="block text-[10px] font-bold text-amber-900 uppercase">
                          {t('pdvCashReceived')}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={pdvValorRecebido}
                          onChange={(e) => setPdvValorRecebido(e.target.value)}
                          placeholder={pdvTotalFinal.toFixed(2)}
                          className="w-full px-2 py-1 border border-amber-300 rounded text-xs font-bold bg-white"
                        />
                      </div>
                      <div className="flex flex-col justify-center text-right">
                        <span className="text-[10px] text-amber-800 font-bold uppercase">{t('pdvChange')}</span>
                        <span className="text-base font-black text-emerald-700">R$ {pdvTroco.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  {pdvFormaPagamento === 'A Prazo' && (
                    <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-amber-900 uppercase">
                          {t('pdvDownPayment')}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={pdvEntrada}
                          onChange={(e) => setPdvEntrada(e.target.value)}
                          placeholder="0.00"
                          className="w-24 text-right px-2 py-1 border border-amber-300 rounded text-xs font-bold bg-white"
                        />
                      </div>
                      <div className="flex justify-between text-[11px] font-extrabold text-amber-900 pt-1 border-t border-amber-200">
                        <span>{t('pdvBalanceDue')}</span>
                        <span className="text-red-700">
                          R$ {Math.max(0, pdvTotalFinal - (Number(pdvEntrada) || 0)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleFinalizarVendaPDV}
                    disabled={pdvCarrinho.length === 0}
                    className={`w-full py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition ${
                      pdvCarrinho.length > 0
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={18} />
                    {t('pdvFinalizeSaleBtn')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ABA 2: PRODUTOS & SERVIÇOS --- */}
        {activeTab === 'produtos' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between text-xs text-blue-900 font-bold">
              <div className="flex items-center gap-2">
                <Package size={18} className="text-blue-700" />
                <span>⚡ Cadastro simplificado de produtos & serviços. Sem necessidade ou trava de controle de quantidade de estoque.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* FORMULARIO CADASTRAR/EDITAR PRODUTO */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit">
                <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  {produtoEditando ? <Edit2 size={20} className="text-blue-800" /> : <Plus size={20} className="text-blue-800" />}
                  {produtoEditando ? 'Alterar / Editar Produto' : 'Cadastrar Produto / Serviço'}
                </h2>

                <form onSubmit={handleCriarOuSalvarProduto} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Nome do Produto / Serviço *
                    </label>
                    <input
                      type="text"
                      required
                      value={novoProduto.nome}
                      onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
                      placeholder="Ex: Banner Vinil 440g"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Preço Unitário (R$) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={novoProduto.preco}
                        onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
                        placeholder="Ex: 45.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Unidade
                      </label>
                      <select
                        value={novoProduto.unidade}
                        onChange={(e) => setNovoProduto({ ...novoProduto, unidade: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                      >
                        <option value="un">Unidade (un)</option>
                        <option value="m²">Metro Quadrado (m²)</option>
                        <option value="pacote">Pacote</option>
                        <option value="milheiro">Milheiro</option>
                        <option value="serviço">Serviço</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Categoria
                    </label>
                    <input
                      type="text"
                      value={novoProduto.categoria}
                      onChange={(e) => setNovoProduto({ ...novoProduto, categoria: e.target.value })}
                      placeholder="Ex: Banners & Lonas"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <button
                      type="submit"
                      className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
                    >
                      {produtoEditando ? (
                        <>
                          <Save size={16} /> Salvar Alterações
                        </>
                      ) : (
                        <>
                          <Plus size={16} /> Salvar no Catálogo
                        </>
                      )}
                    </button>

                    {produtoEditando && (
                      <button
                        type="button"
                        onClick={handleCancelarEdicaoProduto}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 rounded-xl text-xs transition"
                      >
                        Cancelar Edição
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* TABELA DE PRODUTOS */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Catálogo de Produtos & Serviços ({produtos.length})
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                      <tr>
                        <th className="p-3">Nome</th>
                        <th className="p-3">Categoria</th>
                        <th className="p-3">Unidade</th>
                        <th className="p-3">Preço Unitário</th>
                        <th className="p-3 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {produtos.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/80 transition">
                          <td className="p-3 font-semibold text-gray-800">{p.nome}</td>
                          <td className="p-3 text-gray-500">{p.categoria}</td>
                          <td className="p-3 text-gray-600 font-medium">{p.unidade || 'un'}</td>
                          <td className="p-3 font-bold text-emerald-700">R$ {p.preco.toFixed(2)}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleEditarProduto(p)}
                              className="text-blue-600 hover:text-blue-800 p-1 mr-2 transition"
                              title="Editar Produto"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeletarProduto(p.id)}
                              className="text-red-500 hover:text-red-700 p-1 transition"
                              title="Excluir Produto"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ABA 3: FINANCEIRO & VENDAS --- */}
        {activeTab === 'financeiro' && (
          <div className="space-y-6">
            {/* CARDS METRICAS FINANCEIRAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase">Faturamento Recebido</span>
                  <div className="text-2xl font-black text-emerald-600 mt-1">
                    R$ {totalFaturamento.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold mt-1 inline-block">
                    Vendas pagas confirmadas
                  </span>
                </div>
                <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700">
                  <DollarSign size={32} />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase">Contas a Receber (Fiado)</span>
                  <div className="text-2xl font-black text-amber-600 mt-1">
                    R$ {totalContasAReceber.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold mt-1 inline-block">
                    Saldo pendente de vendas a prazo
                  </span>
                </div>
                <div className="p-3 bg-amber-100 rounded-2xl text-amber-700">
                  <Clock size={32} />
                </div>
              </div>
            </div>

            {/* TABELA DE HISTÓRICO DE VENDAS */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Receipt size={20} className="text-blue-800" />
                Histórico de Vendas ({comandas.length})
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                    <tr>
                      <th className="p-3">Código</th>
                      <th className="p-3">Data/Hora</th>
                      <th className="p-3">Cliente</th>
                      <th className="p-3">Pagamento</th>
                      <th className="p-3">Total Venda</th>
                      <th className="p-3">Valor Pago</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {comandas.map((c) => {
                      const pendente = c.total - c.pago;
                      return (
                        <tr key={c.id} className="hover:bg-gray-50 transition">
                          <td className="p-3 font-bold text-blue-900">{c.id}</td>
                          <td className="p-3 text-gray-500 text-xs">{c.data}</td>
                          <td className="p-3 font-semibold text-gray-800">{c.cliente}</td>
                          <td className="p-3 font-medium text-gray-700">{c.formaPagamento}</td>
                          <td className="p-3 font-bold text-gray-900">R$ {c.total.toFixed(2)}</td>
                          <td className="p-3 font-bold text-emerald-600">R$ {c.pago.toFixed(2)}</td>
                          <td className="p-3">
                            {c.prazo && pendente > 0 ? (
                              <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                                Fiado (R$ {pendente.toFixed(2)})
                              </span>
                            ) : (
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                                <CheckCircle2 size={12} /> Pago
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => setCupomModal(c)}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-2.5 py-1 rounded text-xs transition"
                            >
                              Ver Recibo
                            </button>
                            {c.prazo && pendente > 0 && (
                              <button
                                onClick={() => handleQuitarComanda(c.id)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded text-xs transition shadow"
                              >
                                Quitar Fiado
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MODAL CUPOM NÃO FISCAL DE VENDA (SOFTCOM STYLE) */}
        {cupomModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-gray-300 font-mono text-xs text-gray-800 relative">
              <button
                onClick={() => setCupomModal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                ✕
              </button>

              <div className="text-center space-y-1 border-b-2 border-dashed border-gray-300 pb-3">
                <div className="flex justify-center mb-2">
                  <img src="/logo-publicarte.png" alt="Public Arte" className="h-10 object-contain" />
                </div>
                <h3 className="font-extrabold text-sm uppercase text-gray-900 tracking-wider">
                  PUBLIC ARTE – COMUNICAÇÃO VISUAL
                </h3>
                <p className="text-[10px] text-gray-500">Rua Ascendino Feitosa, 324 - Castelo Branco III</p>
                <p className="text-[10px] text-gray-500">João Pessoa - PB · Tel: (83) 98610-4153</p>
                <div className="mt-2 text-xs font-bold bg-gray-100 py-1 px-3 rounded inline-block">
                  COMPROVANTE NÃO FISCAL · {cupomModal.id}
                </div>
              </div>

              <div className="space-y-1 text-[11px] border-b border-dashed border-gray-300 pb-2">
                <div><strong>Data/Hora:</strong> {cupomModal.data}</div>
                <div><strong>Cliente:</strong> {cupomModal.cliente}</div>
                {cupomModal.telefone && <div><strong>Contato:</strong> {cupomModal.telefone}</div>}
                <div><strong>Forma de Pagto:</strong> {cupomModal.formaPagamento}</div>
              </div>

              <div className="space-y-2">
                <div className="font-bold border-b border-gray-200 pb-1 flex justify-between uppercase text-[10px] text-gray-500">
                  <span>QTD x ITEM</span>
                  <span>TOTAL (R$)</span>
                </div>
                {cupomModal.itens.map((it, i) => (
                  <div key={i} className="flex justify-between items-start text-[11px]">
                    <div>
                      <div className="font-bold text-gray-900">{it.produto}</div>
                      <div className="text-[10px] text-gray-500">{it.qtd} x R$ {it.unit.toFixed(2)}</div>
                    </div>
                    <div className="font-bold text-gray-900">R$ {it.total.toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-dashed border-gray-300 pt-3 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ {(cupomModal.subtotal || cupomModal.total).toFixed(2)}</span>
                </div>
                {cupomModal.desconto > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Desconto:</span>
                    <span>- R$ {cupomModal.desconto.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-blue-900 border-t border-gray-200 pt-1">
                  <span>TOTAL PAGO:</span>
                  <span>R$ {cupomModal.total.toFixed(2)}</span>
                </div>

                {cupomModal.formaPagamento === 'Dinheiro' && (
                  <>
                    <div className="flex justify-between text-gray-600">
                      <span>Valor Recebido:</span>
                      <span>R$ {(cupomModal.valorRecebido || cupomModal.total).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-emerald-600">
                      <span>Troco:</span>
                      <span>R$ {(cupomModal.troco || 0).toFixed(2)}</span>
                    </div>
                  </>
                )}

                {cupomModal.prazo && (
                  <div className="bg-amber-50 p-2 rounded text-amber-900 font-bold text-[10px] mt-2">
                    ⚠️ Venda a Prazo / Saldo Restante: R$ {(cupomModal.total - cupomModal.pago).toFixed(2)}
                  </div>
                )}
              </div>

              <div className="text-center text-[10px] text-gray-400 pt-2 border-t border-gray-100">
                Obrigado pela preferência! · Public Arte
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-blue-800 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 hover:bg-blue-900 transition"
                >
                  <Printer size={15} /> {t('pdvPrintReceipt')}
                </button>
                <button
                  onClick={() => {
                    let text = `*PUBLIC ARTE - COMPROVANTE DE VENDA ${cupomModal.id}*\n`;
                    text += `*Cliente:* ${cupomModal.cliente}\n`;
                    text += `*Data:* ${cupomModal.data}\n\n`;
                    text += `*ITENS:*\n`;
                    cupomModal.itens.forEach((it) => {
                      text += `• ${it.qtd}x ${it.produto} - R$ ${it.total.toFixed(2)}\n`;
                    });
                    text += `\n*TOTAL:* R$ ${cupomModal.total.toFixed(2)}\n`;
                    text += `*Forma de Pagamento:* ${cupomModal.formaPagamento}\n\n`;
                    text += `Obrigado pela preferência!`;
                    window.open(`https://wa.me/55${(cupomModal.telefone || '').replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="bg-emerald-600 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center justify-center gap-1 hover:bg-emerald-700 transition"
                >
                  <Send size={15} /> WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
