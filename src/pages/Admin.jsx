import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import {
  LayoutDashboard,
  ShoppingCart,
  FileSpreadsheet,
  Package,
  DollarSign,
  Smartphone,
  Plus,
  Trash2,
  Printer,
  Send,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Boxes,
  Lock,
  Unlock,
  BookOpen,
  Image as ImageIcon,
  Edit2,
  ExternalLink,
  Save,
  User as UserIcon
} from 'lucide-react';

export default function Admin() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('pdv');

  // State: Frente de Caixa / PDV estilo Softcom
  const [pdvCliente, setPdvCliente] = useState('');
  const [pdvTelefone, setPdvTelefone] = useState('');
  const [pdvSearchQuery, setPdvSearchQuery] = useState('');
  const [pdvCarrinho, setPdvCarrinho] = useState([]);
  const [pdvDesconto, setPdvDesconto] = useState('');
  const [pdvFormaPagamento, setPdvFormaPagamento] = useState('PIX');
  const [pdvValorRecebido, setPdvValorRecebido] = useState('');
  const [pdvEntrada, setPdvEntrada] = useState('');
  const [cupomModal, setCupomModal] = useState(null);

  // State: Vendas / Comandas
  const [comandas, setComandas] = useState(() => {
    const local = localStorage.getItem('publicarte_comandas');
    return local ? JSON.parse(local) : [
      {
        id: 'CMD-101',
        cliente: 'Maria Silva',
        telefone: '(83) 99888-1122',
        itens: [{ produto: 'Banner de Vinil (1.5m x 1.0m)', qtd: 2, unit: 67.5, total: 135.0 }],
        total: 135.0,
        pago: 67.5,
        formaPagamento: 'PIX',
        status: 'Em Impressão',
        data: '2026-09-22 14:30',
        prazo: false
      },
      {
        id: 'CMD-102',
        cliente: 'João Souza (Mercadinho João)',
        telefone: '(83) 98765-4321',
        itens: [{ produto: 'Placa Metalon + Lona (2.0m x 1.0m)', qtd: 1, unit: 240.0, total: 240.0 }],
        total: 240.0,
        pago: 0.0,
        formaPagamento: 'A Prazo',
        status: 'Aguardando',
        data: '2026-09-22 15:10',
        prazo: true
      },
      {
        id: 'CMD-103',
        cliente: 'José Santos',
        telefone: '(83) 99111-2233',
        itens: [{ produto: 'Cartão de Visita 1.000un', qtd: 2, unit: 90.0, total: 180.0 }],
        total: 180.0,
        pago: 180.0,
        formaPagamento: 'Cartão de Crédito',
        status: 'Pronto para Retirada',
        data: '2026-09-21 10:15',
        prazo: false
      }
    ];
  });

  // State: Orçamentos
  const [orcamentos, setOrcamentos] = useState(() => {
    const local = localStorage.getItem('publicarte_orcamentos');
    return local ? JSON.parse(local) : [
      {
        id: 'ORC-501',
        cliente: 'Academia FitLife',
        contato: '(83) 98877-6655',
        itens: [
          { descricao: 'Adesivação de Parede Jateada', qtd: 1, valor: 350.0 },
          { descricao: 'Mão de Obra de Aplicação', qtd: 1, valor: 150.0 }
        ],
        total: 500.0,
        data: '2026-09-22',
        validade: '7 dias'
      }
    ];
  });

  // State: Produtos e Insumos
  const [produtos, setProdutos] = useState(() => {
    const local = localStorage.getItem('publicarte_produtos');
    return local ? JSON.parse(local) : [
      { id: 1, nome: 'Banner de Vinil 440g', tipo: 'Produto', categoria: 'Banners & Lonas', preco: 45.0, estoque: 25, min: 5 },
      { id: 2, nome: 'Adesivo Vinílico Brilho', tipo: 'Produto', categoria: 'Adesivos & Rótulos', preco: 40.0, estoque: 40, min: 10 },
      { id: 3, nome: 'Cartão de Visita 250g (1000un)', tipo: 'Produto', categoria: 'Gráfica Rápida', preco: 90.0, estoque: 15, min: 3 },
      { id: 4, nome: 'Lona Frontlit 440g (Rolo 50m)', tipo: 'Insumo', categoria: 'Matéria-Prima', preco: 450.0, estoque: 2, min: 3 },
      { id: 5, nome: 'Tinta Eco-Solvente Cyan 1L', tipo: 'Insumo', categoria: 'Suprimentos', preco: 180.0, estoque: 1, min: 2 },
      { id: 6, nome: 'Ilhós de Latão #0 (Pacote 1000un)', tipo: 'Insumo', categoria: 'Acabamento', preco: 35.0, estoque: 8, min: 2 }
    ];
  });

  // State: Gerenciador de Imagens / Mídias do Site
  const [midias, setMidias] = useState(() => {
    const local = localStorage.getItem('publicarte_midias');
    const items = local ? JSON.parse(local) : [
      {
        id: 1,
        titulo: 'Logo Oficial Public Arte',
        categoria: 'Logotipos & Marcas',
        url: '/logo-publicarte.png'
      },
      {
        id: 3,
        titulo: 'Banner Banners & Lonas',
        categoria: 'Especialidades',
        url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=60'
      },
      {
        id: 4,
        titulo: 'Adesivos Vinílicos Recorte',
        categoria: 'Especialidades',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60'
      },
      {
        id: 5,
        titulo: 'Placa em Metalon com Lona',
        categoria: 'Especialidades',
        url: 'https://images.unsplash.com/photo-1542744094-3a3172720449?w=500&auto=format&fit=crop&q=60'
      }
    ];
    return items.filter((i) => !i.titulo?.toLowerCase().includes('helpus') && !i.url?.toLowerCase().includes('helpus'));
  });

  const [novaMidia, setNovaMidia] = useState({
    titulo: '',
    categoria: 'Especialidades',
    url: ''
  });

  const [midiaEditando, setMidiaEditando] = useState(null);

  // State: Caixa
  const [caixaAberto, setCaixaAberto] = useState(true);

  // Form states
  const [novaComanda, setNovaComanda] = useState({
    cliente: '',
    telefone: '',
    produtoNome: 'Banner de Vinil 440g',
    qtd: 1,
    pago: '',
    formaPagamento: 'PIX',
    prazo: false
  });

  const [novoOrcamento, setNovoOrcamento] = useState({
    cliente: '',
    contato: '',
    itemDesc: '',
    itemValor: '',
    maoDeObra: ''
  });

  const [orcamentoModal, setOrcamentoModal] = useState(null);

  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    tipo: 'Produto',
    categoria: 'Impressão Digital',
    preco: '',
    estoque: '',
    min: '5'
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('publicarte_comandas', JSON.stringify(comandas));
  }, [comandas]);

  useEffect(() => {
    localStorage.setItem('publicarte_orcamentos', JSON.stringify(orcamentos));
  }, [orcamentos]);

  useEffect(() => {
    localStorage.setItem('publicarte_produtos', JSON.stringify(produtos));
  }, [produtos]);

  useEffect(() => {
    localStorage.setItem('publicarte_midias', JSON.stringify(midias));
  }, [midias]);

  // Cálculos financeiros
  const totalFaturamento = comandas.reduce((sum, c) => sum + Number(c.pago), 0);
  const totalContasAReceber = comandas.reduce((sum, c) => sum + (Number(c.total) - Number(c.pago)), 0);
  const totalOrcamentos = orcamentos.length;
  const estoqueCritico = produtos.filter((p) => p.estoque <= p.min);

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

  // Handlers Mídias
  const handleCriarMidia = (e) => {
    e.preventDefault();
    if (!novaMidia.titulo || !novaMidia.url) return;

    const item = {
      id: Date.now(),
      titulo: novaMidia.titulo,
      categoria: novaMidia.categoria,
      url: novaMidia.url
    };

    setMidias([item, ...midias]);
    setNovaMidia({ titulo: '', categoria: 'Especialidades', url: '' });
  };

  const handleSalvarEdicaoMidia = (e) => {
    e.preventDefault();
    if (!midiaEditando) return;

    setMidias(midias.map((m) => (m.id === midiaEditando.id ? midiaEditando : m)));
    setMidiaEditando(null);
  };

  const handleDeletarMidia = (id) => {
    setMidias(midias.filter((m) => m.id !== id));
  };

  // Handlers Comandas
  const handleCriarComanda = (e) => {
    e.preventDefault();
    const prodObj = produtos.find((p) => p.nome === novaComanda.produtoNome) || { preco: 50 };
    const valorTotal = Number(prodObj.preco) * Number(novaComanda.qtd);
    const valorPago = novaComanda.prazo ? 0 : Number(novaComanda.pago || valorTotal);

    const cmd = {
      id: `CMD-${100 + comandas.length + 1}`,
      cliente: novaComanda.cliente || 'Cliente Balcão',
      telefone: novaComanda.telefone || '(83) 90000-0000',
      itens: [{ produto: novaComanda.produtoNome, qtd: Number(novaComanda.qtd), unit: Number(prodObj.preco), total: valorTotal }],
      total: valorTotal,
      pago: valorPago,
      formaPagamento: novaComanda.formaPagamento,
      status: 'Aguardando',
      data: new Date().toLocaleString('pt-BR').slice(0, 16),
      prazo: novaComanda.prazo
    };

    setComandas([cmd, ...comandas]);
    setNovaComanda({
      cliente: '',
      telefone: '',
      produtoNome: 'Banner de Vinil 440g',
      qtd: 1,
      pago: '',
      formaPagamento: 'PIX',
      prazo: false
    });
  };

  const handleAtualizarStatus = (id, novoStatus) => {
    setComandas(comandas.map((c) => (c.id === id ? { ...c, status: novoStatus } : c)));
  };

  const handleQuitarComanda = (id) => {
    setComandas(comandas.map((c) => (c.id === id ? { ...c, pago: c.total, prazo: false } : c)));
  };

  // Handlers Orçamentos
  const handleCriarOrcamento = (e) => {
    e.preventDefault();
    const valItem = Number(novoOrcamento.itemValor) || 0;
    const valMaoObra = Number(novoOrcamento.maoDeObra) || 0;
    const itemsList = [
      { descricao: novoOrcamento.itemDesc || 'Serviço de Comunicação Visual', qtd: 1, valor: valItem }
    ];
    if (valMaoObra > 0) {
      itemsList.push({ descricao: 'Mão de Obra e Instalação', qtd: 1, valor: valMaoObra });
    }

    const totalCalc = itemsList.reduce((s, i) => s + i.valor, 0);

    const newOrc = {
      id: `ORC-${500 + orcamentos.length + 1}`,
      cliente: novoOrcamento.cliente,
      contato: novoOrcamento.contato,
      itens: itemsList,
      total: totalCalc,
      data: new Date().toISOString().slice(0, 10),
      validade: '7 dias'
    };

    setOrcamentos([newOrc, ...orcamentos]);
    setNovoOrcamento({ cliente: '', contato: '', itemDesc: '', itemValor: '', maoDeObra: '' });
  };

  const handleEnviarOrcamentoWhatsApp = (orc) => {
    let msg = `*PUBLIC ARTE - ORÇAMENTO ${orc.id}*\n`;
    msg += `*Cliente:* ${orc.cliente}\n`;
    msg += `*Data:* ${orc.data}\n\n`;
    msg += `*ITENS DO ORÇAMENTO:*\n`;
    orc.itens.forEach((it) => {
      msg += `• ${it.descricao}: R$ ${it.valor.toFixed(2)}\n`;
    });
    msg += `\n*TOTAL:* R$ ${orc.total.toFixed(2)}\n`;
    msg += `*Validade:* ${orc.validade}\n\n`;
    msg += `Public Arte – Comunicação Visual\n(83) 98610-4153`;

    window.open(`https://wa.me/55${orc.contato.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Handlers Produtos
  const handleCriarProduto = (e) => {
    e.preventDefault();
    const prod = {
      id: Date.now(),
      nome: novoProduto.nome,
      tipo: novoProduto.tipo,
      categoria: novoProduto.categoria,
      preco: Number(novoProduto.preco),
      estoque: Number(novoProduto.estoque),
      min: Number(novoProduto.min)
    };
    setProdutos([...produtos, prod]);
    setNovoProduto({ nome: '', tipo: 'Produto', categoria: 'Impressão Digital', preco: '', estoque: '', min: '5' });
  };

  const handleDeletarProduto = (id) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  const formatStatusText = (st) => {
    if (st === 'Aguardando') return t('statusPending');
    if (st === 'Em Impressão') return t('statusPrinting');
    if (st === 'Acabamento') return t('statusFinishing');
    if (st === 'Pronto para Retirada') return t('statusReady');
    if (st === 'Entregue') return t('statusDelivered');
    return st;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Header da Área Administrativa */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-800 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {t('adminBadgeSystem')}
              </span>
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {caixaAberto ? t('cashOpen') : t('cashClosed')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mt-2">
              {t('adminMainTitle')}
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              {t('adminMainSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* BOTÃO DO MANUAL DO SISTEMA */}
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

        {/* NAVEGAÇÃO DE ABAS */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
          {[
            { id: 'pdv', label: t('tabPdv'), icon: ShoppingCart },
            { id: 'dashboard', label: t('tabDashboard'), icon: LayoutDashboard },
            { id: 'comandas', label: t('tabComandas'), icon: Boxes, count: comandas.length },
            { id: 'orcamentos', label: t('tabOrcamentos'), icon: FileSpreadsheet, count: totalOrcamentos },
            { id: 'produtos', label: t('tabProdutos'), icon: Package, count: produtos.length },
            { id: 'midias', label: t('tabMidias'), icon: ImageIcon, count: midias.length },
            { id: 'financeiro', label: t('tabFinanceiro'), icon: DollarSign },
            { id: 'estoque', label: t('tabEstoque'), icon: Boxes, alert: estoqueCritico.length > 0 },
            { id: 'mobile', label: t('tabMobile'), icon: Smartphone }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-800 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-900'
                }`}
              >
                <Icon size={16} />
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
                {tab.alert && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* --- CONTEÚDO DA ABA PDV: FRENTE DE CAIXA / TELA DE VENDAS ESTILO SOFTCOM --- */}
        {activeTab === 'pdv' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* PAINEL ESQUERDO: CLIENTE + BUSCA & SELEÇÃO DE PRODUTOS */}
            <div className="lg:col-span-7 space-y-6">
              {/* CABEÇALHO DA TELA DE VENDAS */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-2xl p-5 shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase font-extrabold tracking-wider text-amber-300">
                    FRENTE DE CAIXA · MODELO SOFTCOM
                  </div>
                  <h2 className="text-xl font-extrabold">{t('pdvTitle')}</h2>
                  <p className="text-xs text-blue-100 mt-1">{t('pdvSubtitle')}</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl text-xs font-bold">
                  <Clock size={16} />
                  <span>{new Date().toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              {/* BLOCO CLIENTE */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                    <UserIcon size={18} className="text-blue-800" />
                    {t('pdvCustomerSelect')}
                  </h2>
                  <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    ⚡ Venda Rápida sem Trava de Estoque
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

              {/* BLOCO DE CATÁLOGO & ADIÇÃO DE PRODUTOS */}
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

                {/* CAMPO DE BUSCA */}
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

                {/* GRADE DE PRODUTOS DISPONÍVEIS */}
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
                            {prod.categoria} · R$ {Number(prod.preco).toFixed(2)}
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

            {/* PAINEL DIREITO: CARRINHO + DESCONTO + TOTAL + FORMA DE PAGAMENTO + FINALIZAR */}
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

                  {/* LISTA DO CARRINHO */}
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

                {/* TOTAIS E PAGAMENTO */}
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

                  {/* TOTAL FINAL A PAGAR */}
                  <div className="bg-blue-900 text-white p-3.5 rounded-xl flex items-center justify-between shadow-md">
                    <span className="text-xs font-bold uppercase tracking-wider">{t('pdvTotalToPay')}</span>
                    <span className="text-2xl font-black text-amber-300">R$ {pdvTotalFinal.toFixed(2)}</span>
                  </div>

                  {/* SELEÇÃO DA FORMA DE PAGAMENTO */}
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

                  {/* CÁLCULO DE TROCO PARA DINHEIRO */}
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

                  {/* SE FOR VENDA A PRAZO */}
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

                  {/* BOTÃO DE FINALIZAR VENDA */}
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

        {/* MODAL CUPOM NÃO FISCAL DE VENDA (ESTILO SOFTCOM PDV) */}
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
                  <span>R$ {cupomModal.subtotal.toFixed(2)}</span>
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
                      <span>R$ {cupomModal.valorRecebido.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-emerald-600">
                      <span>Troco:</span>
                      <span>R$ {cupomModal.troco.toFixed(2)}</span>
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
                    window.open(`https://wa.me/55${cupomModal.telefone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="bg-emerald-600 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center justify-center gap-1 hover:bg-emerald-700 transition"
                >
                  <Send size={15} /> WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- CONTEÚDO DA ABA 1: DASHBOARD --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* BANNER DO MANUAL DE ORIENTAÇÃO */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/10 rounded-xl">
                  <BookOpen size={28} />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">{t('dashboardBannerTitle')}</h3>
                  <p className="text-blue-100 text-xs mt-0.5">
                    {t('dashboardBannerSubtitle')}
                  </p>
                </div>
              </div>
              <Link
                to="/manual"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs transition shadow whitespace-nowrap"
              >
                {t('btnOpenManual')}
              </Link>
            </div>

            {/* CARDS METRICAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">{t('metricRevenue')}</span>
                  <div className="text-2xl font-black text-emerald-600 mt-1">
                    R$ {totalFaturamento.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-gray-400 mt-1 block">{t('metricRevenueSub')}</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">{t('metricReceivables')}</span>
                  <div className="text-2xl font-black text-amber-600 mt-1">
                    R$ {totalContasAReceber.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-gray-400 mt-1 block">{t('metricReceivablesSub')}</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <DollarSign size={24} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">{t('metricActiveOrders')}</span>
                  <div className="text-2xl font-black text-blue-800 mt-1">{comandas.length}</div>
                  <span className="text-[11px] text-gray-400 mt-1 block">{t('metricActiveOrdersSub')}</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
                  <ShoppingCart size={24} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">{t('metricAlerts')}</span>
                  <div className="text-2xl font-black text-red-600 mt-1">{estoqueCritico.length}</div>
                  <span className="text-[11px] text-gray-400 mt-1 block">{t('metricAlertsSub')}</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <AlertTriangle size={24} />
                </div>
              </div>
            </div>

            {/* TABELA DE ÚLTIMAS COMANDAS NO DASHBOARD */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Clock size={18} className="text-blue-800" />
                  {t('recentOrdersTitle')}
                </h2>
                <button
                  onClick={() => setActiveTab('comandas')}
                  className="text-xs font-bold text-blue-800 hover:underline flex items-center gap-1"
                >
                  {t('btnSeeAll')} <ArrowUpRight size={14} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                    <tr>
                      <th className="p-3">{t('thOrder')}</th>
                      <th className="p-3">{t('thClient')}</th>
                      <th className="p-3">{t('thItems')}</th>
                      <th className="p-3">{t('thTotal')}</th>
                      <th className="p-3">{t('thPaid')}</th>
                      <th className="p-3">{t('thStatus')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {comandas.slice(0, 5).map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50/80 transition">
                        <td className="p-3 font-bold text-blue-900">{c.id}</td>
                        <td className="p-3">
                          <div className="font-semibold text-gray-800">{c.cliente}</div>
                          <div className="text-[11px] text-gray-400">{c.telefone}</div>
                        </td>
                        <td className="p-3 text-gray-600">
                          {c.itens.map((i) => `${i.qtd}x ${i.produto}`).join(', ')}
                        </td>
                        <td className="p-3 font-bold">R$ {c.total.toFixed(2)}</td>
                        <td className="p-3 text-emerald-600 font-semibold">R$ {c.pago.toFixed(2)}</td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              c.status === 'Pronto para Retirada'
                                ? 'bg-emerald-100 text-emerald-800'
                                : c.status === 'Em Impressão'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {formatStatusText(c.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- CONTEÚDO DA ABA GERENCIADOR DE IMAGENS --- */}
        {activeTab === 'midias' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* FORMULÁRIO DE NOVA IMAGEM */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit">
              <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Plus size={20} className="text-blue-800" />
                {t('newImageTitle')}
              </h2>

              <form onSubmit={handleCriarMidia} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('lblImageTitle')}
                  </label>
                  <input
                    type="text"
                    required
                    value={novaMidia.titulo}
                    onChange={(e) => setNovaMidia({ ...novaMidia, titulo: e.target.value })}
                    placeholder="Ex: Foto Fachada Loja Principal"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('lblImageLocation')}
                  </label>
                  <select
                    value={novaMidia.categoria}
                    onChange={(e) => setNovaMidia({ ...novaMidia, categoria: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                  >
                    <option value="Especialidades">Especialidades & Soluções</option>
                    <option value="Vitrine">Vitrine de Produtos</option>
                    <option value="Logotipos & Marcas">Logotipos & Marcas</option>
                    <option value="Banners Principais">Banners Principais</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('lblImageUrl')}
                  </label>
                  <input
                    type="url"
                    required
                    value={novaMidia.url}
                    onChange={(e) => setNovaMidia({ ...novaMidia, url: e.target.value })}
                    placeholder="https://exemplo.com/imagem.png ou /logo-publicarte.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                {/* Pré-visualização da Imagem */}
                {novaMidia.url && (
                  <div className="bg-gray-50 border p-2 rounded-xl text-center">
                    <span className="text-[10px] font-bold text-gray-400 block mb-1">{t('lblPreview')}</span>
                    <img
                      src={novaMidia.url}
                      alt="Preview"
                      className="max-h-32 mx-auto rounded-lg object-contain"
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> {t('btnAddImage')}
                </button>
              </form>
            </div>

            {/* GALERIA DE IMAGENS DO SITE */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center justify-between">
                <span>{t('galleryTitle')} ({midias.length})</span>
                <span className="text-xs text-gray-500 font-normal">
                  Altere ou remova imagens exibidas nas páginas
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {midias.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 space-y-3 flex flex-col justify-between hover:border-blue-300 transition"
                  >
                    {/* Imagem */}
                    <div className="h-36 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-100">
                      <img
                        src={item.url}
                        alt={item.titulo}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-blue-900 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow">
                        {item.categoria}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{item.titulo}</h3>
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">{item.url}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-700 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <ExternalLink size={14} /> {t('btnViewImage')}
                      </a>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setMidiaEditando(item)}
                          className="text-blue-700 hover:text-blue-900 p-1.5 bg-blue-50 rounded-lg text-xs font-bold flex items-center gap-1"
                        >
                          <Edit2 size={14} /> {t('btnEdit')}
                        </button>
                        <button
                          onClick={() => handleDeletarMidia(item.id)}
                          className="text-red-500 hover:text-red-700 p-1.5 bg-red-50 rounded-lg"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODAL DE EDIÇÃO DE IMAGEM */}
        {midiaEditando && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-gray-300 relative">
              <button
                onClick={() => setMidiaEditando(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold"
              >
                ✕
              </button>

              <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                <Edit2 size={18} /> {t('editImageTitle')}
              </h2>

              <form onSubmit={handleSalvarEdicaoMidia} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('lblImageTitle')}
                  </label>
                  <input
                    type="text"
                    required
                    value={midiaEditando.titulo}
                    onChange={(e) => setMidiaEditando({ ...midiaEditando, titulo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('lblImageLocation')}
                  </label>
                  <select
                    value={midiaEditando.categoria}
                    onChange={(e) => setMidiaEditando({ ...midiaEditando, categoria: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs bg-white"
                  >
                    <option value="Especialidades">Especialidades & Soluções</option>
                    <option value="Vitrine">Vitrine de Produtos</option>
                    <option value="Logotipos & Marcas">Logotipos & Marcas</option>
                    <option value="Banners Principais">Banners Principais</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('lblImageUrl')}
                  </label>
                  <input
                    type="url"
                    required
                    value={midiaEditando.url}
                    onChange={(e) => setMidiaEditando({ ...midiaEditando, url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setMidiaEditando(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
                  >
                    {t('btnCancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <Save size={14} /> {t('btnSaveEdit')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- CONTEÚDO DA ABA 2: VENDAS & COMANDAS --- */}
        {activeTab === 'comandas' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* FORMULÁRIO DE NOVA COMANDA */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit">
              <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Plus size={20} className="text-blue-800" />
                {t('newComandaTitle')}
              </h2>

              <form onSubmit={handleCriarComanda} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('lblClientName')}
                  </label>
                  <input
                    type="text"
                    required
                    value={novaComanda.cliente}
                    onChange={(e) => setNovaComanda({ ...novaComanda, cliente: e.target.value })}
                    placeholder="Ex: Maria Santos"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('lblClientPhone')}
                  </label>
                  <input
                    type="text"
                    value={novaComanda.telefone}
                    onChange={(e) => setNovaComanda({ ...novaComanda, telefone: e.target.value })}
                    placeholder="(83) 99999-0000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('lblSelectProduct')}
                  </label>
                  <select
                    value={novaComanda.produtoNome}
                    onChange={(e) => setNovaComanda({ ...novaComanda, produtoNome: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                  >
                    {produtos.map((p) => (
                      <option key={p.id} value={p.nome}>
                        {p.nome} - R$ {p.preco.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      {t('lblQuantity')}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={novaComanda.qtd}
                      onChange={(e) => setNovaComanda({ ...novaComanda, qtd: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      {t('lblInitialPayment')}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      disabled={novaComanda.prazo}
                      value={novaComanda.pago}
                      onChange={(e) => setNovaComanda({ ...novaComanda, pago: e.target.value })}
                      placeholder="Total ou Sinal"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('lblPaymentMethod')}
                  </label>
                  <select
                    value={novaComanda.formaPagamento}
                    onChange={(e) => setNovaComanda({ ...novaComanda, formaPagamento: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                  >
                    <option value="PIX">PIX</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Cartão de Débito">Cartão de Débito</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="A Prazo">A Prazo / Fiado</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="chkPrazo"
                    checked={novaComanda.prazo}
                    onChange={(e) => setNovaComanda({ ...novaComanda, prazo: e.target.checked })}
                    className="rounded text-blue-800"
                  />
                  <label htmlFor="chkPrazo" className="text-xs font-semibold text-gray-700">
                    {t('lblCreditSale')}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> {t('btnOpenComanda')}
                </button>
              </form>
            </div>

            {/* LISTAGEM DE COMANDAS ATIVAS */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center justify-between">
                <span>{t('openComandasTitle')} ({comandas.length})</span>
                <span className="text-xs text-gray-500 font-normal">
                  {t('comandaSubInfo')}
                </span>
              </h2>

              <div className="space-y-3">
                {comandas.map((c) => {
                  const restante = c.total - c.pago;
                  return (
                    <div
                      key={c.id}
                      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 hover:border-blue-300 transition space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-2 gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-extrabold text-blue-900 text-sm">{c.id}</span>
                          <span className="text-xs font-semibold text-gray-700">{c.cliente}</span>
                          <span className="text-[11px] text-gray-400">{c.data}</span>
                        </div>

                        <select
                          value={c.status}
                          onChange={(e) => handleAtualizarStatus(c.id, e.target.value)}
                          className="text-xs font-bold px-3 py-1 rounded-full border border-gray-300 bg-gray-50 focus:outline-none"
                        >
                          <option value="Aguardando">{t('statusPending')}</option>
                          <option value="Em Impressão">{t('statusPrinting')}</option>
                          <option value="Acabamento">{t('statusFinishing')}</option>
                          <option value="Pronto para Retirada">{t('statusReady')}</option>
                          <option value="Entregue">{t('statusDelivered')}</option>
                        </select>
                      </div>

                      <div className="text-xs text-gray-600 flex flex-wrap justify-between gap-2">
                        <div>
                          <strong>{t('thItems')}:</strong>{' '}
                          {c.itens.map((i) => `${i.qtd}x ${i.produto}`).join(', ')}
                        </div>
                        <div>
                          <strong>{t('lblPaymentMethod')}:</strong> {c.formaPagamento}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t text-xs">
                        <div className="flex items-center gap-4">
                          <div>
                            {t('thTotal')}: <strong className="text-gray-900">R$ {c.total.toFixed(2)}</strong>
                          </div>
                          <div>
                            {t('thPaid')}:{' '}
                            <strong className="text-emerald-600">R$ {c.pago.toFixed(2)}</strong>
                          </div>
                          {restante > 0 && (
                            <div className="text-amber-600 font-bold">
                              {t('thPending')}: R$ {restante.toFixed(2)}
                            </div>
                          )}
                        </div>

                        {restante > 0 && (
                          <button
                            onClick={() => handleQuitarComanda(c.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded-lg text-[11px] transition shadow"
                          >
                            {t('btnMarkPaid')}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* --- CONTEÚDO DA ABA 3: ORÇAMENTOS --- */}
        {activeTab === 'orcamentos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CRIAR ORÇAMENTO */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit">
              <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <FileSpreadsheet size={20} className="text-blue-800" />
                {t('newQuoteTitle')}
              </h2>

              <form onSubmit={handleCriarOrcamento} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('lblCompany')}
                  </label>
                  <input
                    type="text"
                    required
                    value={novoOrcamento.cliente}
                    onChange={(e) => setNovoOrcamento({ ...novoOrcamento, cliente: e.target.value })}
                    placeholder="Ex: Farmácia Popular"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('lblClientPhone')}
                  </label>
                  <input
                    type="text"
                    required
                    value={novoOrcamento.contato}
                    onChange={(e) => setNovoOrcamento({ ...novoOrcamento, contato: e.target.value })}
                    placeholder="(83) 98888-0000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('lblDescription')}
                  </label>
                  <input
                    type="text"
                    value={novoOrcamento.itemDesc}
                    onChange={(e) => setNovoOrcamento({ ...novoOrcamento, itemDesc: e.target.value })}
                    placeholder="Ex: Fachada ACM 3m x 1m com letras em acrílico"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      {t('lblMaterialCost')}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={novoOrcamento.itemValor}
                      onChange={(e) => setNovoOrcamento({ ...novoOrcamento, itemValor: e.target.value })}
                      placeholder="Ex: 850.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      {t('lblLaborCost')}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={novoOrcamento.maoDeObra}
                      onChange={(e) => setNovoOrcamento({ ...novoOrcamento, maoDeObra: e.target.value })}
                      placeholder="Ex: 250.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> {t('btnEmitQuote')}
                </button>
              </form>
            </div>

            {/* LISTA DE ORÇAMENTOS GERADOS */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-gray-800">
                {t('issuedQuotesTitle')} ({orcamentos.length})
              </h2>

              <div className="space-y-3">
                {orcamentos.map((orc) => (
                  <div
                    key={orc.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 hover:border-blue-300 transition space-y-3"
                  >
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <span className="font-extrabold text-blue-900 text-sm mr-2">{orc.id}</span>
                        <span className="font-bold text-gray-800 text-xs">{orc.cliente}</span>
                        <span className="text-gray-400 text-[11px] ml-2">({orc.contato})</span>
                      </div>
                      <span className="text-xs text-gray-500">{orc.data}</span>
                    </div>

                    <div className="text-xs text-gray-600 space-y-1">
                      {orc.itens.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>• {it.descricao}</span>
                          <span className="font-semibold">R$ {it.valor.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm font-black text-emerald-700">
                        {t('thTotal')}: R$ {orc.total.toFixed(2)}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setOrcamentoModal(orc)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition"
                        >
                          <Printer size={14} /> {t('btnPrintQuote')}
                        </button>

                        <button
                          onClick={() => handleEnviarOrcamentoWhatsApp(orc)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition shadow"
                        >
                          <Send size={14} /> {t('btnWhatsAppQuote')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODAL ESPELHO DE ORÇAMENTO (PARA IMPRESSÃO) */}
        {orcamentoModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-6 relative border border-gray-300">
              <button
                onClick={() => setOrcamentoModal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold"
              >
                ✕
              </button>

              <div className="border-b pb-4 text-center">
                <div className="text-xl font-black text-blue-900 uppercase tracking-wide">
                  {t('quoteModalTitle')}
                </div>
                <div className="text-xs text-gray-500">
                  Rua Ascendino Feitosa, 324 - Castelo Branco III · João Pessoa - PB · (83) 98610-4153
                </div>
                <div className="mt-3 inline-block bg-blue-100 text-blue-900 font-extrabold text-xs px-3 py-1 rounded-full">
                  {t('quoteModalNo')} {orcamentoModal.id}
                </div>
              </div>

              <div className="grid grid-cols-2 text-xs gap-2 bg-gray-50 p-3 rounded-xl">
                <div><strong>{t('thClient')}:</strong> {orcamentoModal.cliente}</div>
                <div><strong>{t('thPhone')}:</strong> {orcamentoModal.contato}</div>
                <div><strong>Data:</strong> {orcamentoModal.data}</div>
                <div><strong>Validade:</strong> {orcamentoModal.validade}</div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase text-gray-700 border-b pb-1">
                  {t('quoteModalSpec')}
                </div>
                {orcamentoModal.itens.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-xs py-1 border-b border-gray-100">
                    <span>{it.descricao}</span>
                    <span className="font-bold text-gray-900">R$ {it.valor.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <span className="text-xs font-bold text-emerald-800 uppercase">{t('quoteModalProposedTotal')}</span>
                <span className="text-2xl font-black text-emerald-700">R$ {orcamentoModal.total.toFixed(2)}</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="bg-blue-800 text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-blue-900 transition"
                >
                  <Printer size={15} /> {t('btnPrintSavePdf')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- CONTEÚDO DA ABA 4: PRODUTOS & INSUMOS --- */}
        {activeTab === 'produtos' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between text-xs text-blue-900 font-bold">
              <div className="flex items-center gap-2">
                <Package size={18} className="text-blue-700" />
                <span>⚡ {t('noStockLimitNotice')} Os produtos cadastrados aqui estarão prontos para venda direta no PDV Frente de Caixa.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CADASTRAR NOVO PRODUTO */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit">
              <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Plus size={20} className="text-blue-800" />
                {t('newProductTitle')}
              </h2>

              <form onSubmit={handleCriarProduto} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('lblItemName')}
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
                      {t('lblItemType')}
                    </label>
                    <select
                      value={novoProduto.tipo}
                      onChange={(e) => setNovoProduto({ ...novoProduto, tipo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                    >
                      <option value="Produto">{t('optSaleProduct')}</option>
                      <option value="Insumo">{t('optSupplyItem')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      {t('lblItemPrice')}
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
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('lblCategory')}
                  </label>
                  <input
                    type="text"
                    value={novoProduto.categoria}
                    onChange={(e) => setNovoProduto({ ...novoProduto, categoria: e.target.value })}
                    placeholder="Ex: Banners & Lonas"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      {t('lblStockQty')}
                    </label>
                    <input
                      type="number"
                      required
                      value={novoProduto.estoque}
                      onChange={(e) => setNovoProduto({ ...novoProduto, estoque: e.target.value })}
                      placeholder="20"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      {t('lblMinStock')}
                    </label>
                    <input
                      type="number"
                      value={novoProduto.min}
                      onChange={(e) => setNovoProduto({ ...novoProduto, min: e.target.value })}
                      placeholder="5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> {t('btnSaveCatalog')}
                </button>
              </form>
            </div>

            {/* TABELA DE PRODUTOS E INSUMOS */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-800">
                {t('catalogTitle')} ({produtos.length})
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                    <tr>
                      <th className="p-3">Item</th>
                      <th className="p-3">{t('thType')}</th>
                      <th className="p-3">{t('thCategory')}</th>
                      <th className="p-3">{t('thPrice')}</th>
                      <th className="p-3">{t('thStock')}</th>
                      <th className="p-3 text-right">{t('thActions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {produtos.map((p) => {
                      const isLow = p.estoque <= p.min;
                      return (
                        <tr key={p.id} className="hover:bg-gray-50/80 transition">
                          <td className="p-3 font-semibold text-gray-800">{p.nome}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                p.tipo === 'Produto'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-purple-100 text-purple-800'
                              }`}
                            >
                              {p.tipo}
                            </span>
                          </td>
                          <td className="p-3 text-gray-500">{p.categoria}</td>
                          <td className="p-3 font-bold text-emerald-700">R$ {p.preco.toFixed(2)}</td>
                          <td className="p-3">
                            <span className={`font-bold ${isLow ? 'text-red-600' : 'text-gray-700'}`}>
                              {p.estoque} un {isLow && t('alertLabel')}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeletarProduto(p.id)}
                              className="text-red-500 hover:text-red-700 p-1 transition"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* --- CONTEÚDO DA ABA 5: FINANCEIRO & FIADO --- */}
        {activeTab === 'financeiro' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <DollarSign size={20} className="text-emerald-600" />
                {t('receivablesTitle')}
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                    <tr>
                      <th className="p-3">{t('thOrder')}</th>
                      <th className="p-3">{t('thClient')}</th>
                      <th className="p-3">{t('thPhone')}</th>
                      <th className="p-3">{t('thTotal')}</th>
                      <th className="p-3">{t('thPaid')}</th>
                      <th className="p-3">{t('thPending')}</th>
                      <th className="p-3 text-right">{t('thActions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {comandas
                      .filter((c) => c.total > c.pago)
                      .map((c) => {
                        const pend = c.total - c.pago;
                        return (
                          <tr key={c.id} className="hover:bg-amber-50/50 transition">
                            <td className="p-3 font-bold text-blue-900">{c.id}</td>
                            <td className="p-3 font-semibold text-gray-800">{c.cliente}</td>
                            <td className="p-3 text-gray-500">{c.telefone}</td>
                            <td className="p-3 font-bold">R$ {c.total.toFixed(2)}</td>
                            <td className="p-3 text-emerald-600 font-semibold">R$ {c.pago.toFixed(2)}</td>
                            <td className="p-3 font-black text-amber-600">R$ {pend.toFixed(2)}</td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleQuitarComanda(c.id)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition shadow"
                              >
                                {t('btnMarkPaid')}
                              </button>
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

        {/* --- CONTEÚDO DA ABA 6: ESTOQUE --- */}
        {activeTab === 'estoque' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Boxes size={20} className="text-red-600" />
                  {t('stockControlTitle')}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t('stockControlSubtitle')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {produtos.map((p) => {
                const isLow = p.estoque <= p.min;
                return (
                  <div
                    key={p.id}
                    className={`p-4 rounded-2xl border ${
                      isLow ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
                    } flex flex-col justify-between`}
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400">{p.categoria}</span>
                      <h3 className="font-bold text-gray-800 text-sm mt-0.5">{p.nome}</h3>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t pt-3">
                      <div>
                        <span className="text-xs text-gray-500 block">{t('lblCurrentStock')}</span>
                        <span className={`text-lg font-black ${isLow ? 'text-red-600' : 'text-emerald-600'}`}>
                          {p.estoque} un
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-gray-500 block">{t('lblMinStockLimit')}</span>
                        <span className="text-sm font-bold text-gray-700">{p.min} un</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- CONTEÚDO DA ABA 7: SMARTPHONE POS --- */}
        {activeTab === 'mobile' && (
          <div className="max-w-md mx-auto bg-white rounded-3xl border-4 border-gray-800 shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="text-center border-b pb-3">
              <span className="text-[10px] font-extrabold uppercase bg-blue-100 text-blue-900 px-3 py-1 rounded-full">
                {t('posTitle')}
              </span>
              <h2 className="text-xl font-black text-gray-900 mt-2">{t('posSubtitle')}</h2>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-700 uppercase">
                {t('posQuickSelect')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {produtos.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setNovaComanda({ ...novaComanda, produtoNome: p.nome, cliente: 'Cliente Smartphone' });
                      setActiveTab('comandas');
                    }}
                    className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold text-left transition"
                  >
                    <div>{p.nome}</div>
                    <div className="text-emerald-600 text-sm mt-1">R$ {p.preco.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-3 text-center">
              <p className="text-xs text-gray-500">
                {t('posDescription')}
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
