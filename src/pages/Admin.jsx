import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
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
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  FileText,
  Boxes,
  Lock,
  Unlock,
  Building2,
  Phone,
  Calendar
} from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

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

  // State: Caixa
  const [caixaAberto, setCaixaAberto] = useState(true);
  const [saldoInicialCaixa, setSaldoInicialCaixa] = useState(150.0);

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

  // Cálculos financeiros
  const totalFaturamento = comandas.reduce((sum, c) => sum + Number(c.pago), 0);
  const totalContasAReceber = comandas.reduce((sum, c) => sum + (Number(c.total) - Number(c.pago)), 0);
  const totalOrcamentos = orcamentos.length;
  const estoqueCritico = produtos.filter((p) => p.estoque <= p.min);

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

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Header da Área Administrativa */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-800 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Sistema Eficiente
              </span>
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Caixa {caixaAberto ? 'Aberto' : 'Fechado'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mt-2">
              Área Administrativa & Gestão de Gráfica
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              Public Arte – Comunicação Visual · Controle de Vendas, Comandas, Orçamentos, Financeiro e Suprimentos
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setCaixaAberto(!caixaAberto)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                caixaAberto
                  ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {caixaAberto ? <Lock size={15} /> : <Unlock size={15} />}
              {caixaAberto ? 'Fechar Caixa' : 'Abrir Caixa'}
            </button>
          </div>
        </div>

        {/* NAVEGAÇÃO DE ABAS */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Painel Geral', icon: LayoutDashboard },
            { id: 'comandas', label: 'Vendas & Comandas', icon: ShoppingCart, count: comandas.length },
            { id: 'orcamentos', label: 'Orçamentos', icon: FileSpreadsheet, count: totalOrcamentos },
            { id: 'produtos', label: 'Produtos & Insumos', icon: Package, count: produtos.length },
            { id: 'financeiro', label: 'Financeiro & Fiado', icon: DollarSign },
            { id: 'estoque', label: 'Estoque & Alertas', icon: Boxes, alert: estoqueCritico.length > 0 },
            { id: 'mobile', label: 'Smartphone POS', icon: Smartphone }
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

        {/* --- CONTEÚDO DA ABA 1: DASHBOARD --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* CARDS METRICAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">Faturamento Recebido</span>
                  <div className="text-2xl font-black text-emerald-600 mt-1">
                    R$ {totalFaturamento.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-gray-400 mt-1 block">Lançamentos confirmados</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">Contas a Receber (Fiado)</span>
                  <div className="text-2xl font-black text-amber-600 mt-1">
                    R$ {totalContasAReceber.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-gray-400 mt-1 block">Vendas a prazo em aberto</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <DollarSign size={24} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">Comandas Ativas</span>
                  <div className="text-2xl font-black text-blue-800 mt-1">{comandas.length}</div>
                  <span className="text-[11px] text-gray-400 mt-1 block">Pedidos em produção</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
                  <ShoppingCart size={24} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">Alertas de Suprimentos</span>
                  <div className="text-2xl font-black text-red-600 mt-1">{estoqueCritico.length}</div>
                  <span className="text-[11px] text-gray-400 mt-1 block">Itens abaixo do estoque mínimo</span>
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
                  Últimos Pedidos & Comandas no Balcão
                </h2>
                <button
                  onClick={() => setActiveTab('comandas')}
                  className="text-xs font-bold text-blue-800 hover:underline flex items-center gap-1"
                >
                  Ver Todas <ArrowUpRight size={14} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                    <tr>
                      <th className="p-3">Comanda</th>
                      <th className="p-3">Cliente</th>
                      <th className="p-3">Itens</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Pago</th>
                      <th className="p-3">Status</th>
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
                            {c.status}
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

        {/* --- CONTEÚDO DA ABA 2: VENDAS & COMANDAS --- */}
        {activeTab === 'comandas' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* FORMULÁRIO DE NOVA COMANDA */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit">
              <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Plus size={20} className="text-blue-800" />
                Nova Comanda / Venda de Balcão
              </h2>

              <form onSubmit={handleCriarComanda} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Nome do Cliente *
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
                    Telefone / WhatsApp
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
                    Produto Selecionado
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
                      Quantidade
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
                      Pagamento Inicial (R$)
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
                    Forma de Pagamento
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
                    Venda a Prazo (Lançar em Contas a Receber)
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Abrir Comanda de Produção
                </button>
              </form>
            </div>

            {/* LISTAGEM DE COMANDAS ATIVAS */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center justify-between">
                <span>Comandas em Aberto e Produção ({comandas.length})</span>
                <span className="text-xs text-gray-500 font-normal">
                  Filtre ou atualize o status dos trabalhos
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
                          <option value="Aguardando">Aguardando Produção</option>
                          <option value="Em Impressão">Em Impressão / Recorte</option>
                          <option value="Acabamento">Em Acabamento</option>
                          <option value="Pronto para Retirada">Pronto para Retirada</option>
                          <option value="Entregue">Entregue & Concluído</option>
                        </select>
                      </div>

                      <div className="text-xs text-gray-600 flex flex-wrap justify-between gap-2">
                        <div>
                          <strong>Itens:</strong>{' '}
                          {c.itens.map((i) => `${i.qtd}x ${i.produto}`).join(', ')}
                        </div>
                        <div>
                          <strong>Forma Pgto:</strong> {c.formaPagamento}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t text-xs">
                        <div className="flex items-center gap-4">
                          <div>
                            Total: <strong className="text-gray-900">R$ {c.total.toFixed(2)}</strong>
                          </div>
                          <div>
                            Pago:{' '}
                            <strong className="text-emerald-600">R$ {c.pago.toFixed(2)}</strong>
                          </div>
                          {restante > 0 && (
                            <div className="text-amber-600 font-bold">
                              Pendente: R$ {restante.toFixed(2)}
                            </div>
                          )}
                        </div>

                        {restante > 0 && (
                          <button
                            onClick={() => handleQuitarComanda(c.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded-lg text-[11px] transition shadow"
                          >
                            Dar Baixa no Pagamento
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
                Gerar Novo Orçamento
              </h2>

              <form onSubmit={handleCriarOrcamento} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Cliente / Empresa *
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
                    Telefone / WhatsApp *
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
                    Descrição do Material / Serviço
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
                      Valor Material (R$)
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
                      Mão de Obra (R$)
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
                  <Plus size={16} /> Emitir Orçamento
                </button>
              </form>
            </div>

            {/* LISTA DE ORÇAMENTOS GERADOS */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-gray-800">
                Orçamentos Emitidos ({orcamentos.length})
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
                        Total: R$ {orc.total.toFixed(2)}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setOrcamentoModal(orc)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition"
                        >
                          <Printer size={14} /> Espelho / Imprimir
                        </button>

                        <button
                          onClick={() => handleEnviarOrcamentoWhatsApp(orc)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition shadow"
                        >
                          <Send size={14} /> WhatsApp
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
                  PUBLIC ARTE – COMUNICAÇÃO VISUAL
                </div>
                <div className="text-xs text-gray-500">
                  Rua Ascendino Feitosa, 324 - Castelo Branco III · João Pessoa - PB · (83) 98610-4153
                </div>
                <div className="mt-3 inline-block bg-blue-100 text-blue-900 font-extrabold text-xs px-3 py-1 rounded-full">
                  ORÇAMENTO Nº {orcamentoModal.id}
                </div>
              </div>

              <div className="grid grid-cols-2 text-xs gap-2 bg-gray-50 p-3 rounded-xl">
                <div><strong>Cliente:</strong> {orcamentoModal.cliente}</div>
                <div><strong>Contato:</strong> {orcamentoModal.contato}</div>
                <div><strong>Data:</strong> {orcamentoModal.data}</div>
                <div><strong>Validade:</strong> {orcamentoModal.validade}</div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase text-gray-700 border-b pb-1">
                  Especificação dos Itens & Serviços
                </div>
                {orcamentoModal.itens.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-xs py-1 border-b border-gray-100">
                    <span>{it.descricao}</span>
                    <span className="font-bold text-gray-900">R$ {it.valor.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <span className="text-xs font-bold text-emerald-800 uppercase">Valor Total Proposto:</span>
                <span className="text-2xl font-black text-emerald-700">R$ {orcamentoModal.total.toFixed(2)}</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="bg-blue-800 text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-blue-900 transition"
                >
                  <Printer size={15} /> Imprimir / Salvar PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- CONTEÚDO DA ABA 4: PRODUTOS & INSUMOS --- */}
        {activeTab === 'produtos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CADASTRAR NOVO PRODUTO */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit">
              <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Plus size={20} className="text-blue-800" />
                Cadastrar Produto ou Insumo
              </h2>

              <form onSubmit={handleCriarProduto} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Nome do Item *
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
                      Tipo
                    </label>
                    <select
                      value={novoProduto.tipo}
                      onChange={(e) => setNovoProduto({ ...novoProduto, tipo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                    >
                      <option value="Produto">Produto de Venda</option>
                      <option value="Insumo">Insumo de Produção</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Preço (R$)
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Qtd Estoque
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
                      Estoque Mínimo
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
                  <Plus size={16} /> Salvar no Catálogo
                </button>
              </form>
            </div>

            {/* TABELA DE PRODUTOS E INSUMOS */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-800">
                Catálogo de Produtos & Insumos ({produtos.length})
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                    <tr>
                      <th className="p-3">Item</th>
                      <th className="p-3">Tipo</th>
                      <th className="p-3">Categoria</th>
                      <th className="p-3">Preço</th>
                      <th className="p-3">Estoque</th>
                      <th className="p-3 text-right">Ação</th>
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
                              {p.estoque} un {isLow && '(Alerta)'}
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
        )}

        {/* --- CONTEÚDO DA ABA 5: FINANCEIRO & FIADO --- */}
        {activeTab === 'financeiro' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <DollarSign size={20} className="text-emerald-600" />
                Contas a Receber (Fiado / Vendas a Prazo)
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                    <tr>
                      <th className="p-3">Comanda</th>
                      <th className="p-3">Cliente</th>
                      <th className="p-3">Telefone</th>
                      <th className="p-3">Valor Total</th>
                      <th className="p-3">Valor Pago</th>
                      <th className="p-3">Pendente</th>
                      <th className="p-3 text-right">Ação</th>
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
                                Dar Baixa
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
                  Controle de Suprimentos & Estoque Crítico
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Materiais de gráfica que atingiram o nível de alerta de reposição
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
                        <span className="text-xs text-gray-500 block">Estoque Atual:</span>
                        <span className={`text-lg font-black ${isLow ? 'text-red-600' : 'text-emerald-600'}`}>
                          {p.estoque} un
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-gray-500 block">Estoque Mínimo:</span>
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
                Modo Smartphone POS Balcão
              </span>
              <h2 className="text-xl font-black text-gray-900 mt-2">Vendas Rápidas</h2>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-700 uppercase">
                Seleção Rápida de Produto
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
                Acesse esta área a partir de qualquer celular conectado à rede da gráfica para lançar comandas instantaneamente.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
