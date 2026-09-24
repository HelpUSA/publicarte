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
  Save,
  Users,
  Truck,
  Settings,
  FileSpreadsheet,
  Boxes,
  Shield,
  Eye,
  Building,
  Image as ImageIcon
} from 'lucide-react';

export default function Admin() {
  const { t } = useLanguage();

  // Logged-in User Session & Role
  const sessionUser = JSON.parse(localStorage.getItem('usuario') || '{"nome":"Tércio Grassi","tipo":"admin"}');
  const isActualAdmin = sessionUser.tipo === 'admin';
  const [activeRole, setActiveRole] = useState(sessionUser.tipo || 'admin'); // Allow Admin to toggle view to 'vendedor'

  const [activeTab, setActiveTab] = useState('pdv');
  const [cadastroSubTab, setCadastroSubTab] = useState('clientes'); // clientes | produtos | funcionarios | fornecedores

  // State: Caixa
  const [caixaAberto, setCaixaAberto] = useState(true);

  // State: Configurações da Empresa
  const [empresa, setEmpresa] = useState(() => {
    const local = localStorage.getItem('publicarte_empresa');
    return local
      ? JSON.parse(local)
      : {
          nome: 'Public Arte – Comunicação Visual',
          cnpj: '12.345.678/0001-90',
          endereco: 'Rua Ascendino Feitosa, 324',
          bairro: 'Castelo Branco III',
          cidade: 'João Pessoa - PB',
          whatsapp: '(83) 98610-4153',
          pix: '83986104153',
          logoUrl: '/logo-publicarte.png'
        };
  });

  // State: Clientes
  const [clientes, setClientes] = useState(() => {
    const local = localStorage.getItem('publicarte_clientes');
    return local
      ? JSON.parse(local)
      : [
          {
            id: 1,
            empresa: 'Mercadinho João',
            nome: 'João Souza',
            endereco: 'Av. Epitácio Pessoa, 1200',
            bairro: 'Tambauzinho',
            celular: '(83) 98765-4321'
          },
          {
            id: 2,
            empresa: 'Academia FitLife',
            nome: 'Maria Silva',
            endereco: 'Rua das Acácias, 45',
            bairro: 'Bessa',
            celular: '(83) 99888-1122'
          }
        ];
  });

  const [novoCliente, setNovoCliente] = useState({ empresa: '', nome: '', endereco: '', bairro: '', celular: '' });
  const [clienteEditando, setClienteEditando] = useState(null);
  const [clienteHistoricoModal, setClienteHistoricoModal] = useState(null);

  // State: Fornecedores
  const [fornecedores, setFornecedores] = useState(() => {
    const local = localStorage.getItem('publicarte_fornecedores');
    return local
      ? JSON.parse(local)
      : [
          {
            id: 1,
            empresa: 'Lonas & Mídias Brasil',
            contato: 'Carlos Eduardo',
            whatsapp: '(11) 98888-7777',
            endereco: 'São Paulo - SP'
          },
          {
            id: 2,
            empresa: 'Suprimentos EcoSolvente Nordeste',
            contato: 'Ana Paula',
            whatsapp: '(81) 99111-2222',
            endereco: 'Recife - PE'
          }
        ];
  });

  const [novoFornecedor, setNovoFornecedor] = useState({ empresa: '', contato: '', whatsapp: '', endereco: '' });
  const [fornecedorEditando, setFornecedorEditando] = useState(null);

  // State: Funcionários
  const [funcionarios, setFuncionarios] = useState(() => {
    const local = localStorage.getItem('publicarte_funcionarios');
    return local
      ? JSON.parse(local)
      : [
          { id: 1, nome: 'Tércio Grassi', cargo: 'Proprietário / Gestor', celular: '(83) 98610-4153', usuario: 'tercio', nivel: 'Admin' },
          { id: 2, nome: 'Lucas Atendente', cargo: 'Vendedor / Balcão', celular: '(83) 99123-4567', usuario: 'vendedor', nivel: 'Vendedor' }
        ];
  });

  const [novoFuncionario, setNovoFuncionario] = useState({ nome: '', cargo: '', celular: '', usuario: '', nivel: 'Vendedor' });
  const [funcionarioEditando, setFuncionarioEditando] = useState(null);

  // State: Produtos e Serviços
  const [produtos, setProdutos] = useState(() => {
    const local = localStorage.getItem('publicarte_produtos');
    return local
      ? JSON.parse(local)
      : [
          {
            id: 1,
            codigo: 'PRD-001',
            nome: 'Banner de Vinil 440g',
            custo: 22.0,
            preco: 45.0,
            unidade: 'm²',
            estoque: 25,
            min: 5,
            categoria: 'Banners & Lonas',
            foto: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&auto=format&fit=crop&q=60',
            observacao: 'Ilhós reforçado nas pontas'
          },
          {
            id: 2,
            codigo: 'PRD-002',
            nome: 'Adesivo Vinílico Brilho',
            custo: 18.0,
            preco: 40.0,
            unidade: 'm²',
            estoque: 40,
            min: 10,
            categoria: 'Adesivos & Rótulos',
            foto: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=60',
            observacao: 'Recorte eletrônico de precisão'
          },
          {
            id: 3,
            codigo: 'PRD-003',
            nome: 'Cartão de Visita 250g (1000un)',
            custo: 45.0,
            preco: 90.0,
            unidade: 'pacote',
            estoque: 15,
            min: 3,
            categoria: 'Gráfica Rápida',
            foto: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&auto=format&fit=crop&q=60',
            observacao: 'Verniz localizado UV'
          },
          {
            id: 4,
            codigo: 'PRD-004',
            nome: 'Placa em Metalon com Lona',
            custo: 90.0,
            preco: 180.0,
            unidade: 'm²',
            estoque: 8,
            min: 2,
            categoria: 'Placas & Fachadas',
            foto: 'https://images.unsplash.com/photo-1542744094-3a3172720449?w=300&auto=format&fit=crop&q=60',
            observacao: 'Estrutura galvanizada antioxidante'
          }
        ];
  });

  const [novoProduto, setNovoProduto] = useState({
    codigo: '',
    nome: '',
    custo: '',
    preco: '',
    unidade: 'm²',
    estoque: '10',
    min: '5',
    categoria: 'Impressão Digital',
    foto: '',
    observacao: ''
  });
  const [produtoEditando, setProdutoEditando] = useState(null);

  // State: Orçamentos
  const [orcamentos, setOrcamentos] = useState(() => {
    const local = localStorage.getItem('publicarte_orcamentos');
    return local
      ? JSON.parse(local)
      : [
          {
            id: 'ORC-501',
            cliente: 'Academia FitLife',
            contato: '(83) 99888-1122',
            itens: [
              { descricao: 'Adesivação de Parede Jateada', qtd: 1, valor: 350.0 },
              { descricao: 'Mão de Obra de Aplicação', qtd: 1, valor: 150.0 }
            ],
            total: 500.0,
            data: '2026-09-24',
            validade: '7 dias'
          }
        ];
  });

  const [novoOrcamento, setNovoOrcamento] = useState({ cliente: '', contato: '', itemDesc: '', itemValor: '', maoDeObra: '' });
  const [orcamentoModal, setOrcamentoModal] = useState(null);

  // State: Frente de Caixa (PDV)
  const [pdvClienteSelect, setPdvClienteSelect] = useState('Cliente Balcão');
  const [pdvClienteCustom, setPdvClienteCustom] = useState('');
  const [pdvTelefone, setPdvTelefone] = useState('');
  const [pdvSearchQuery, setPdvSearchQuery] = useState('');
  const [pdvCarrinho, setPdvCarrinho] = useState([]);
  const [pdvDesconto, setPdvDesconto] = useState('');
  const [pdvFormaPagamento, setPdvFormaPagamento] = useState('PIX');
  const [pdvValorRecebido, setPdvValorRecebido] = useState('');
  const [pdvEntrada, setPdvEntrada] = useState('');
  const [cupomModal, setCupomModal] = useState(null);

  // State: Vendas / Histórico
  const [comandas, setComandas] = useState(() => {
    const local = localStorage.getItem('publicarte_comandas');
    return local
      ? JSON.parse(local)
      : [
          {
            id: 'VND-1001',
            cliente: 'Maria Silva (Academia FitLife)',
            telefone: '(83) 99888-1122',
            itens: [{ produto: 'Banner de Vinil 440g', qtd: 2, unit: 67.5, total: 135.0 }],
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
          }
        ];
  });

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('publicarte_empresa', JSON.stringify(empresa));
  }, [empresa]);
  useEffect(() => {
    localStorage.setItem('publicarte_clientes', JSON.stringify(clientes));
  }, [clientes]);
  useEffect(() => {
    localStorage.setItem('publicarte_fornecedores', JSON.stringify(fornecedores));
  }, [fornecedores]);
  useEffect(() => {
    localStorage.setItem('publicarte_funcionarios', JSON.stringify(funcionarios));
  }, [funcionarios]);
  useEffect(() => {
    localStorage.setItem('publicarte_produtos', JSON.stringify(produtos));
  }, [produtos]);
  useEffect(() => {
    localStorage.setItem('publicarte_comandas', JSON.stringify(comandas));
  }, [comandas]);
  useEffect(() => {
    localStorage.setItem('publicarte_orcamentos', JSON.stringify(orcamentos));
  }, [orcamentos]);

  // Calculations
  const pdvSubtotal = pdvCarrinho.reduce((acc, item) => acc + (Number(item.total) || 0), 0);
  const pdvValorDesconto = Number(pdvDesconto) || 0;
  const pdvTotalFinal = Math.max(0, pdvSubtotal - pdvValorDesconto);
  const pdvTroco =
    pdvFormaPagamento === 'Dinheiro' && Number(pdvValorRecebido) > pdvTotalFinal
      ? Number(pdvValorRecebido) - pdvTotalFinal
      : 0;

  const totalFaturamento = comandas.reduce((sum, c) => sum + Number(c.pago), 0);
  const totalContasAReceber = comandas.reduce((sum, c) => sum + (Number(c.total) - Number(c.pago)), 0);

  // PDV Handlers
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

    const clienteNome = pdvClienteSelect === 'Novo' ? (pdvClienteCustom.trim() || 'Cliente Balcão') : pdvClienteSelect;
    const ePrazo = pdvFormaPagamento === 'A Prazo';
    const valorPago = ePrazo ? Number(pdvEntrada || 0) : pdvTotalFinal;

    const novaVenda = {
      id: `VND-${Math.floor(1000 + Math.random() * 9000)}`,
      cliente: clienteNome,
      telefone: pdvTelefone || '(83) 90000-0000',
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

    setPdvCarrinho([]);
    setPdvClienteSelect('Cliente Balcão');
    setPdvClienteCustom('');
    setPdvTelefone('');
    setPdvDesconto('');
    setPdvValorRecebido('');
    setPdvEntrada('');
  };

  // Handlers Clientes
  const handleCriarOuSalvarCliente = (e) => {
    e.preventDefault();
    if (!novoCliente.nome) return;

    if (clienteEditando) {
      setClientes(clientes.map((c) => (c.id === clienteEditando.id ? { ...c, ...novoCliente } : c)));
      setClienteEditando(null);
    } else {
      setClientes([...clientes, { id: Date.now(), ...novoCliente }]);
    }
    setNovoCliente({ empresa: '', nome: '', endereco: '', bairro: '', celular: '' });
  };

  const handleEditarCliente = (cli) => {
    setClienteEditando(cli);
    setNovoCliente({ empresa: cli.empresa, nome: cli.nome, endereco: cli.endereco, bairro: cli.bairro, celular: cli.celular });
  };

  const handleDeletarCliente = (id) => {
    setClientes(clientes.filter((c) => c.id !== id));
    if (clienteEditando && clienteEditando.id === id) {
      setClienteEditando(null);
      setNovoCliente({ empresa: '', nome: '', endereco: '', bairro: '', celular: '' });
    }
  };

  // Handlers Fornecedores
  const handleCriarOuSalvarFornecedor = (e) => {
    e.preventDefault();
    if (!novoFornecedor.empresa) return;

    if (fornecedorEditando) {
      setFornecedores(fornecedores.map((f) => (f.id === fornecedorEditando.id ? { ...f, ...novoFornecedor } : f)));
      setFornecedorEditando(null);
    } else {
      setFornecedores([...fornecedores, { id: Date.now(), ...novoFornecedor }]);
    }
    setNovoFornecedor({ empresa: '', contato: '', whatsapp: '', endereco: '' });
  };

  // Handlers Funcionários
  const handleCriarOuSalvarFuncionario = (e) => {
    e.preventDefault();
    if (!novoFuncionario.nome || !novoFuncionario.usuario) return;

    if (funcionarioEditando) {
      setFuncionarios(funcionarios.map((f) => (f.id === funcionarioEditando.id ? { ...f, ...novoFuncionario } : f)));
      setFuncionarioEditando(null);
    } else {
      setFuncionarios([...funcionarios, { id: Date.now(), ...novoFuncionario }]);
    }
    setNovoFuncionario({ nome: '', cargo: '', celular: '', usuario: '', nivel: 'Vendedor' });
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
                codigo: novoProduto.codigo || p.codigo,
                nome: novoProduto.nome,
                custo: Number(novoProduto.custo || 0),
                preco: Number(novoProduto.preco),
                unidade: novoProduto.unidade || 'un',
                estoque: Number(novoProduto.estoque || 0),
                min: Number(novoProduto.min || 5),
                categoria: novoProduto.categoria || 'Geral',
                foto: novoProduto.foto || p.foto,
                observacao: novoProduto.observacao || ''
              }
            : p
        )
      );
      setProdutoEditando(null);
    } else {
      const prod = {
        id: Date.now(),
        codigo: novoProduto.codigo || `PRD-00${produtos.length + 1}`,
        nome: novoProduto.nome,
        custo: Number(novoProduto.custo || 0),
        preco: Number(novoProduto.preco),
        unidade: novoProduto.unidade || 'un',
        estoque: Number(novoProduto.estoque || 0),
        min: Number(novoProduto.min || 5),
        categoria: novoProduto.categoria || 'Geral',
        foto: novoProduto.foto || 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&auto=format&fit=crop&q=60',
        observacao: novoProduto.observacao || ''
      };
      setProdutos([...produtos, prod]);
    }
    setNovoProduto({
      codigo: '',
      nome: '',
      custo: '',
      preco: '',
      unidade: 'm²',
      estoque: '10',
      min: '5',
      categoria: 'Impressão Digital',
      foto: '',
      observacao: ''
    });
  };

  const handleEditarProduto = (prod) => {
    setProdutoEditando(prod);
    setNovoProduto({
      codigo: prod.codigo || '',
      nome: prod.nome,
      custo: prod.custo || '',
      preco: prod.preco,
      unidade: prod.unidade || 'm²',
      estoque: prod.estoque || '0',
      min: prod.min || '5',
      categoria: prod.categoria,
      foto: prod.foto || '',
      observacao: prod.observacao || ''
    });
  };

  const handleDeletarProduto = (id) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  // Handlers Orçamentos
  const handleCriarOrcamento = (e) => {
    e.preventDefault();
    const valItem = Number(novoOrcamento.itemValor) || 0;
    const valMaoObra = Number(novoOrcamento.maoDeObra) || 0;
    const itemsList = [{ descricao: novoOrcamento.itemDesc || 'Serviço de Comunicação Visual', qtd: 1, valor: valItem }];
    if (valMaoObra > 0) itemsList.push({ descricao: 'Mão de Obra e Instalação', qtd: 1, valor: valMaoObra });

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

  const handleQuitarComanda = (id) => {
    setComandas(comandas.map((c) => (c.id === id ? { ...c, pago: c.total, prazo: false, status: 'Entregue & Concluído' } : c)));
  };

  // Definir abas disponíveis com base no nível de permissão
  const tabsList =
    activeRole === 'vendedor'
      ? [
          { id: 'pdv', label: '🛒 Frente de Caixa (PDV)', icon: ShoppingCart },
          { id: 'orcamentos', label: '📄 Orçamentos', icon: FileSpreadsheet, count: orcamentos.length }
        ]
      : [
          { id: 'pdv', label: '🛒 Frente de Caixa (PDV)', icon: ShoppingCart },
          { id: 'orcamentos', label: '📄 Orçamentos', icon: FileSpreadsheet, count: orcamentos.length },
          { id: 'cadastros', label: '🗂️ Cadastros', icon: Users },
          { id: 'estoque', label: '📦 Estoque & Entradas', icon: Boxes },
          { id: 'financeiro', label: '💰 Financeiro & Vendas', icon: DollarSign },
          { id: 'config', label: '⚙️ Configurações', icon: Settings }
        ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16 w-full flex-1">
        {/* HEADER DO PAINEL ADMIN COM CHAVEADOR DE VISÃO DE PERFIL */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-800 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {empresa.nome}
              </span>

              {/* BADGE DE PERFIL LOGADO */}
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                  activeRole === 'admin' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-blue-100 text-blue-900 border border-blue-300'
                }`}
              >
                <Shield size={14} />
                {activeRole === 'admin' ? 'Acesso Total (Administrador)' : 'Acesso Restrito (Vendedor / Balcão)'}
              </span>

              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {caixaAberto ? t('cashOpen') : t('cashClosed')}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 mt-2 flex items-center gap-2">
              Área Administrativa & Gestão Comercial
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              Usuário Atual: <strong>{sessionUser.nome}</strong> · {empresa.cidade}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* TOGGLE DE TESTE DE PERFIL PARA O ADMIN TÉRCIO */}
            {isActualAdmin && (
              <button
                onClick={() => {
                  const next = activeRole === 'admin' ? 'vendedor' : 'admin';
                  setActiveRole(next);
                  if (next === 'vendedor') setActiveTab('pdv');
                }}
                className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border border-gray-300"
                title="Alternar modo de visualização entre Admin e Funcionário"
              >
                <Eye size={15} />
                <span>Simular: {activeRole === 'admin' ? 'Vendedor' : 'Admin'}</span>
              </button>
            )}

            <Link
              to="/manual"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md transition"
            >
              <BookOpen size={16} />
              {t('btnSystemManual')}
            </Link>

            {activeRole === 'admin' && (
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
            )}
          </div>
        </div>

        {/* NAVEGAÇÃO DE ABAS DINÂMICA CONFORME O PERFIL */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
          {tabsList.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-900 text-white shadow-md'
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

        {/* --- ABA 1: FRENTE DE CAIXA (PDV MODELO SOFTCOM) --- */}
        {activeTab === 'pdv' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-gradient-to-r from-blue-950 to-blue-850 text-white rounded-2xl p-5 shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase font-extrabold tracking-wider text-amber-300">
                    ATENDIMENTO DE BALCÃO · SOFTCOM PDV
                  </div>
                  <h2 className="text-xl font-extrabold">{t('pdvTitle')}</h2>
                  <p className="text-xs text-blue-100 mt-1">{t('pdvSubtitle')}</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl text-xs font-bold">
                  <Clock size={16} />
                  <span>{new Date().toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              {/* SELEÇÃO DO CLIENTE NO PDV */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                    <UserIcon size={18} className="text-blue-800" />
                    Cliente / Identificação de Atendimento
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Selecionar Cliente Cadastrado
                    </label>
                    <select
                      value={pdvClienteSelect}
                      onChange={(e) => {
                        const val = e.target.value;
                        setPdvClienteSelect(val);
                        if (val !== 'Novo' && val !== 'Cliente Balcão') {
                          const cliObj = clientes.find((c) => c.nome === val || c.empresa === val);
                          if (cliObj) setPdvTelefone(cliObj.celular || '');
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-bold text-blue-900 focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                    >
                      <option value="Cliente Balcão">👤 Cliente Balcão / Avulso</option>
                      {clientes.map((c) => (
                        <option key={c.id} value={c.empresa ? `${c.nome} (${c.empresa})` : c.nome}>
                          🏢 {c.nome} {c.empresa ? `- ${c.empresa}` : ''} ({c.celular})
                        </option>
                      ))}
                      <option value="Novo">➕ Digitar Novo Cliente Rápido...</option>
                    </select>
                  </div>

                  {pdvClienteSelect === 'Novo' ? (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                        Nome do Cliente *
                      </label>
                      <input
                        type="text"
                        value={pdvClienteCustom}
                        onChange={(e) => setPdvClienteCustom(e.target.value)}
                        placeholder="Nome da pessoa ou empresa"
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                        WhatsApp / Telefone
                      </label>
                      <input
                        type="text"
                        value={pdvTelefone}
                        onChange={(e) => setPdvTelefone(e.target.value)}
                        placeholder="(83) 90000-0000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* GRADE DE SELEÇÃO DE PRODUTOS COM FOTO */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-3">
                  <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                    <Package size={18} className="text-blue-800" />
                    Produtos & Serviços Disponíveis
                  </h2>
                  <button
                    type="button"
                    onClick={handleAdicionarItemAvulso}
                    className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold px-3 py-1.5 rounded-xl border border-amber-300 transition flex items-center gap-1 shadow-sm"
                  >
                    <Plus size={14} />
                    + Item Avulso / Sob Medida
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={pdvSearchQuery}
                    onChange={(e) => setPdvSearchQuery(e.target.value)}
                    placeholder="Buscar produto por nome ou código..."
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-sm"
                  />
                  <Package size={16} className="absolute left-3 top-3 text-gray-400" />
                </div>

                {/* CARDS DOS PRODUTOS COM FOTO NO PDV */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
                  {produtos
                    .filter((p) => p.nome.toLowerCase().includes(pdvSearchQuery.toLowerCase()) || p.codigo?.toLowerCase().includes(pdvSearchQuery.toLowerCase()))
                    .map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => handleAdicionarAoCarrinho(prod)}
                        className="p-3 border border-gray-200 hover:border-blue-500 hover:bg-blue-50/40 rounded-2xl cursor-pointer transition flex items-center gap-3 group shadow-sm bg-white"
                      >
                        <img
                          src={prod.foto || 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&auto=format&fit=crop&q=60'}
                          alt={prod.nome}
                          className="w-14 h-14 object-cover rounded-xl border border-gray-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-extrabold text-xs text-gray-900 group-hover:text-blue-900 truncate">
                            {prod.nome}
                          </div>
                          <div className="text-[11px] text-gray-500 mt-0.5">
                            {prod.categoria} · R$ {Number(prod.preco).toFixed(2)} / {prod.unidade || 'un'}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="bg-blue-900 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-xl group-hover:bg-blue-950 transition shrink-0 flex items-center gap-1"
                        >
                          <Plus size={13} /> Add
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* CARRINHO E FECHAMENTO DA VENDA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b pb-3 mb-3">
                    <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                      <ShoppingCart size={18} className="text-blue-800" />
                      Itens do Pedido ({pdvCarrinho.length})
                    </h2>
                    {pdvCarrinho.length > 0 && (
                      <button onClick={() => setPdvCarrinho([])} className="text-[11px] text-red-600 hover:underline font-bold">
                        Limpar Carrinho
                      </button>
                    )}
                  </div>

                  {pdvCarrinho.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 text-xs">
                      <ShoppingCart size={32} className="mx-auto mb-2 opacity-30 text-blue-800" />
                      Nenhum produto selecionado. Clique em um item ao lado.
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                      {pdvCarrinho.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                          <div className="flex-1 pr-2">
                            <div className="font-bold text-gray-900">{item.produto}</div>
                            <div className="text-[11px] text-gray-500">
                              R$ {item.unit.toFixed(2)} x {item.qtd} = <strong className="text-blue-900">R$ {item.total.toFixed(2)}</strong>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button type="button" onClick={() => handleAlterarQtdCarrinho(index, -1)} className="w-6 h-6 bg-white border border-gray-300 rounded font-bold text-xs">-</button>
                            <span className="font-extrabold text-xs w-4 text-center">{item.qtd}</span>
                            <button type="button" onClick={() => handleAlterarQtdCarrinho(index, 1)} className="w-6 h-6 bg-white border border-gray-300 rounded font-bold text-xs">+</button>
                            <button type="button" onClick={() => handleAlterarQtdCarrinho(index, -item.qtd)} className="text-red-500 hover:text-red-700 p-1 ml-1"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 space-y-3 mt-4">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Subtotal:</span>
                    <span className="font-bold">R$ {pdvSubtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-gray-600">Desconto (R$):</span>
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
                    <span className="text-xs font-bold uppercase tracking-wider">TOTAL A PAGAR:</span>
                    <span className="text-2xl font-black text-amber-300">R$ {pdvTotalFinal.toFixed(2)}</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Forma de Pagamento</label>
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
                        <label className="block text-[10px] font-bold text-amber-900 uppercase">Valor Recebido (R$)</label>
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
                        <span className="text-[10px] text-amber-800 font-bold uppercase">Troco:</span>
                        <span className="text-base font-black text-emerald-700">R$ {pdvTroco.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  {pdvFormaPagamento === 'A Prazo' && (
                    <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-amber-900 uppercase">Valor de Entrada (R$)</label>
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
                        <span>Saldo Restante (Fiado):</span>
                        <span className="text-red-700">R$ {Math.max(0, pdvTotalFinal - (Number(pdvEntrada) || 0)).toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleFinalizarVendaPDV}
                    disabled={pdvCarrinho.length === 0}
                    className={`w-full py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition ${
                      pdvCarrinho.length > 0 ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={18} />
                    FINALIZAR VENDA (F9)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ABA 2: ORÇAMENTOS --- */}
        {activeTab === 'orcamentos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit">
              <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <FileSpreadsheet size={20} className="text-blue-800" />
                Emitir Novo Orçamento
              </h2>
              <form onSubmit={handleCriarOrcamento} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Cliente / Empresa *</label>
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
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">WhatsApp / Telefone</label>
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
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Descrição do Serviço / Material</label>
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
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Valor Material (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={novoOrcamento.itemValor}
                      onChange={(e) => setNovoOrcamento({ ...novoOrcamento, itemValor: e.target.value })}
                      placeholder="850.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mão de Obra (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={novoOrcamento.maoDeObra}
                      onChange={(e) => setNovoOrcamento({ ...novoOrcamento, maoDeObra: e.target.value })}
                      placeholder="250.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2">
                  <Plus size={16} /> Emitir Proposta
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-gray-800">Orçamentos Emitidos ({orcamentos.length})</h2>
              <div className="space-y-3">
                {orcamentos.map((orc) => (
                  <div key={orc.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 space-y-3">
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
                      <span className="text-sm font-black text-emerald-700">Total Proposto: R$ {orc.total.toFixed(2)}</span>
                      <div className="flex gap-2">
                        <button onClick={() => setOrcamentoModal(orc)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition">
                          <Printer size={14} /> Espelho / PDF
                        </button>
                        <button
                          onClick={() => {
                            let msg = `*${empresa.nome.toUpperCase()} - ORÇAMENTO ${orc.id}*\n`;
                            msg += `*Cliente:* ${orc.cliente}\n*Data:* ${orc.data}\n\n*ITENS DO ORÇAMENTO:*\n`;
                            orc.itens.forEach((it) => (msg += `• ${it.descricao}: R$ ${it.valor.toFixed(2)}\n`));
                            msg += `\n*TOTAL:* R$ ${orc.total.toFixed(2)}\n*Validade:* ${orc.validade}\n\n${empresa.nome}\n${empresa.whatsapp}`;
                            window.open(`https://wa.me/55${orc.contato.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
                          }}
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

        {/* --- ABA 3: CADASTROS UNIFICADOS (CLIENTES, PRODUTOS COM FOTO, FUNCIONÁRIOS, FORNECEDORES) --- */}
        {activeTab === 'cadastros' && activeRole === 'admin' && (
          <div className="space-y-6">
            {/* SUB NAVEGAÇÃO DE CADASTROS */}
            <div className="flex gap-2 border-b border-gray-200 pb-3">
              {[
                { id: 'clientes', label: '👥 Clientes', icon: Users, count: clientes.length },
                { id: 'produtos', label: '📦 Produtos & Fotos', icon: Package, count: produtos.length },
                { id: 'funcionarios', label: '👔 Funcionários / Usuários', icon: UserIcon, count: funcionarios.length },
                { id: 'fornecedores', label: '🚚 Fornecedores', icon: Truck, count: fornecedores.length }
              ].map((sub) => {
                const SubIcon = sub.icon;
                const isSubActive = cadastroSubTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setCadastroSubTab(sub.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                      isSubActive ? 'bg-blue-900 text-white shadow-sm' : 'bg-white text-gray-700 border hover:bg-gray-50'
                    }`}
                  >
                    <SubIcon size={15} />
                    <span>{sub.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSubActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                      {sub.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* SUB-ABA: CLIENTES */}
            {cadastroSubTab === 'clientes' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit">
                  <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                    {clienteEditando ? <Edit2 size={18} /> : <Plus size={18} />}
                    {clienteEditando ? 'Alterar Cliente' : 'Cadastrar Novo Cliente'}
                  </h2>
                  <form onSubmit={handleCriarOuSalvarCliente} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Nome da Empresa (Fantasia/Razão)</label>
                      <input type="text" value={novoCliente.empresa} onChange={(e) => setNovoCliente({ ...novoCliente, empresa: e.target.value })} placeholder="Ex: Mercadinho João" className="w-full p-2 border rounded-xl" />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Nome da Pessoa (Contato) *</label>
                      <input type="text" required value={novoCliente.nome} onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })} placeholder="Ex: João Souza" className="w-full p-2 border rounded-xl" />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Celular / WhatsApp *</label>
                      <input type="text" required value={novoCliente.celular} onChange={(e) => setNovoCliente({ ...novoCliente, celular: e.target.value })} placeholder="(83) 98765-4321" className="w-full p-2 border rounded-xl" />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Endereço</label>
                      <input type="text" value={novoCliente.endereco} onChange={(e) => setNovoCliente({ ...novoCliente, endereco: e.target.value })} placeholder="Av. Principal, 100" className="w-full p-2 border rounded-xl" />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Bairro</label>
                      <input type="text" value={novoCliente.bairro} onChange={(e) => setNovoCliente({ ...novoCliente, bairro: e.target.value })} placeholder="Manaíra" className="w-full p-2 border rounded-xl" />
                    </div>
                    <button type="submit" className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-2.5 rounded-xl transition shadow flex items-center justify-center gap-2">
                      <Save size={15} /> {clienteEditando ? 'Salvar Alterações' : 'Salvar Cliente'}
                    </button>
                    {clienteEditando && (
                      <button type="button" onClick={() => { setClienteEditando(null); setNovoCliente({ empresa: '', nome: '', endereco: '', bairro: '', celular: '' }); }} className="w-full bg-gray-200 text-gray-700 font-bold py-2 rounded-xl">Cancelar</button>
                    )}
                  </form>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
                  <h2 className="text-lg font-bold text-gray-800">Clientes Cadastrados ({clientes.length})</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                        <tr>
                          <th className="p-3">Empresa / Cliente</th>
                          <th className="p-3">Contato</th>
                          <th className="p-3">WhatsApp</th>
                          <th className="p-3">Bairro</th>
                          <th className="p-3 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {clientes.map((c) => (
                          <tr key={c.id} className="hover:bg-gray-50 transition">
                            <td className="p-3 font-bold text-blue-900">{c.empresa || '-'}</td>
                            <td className="p-3 font-semibold text-gray-800">{c.nome}</td>
                            <td className="p-3 text-gray-600">{c.celular}</td>
                            <td className="p-3 text-gray-500">{c.bairro || '-'}</td>
                            <td className="p-3 text-right space-x-1">
                              <button onClick={() => setClienteHistoricoModal(c)} className="text-emerald-600 hover:text-emerald-800 p-1 font-bold text-xs" title="Histórico de Compras"><Receipt size={16} /></button>
                              <button onClick={() => handleEditarCliente(c)} className="text-blue-600 hover:text-blue-800 p-1" title="Editar"><Edit2 size={16} /></button>
                              <button onClick={() => handleDeletarCliente(c.id)} className="text-red-500 hover:text-red-700 p-1" title="Excluir"><Trash2 size={16} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-ABA: PRODUTOS COM FOTO E CUSTO */}
            {cadastroSubTab === 'produtos' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit">
                  <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                    {produtoEditando ? <Edit2 size={18} /> : <Plus size={18} />}
                    {produtoEditando ? 'Alterar Produto' : 'Cadastrar Produto com Foto'}
                  </h2>
                  <form onSubmit={handleCriarOuSalvarProduto} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Nome do Produto / Serviço *</label>
                      <input type="text" required value={novoProduto.nome} onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })} placeholder="Ex: Banner Vinil 440g" className="w-full p-2 border rounded-xl" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-gray-700 uppercase mb-1">Custo (R$)</label>
                        <input type="number" step="0.01" value={novoProduto.custo} onChange={(e) => setNovoProduto({ ...novoProduto, custo: e.target.value })} placeholder="22.00" className="w-full p-2 border rounded-xl" />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 uppercase mb-1">Preço Venda (R$) *</label>
                        <input type="number" step="0.01" required value={novoProduto.preco} onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })} placeholder="45.00" className="w-full p-2 border rounded-xl" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-gray-700 uppercase mb-1">Unidade</label>
                        <select value={novoProduto.unidade} onChange={(e) => setNovoProduto({ ...novoProduto, unidade: e.target.value })} className="w-full p-2 border rounded-xl bg-white">
                          <option value="un">Unidade (un)</option>
                          <option value="m²">Metro Quadrado (m²)</option>
                          <option value="pacote">Pacote</option>
                          <option value="milheiro">Milheiro</option>
                          <option value="serviço">Serviço</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 uppercase mb-1">Categoria</label>
                        <input type="text" value={novoProduto.categoria} onChange={(e) => setNovoProduto({ ...novoProduto, categoria: e.target.value })} placeholder="Banners" className="w-full p-2 border rounded-xl" />
                      </div>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">URL da Foto / Imagem</label>
                      <input type="text" value={novoProduto.foto} onChange={(e) => setNovoProduto({ ...novoProduto, foto: e.target.value })} placeholder="https://..." className="w-full p-2 border rounded-xl" />
                    </div>
                    <button type="submit" className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-2.5 rounded-xl transition shadow flex items-center justify-center gap-2">
                      <Save size={15} /> {produtoEditando ? 'Salvar Alterações' : 'Salvar Produto'}
                    </button>
                    {produtoEditando && (
                      <button type="button" onClick={() => { setProdutoEditando(null); setNovoProduto({ codigo: '', nome: '', custo: '', preco: '', unidade: 'm²', estoque: '10', min: '5', categoria: 'Impressão Digital', foto: '', observacao: '' }); }} className="w-full bg-gray-200 text-gray-700 font-bold py-2 rounded-xl">Cancelar</button>
                    )}
                  </form>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
                  <h2 className="text-lg font-bold text-gray-800">Catálogo com Fotos & Margem ({produtos.length})</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                        <tr>
                          <th className="p-3">Foto</th>
                          <th className="p-3">Nome / Categoria</th>
                          <th className="p-3">Custo</th>
                          <th className="p-3">Venda</th>
                          <th className="p-3">Margem</th>
                          <th className="p-3 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {produtos.map((p) => {
                          const margem = p.preco > 0 && p.custo > 0 ? (((p.preco - p.custo) / p.preco) * 100).toFixed(0) : '-';
                          return (
                            <tr key={p.id} className="hover:bg-gray-50 transition">
                              <td className="p-3">
                                <img src={p.foto || 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&auto=format&fit=crop&q=60'} alt={p.nome} className="w-10 h-10 object-cover rounded-xl border" />
                              </td>
                              <td className="p-3">
                                <div className="font-bold text-gray-900">{p.nome}</div>
                                <div className="text-[11px] text-gray-500">{p.categoria} · {p.unidade}</div>
                              </td>
                              <td className="p-3 text-gray-600 font-medium">R$ {Number(p.custo || 0).toFixed(2)}</td>
                              <td className="p-3 font-bold text-emerald-700">R$ {Number(p.preco).toFixed(2)}</td>
                              <td className="p-3 font-extrabold text-blue-900">{margem}%</td>
                              <td className="p-3 text-right space-x-1">
                                <button onClick={() => handleEditarProduto(p)} className="text-blue-600 hover:text-blue-800 p-1" title="Editar"><Edit2 size={16} /></button>
                                <button onClick={() => handleDeletarProduto(p.id)} className="text-red-500 hover:text-red-700 p-1" title="Excluir"><Trash2 size={16} /></button>
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

            {/* SUB-ABA: FUNCIONÁRIOS & PERMISSÕES */}
            {cadastroSubTab === 'funcionarios' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit">
                  <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Plus size={18} /> Cadastrar Funcionário / Usuário
                  </h2>
                  <form onSubmit={handleCriarOuSalvarFuncionario} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Nome Completo *</label>
                      <input type="text" required value={novoFuncionario.nome} onChange={(e) => setNovoFuncionario({ ...novoFuncionario, nome: e.target.value })} placeholder="Ex: Lucas Silva" className="w-full p-2 border rounded-xl" />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Cargo</label>
                      <input type="text" value={novoFuncionario.cargo} onChange={(e) => setNovoFuncionario({ ...novoFuncionario, cargo: e.target.value })} placeholder="Vendedor / Atendente Balcão" className="w-full p-2 border rounded-xl" />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Login de Usuário *</label>
                      <input type="text" required value={novoFuncionario.usuario} onChange={(e) => setNovoFuncionario({ ...novoFuncionario, usuario: e.target.value })} placeholder="lucas.vendas" className="w-full p-2 border rounded-xl" />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Nível de Acesso (Permissões) *</label>
                      <select value={novoFuncionario.nivel} onChange={(e) => setNovoFuncionario({ ...novoFuncionario, nivel: e.target.value })} className="w-full p-2 border rounded-xl bg-white font-bold text-blue-900">
                        <option value="Vendedor">Vendedor (Restrito: Vender no PDV & Orçamentos)</option>
                        <option value="Admin">Administrador (Total: Acesso Completo)</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-2.5 rounded-xl transition shadow flex items-center justify-center gap-2">
                      <Save size={15} /> Cadastrar Funcionário
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
                  <h2 className="text-lg font-bold text-gray-800">Equipe de Funcionários ({funcionarios.length})</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                        <tr>
                          <th className="p-3">Nome</th>
                          <th className="p-3">Cargo</th>
                          <th className="p-3">Usuário Login</th>
                          <th className="p-3">Nível Acesso</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {funcionarios.map((f) => (
                          <tr key={f.id} className="hover:bg-gray-50 transition">
                            <td className="p-3 font-bold text-gray-900">{f.nome}</td>
                            <td className="p-3 text-gray-600">{f.cargo}</td>
                            <td className="p-3 font-mono font-bold text-blue-900">{f.usuario}</td>
                            <td className="p-3">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${f.nivel === 'Admin' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-blue-100 text-blue-900 border border-blue-300'}`}>
                                {f.nivel === 'Admin' ? 'Admin Total' : 'Vendedor Restrito'}
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

            {/* SUB-ABA: FORNECEDORES */}
            {cadastroSubTab === 'fornecedores' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit">
                  <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Plus size={18} /> Cadastrar Fornecedor
                  </h2>
                  <form onSubmit={handleCriarOuSalvarFornecedor} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Nome da Empresa Fornecedora *</label>
                      <input type="text" required value={novoFornecedor.empresa} onChange={(e) => setNovoFornecedor({ ...novoFornecedor, empresa: e.target.value })} placeholder="Ex: Lonas & Mídias Brasil" className="w-full p-2 border rounded-xl" />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Nome do Contato ("Pessoa que eu falo")</label>
                      <input type="text" value={novoFornecedor.contato} onChange={(e) => setNovoFornecedor({ ...novoFornecedor, contato: e.target.value })} placeholder="Ex: Carlos Eduardo" className="w-full p-2 border rounded-xl" />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">WhatsApp / Telefone</label>
                      <input type="text" value={novoFornecedor.whatsapp} onChange={(e) => setNovoFornecedor({ ...novoFornecedor, whatsapp: e.target.value })} placeholder="(11) 98888-7777" className="w-full p-2 border rounded-xl" />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Endereço da Empresa</label>
                      <input type="text" value={novoFornecedor.endereco} onChange={(e) => setNovoFornecedor({ ...novoFornecedor, endereco: e.target.value })} placeholder="São Paulo - SP" className="w-full p-2 border rounded-xl" />
                    </div>
                    <button type="submit" className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-2.5 rounded-xl transition shadow flex items-center justify-center gap-2">
                      <Save size={15} /> Cadastrar Fornecedor
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
                  <h2 className="text-lg font-bold text-gray-800">Fornecedores Cadastrados ({fornecedores.length})</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                        <tr>
                          <th className="p-3">Empresa Fornecedora</th>
                          <th className="p-3">Pessoa de Contato</th>
                          <th className="p-3">WhatsApp</th>
                          <th className="p-3">Endereço</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {fornecedores.map((f) => (
                          <tr key={f.id} className="hover:bg-gray-50 transition">
                            <td className="p-3 font-bold text-blue-900">{f.empresa}</td>
                            <td className="p-3 font-semibold text-gray-800">{f.contato || '-'}</td>
                            <td className="p-3 text-gray-600">{f.whatsapp}</td>
                            <td className="p-3 text-gray-500">{f.endereco || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- ABA 4: ESTOQUE & ENTRADAS (INFORMATIVO) --- */}
        {activeTab === 'estoque' && activeRole === 'admin' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Boxes size={22} className="text-blue-900" />
                  Controle Informativo de Estoque & Entradas
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Consulte saldos informativos e limites mínimos sem travar a venda no PDV.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {produtos.map((p) => {
                const isLow = p.estoque <= p.min;
                return (
                  <div key={p.id} className={`p-4 rounded-2xl border ${isLow ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'} space-y-3`}>
                    <div className="flex items-center gap-3">
                      <img src={p.foto} alt={p.nome} className="w-12 h-12 object-cover rounded-xl border" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 block">{p.categoria}</span>
                        <h3 className="font-bold text-gray-900 text-xs">{p.nome}</h3>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t text-xs">
                      <div>
                        <span className="text-[10px] text-gray-500 block">Estoque Atual</span>
                        <span className={`text-base font-black ${isLow ? 'text-red-600' : 'text-emerald-600'}`}>
                          {p.estoque} {p.unidade}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-500 block">Mínimo Recomendado</span>
                        <span className="font-bold text-gray-700">{p.min} {p.unidade}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- ABA 5: FINANCEIRO & VENDAS --- */}
        {activeTab === 'financeiro' && activeRole === 'admin' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase">Faturamento Recebido</span>
                  <div className="text-2xl font-black text-emerald-600 mt-1">R$ {totalFaturamento.toFixed(2)}</div>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold mt-1 inline-block">Vendas pagas confirmadas</span>
                </div>
                <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700"><DollarSign size={32} /></div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase">Contas a Receber (Fiado)</span>
                  <div className="text-2xl font-black text-amber-600 mt-1">R$ {totalContasAReceber.toFixed(2)}</div>
                  <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold mt-1 inline-block">Saldo a prazo pendente</span>
                </div>
                <div className="p-3 bg-amber-100 rounded-2xl text-amber-700"><Clock size={32} /></div>
              </div>
            </div>

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
                              <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">Fiado (R$ {pendente.toFixed(2)})</span>
                            ) : (
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit"><CheckCircle2 size={12} /> Pago</span>
                            )}
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button onClick={() => setCupomModal(c)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-2.5 py-1 rounded text-xs transition">Ver Recibo</button>
                            {c.prazo && pendente > 0 && (
                              <button onClick={() => handleQuitarComanda(c.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded text-xs transition shadow">Quitar Fiado</button>
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

        {/* --- ABA 6: CONFIGURAÇÕES DA EMPRESA --- */}
        {activeTab === 'config' && activeRole === 'admin' && (
          <div className="max-w-3xl bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2 border-b pb-3">
              <Building size={20} /> Configurações Institucionais da Empresa
            </h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Dados da empresa atualizados!'); }} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Nome da Empresa</label>
                <input type="text" value={empresa.nome} onChange={(e) => setEmpresa({ ...empresa, nome: e.target.value })} className="w-full p-2.5 border rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">CNPJ</label>
                  <input type="text" value={empresa.cnpj} onChange={(e) => setEmpresa({ ...empresa, cnpj: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">WhatsApp Oficial</label>
                  <input type="text" value={empresa.whatsapp} onChange={(e) => setEmpresa({ ...empresa, whatsapp: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Endereço</label>
                  <input type="text" value={empresa.endereco} onChange={(e) => setEmpresa({ ...empresa, endereco: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Bairro / Cidade</label>
                  <input type="text" value={empresa.bairro} onChange={(e) => setEmpresa({ ...empresa, bairro: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                </div>
              </div>
              <button type="submit" className="bg-blue-900 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-950 transition shadow">
                <Save size={16} /> Salvar Configurações
              </button>
            </form>
          </div>
        )}

        {/* MODAL HISTÓRICO DE COMPRAS DO CLIENTE */}
        {clienteHistoricoModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-4 border border-gray-300 relative">
              <button onClick={() => setClienteHistoricoModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold text-lg">✕</button>
              <h3 className="text-base font-bold text-blue-900 border-b pb-2">
                Histórico de Compras: {clienteHistoricoModal.nome} {clienteHistoricoModal.empresa ? `(${clienteHistoricoModal.empresa})` : ''}
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {comandas
                  .filter((c) => c.cliente.toLowerCase().includes(clienteHistoricoModal.nome.toLowerCase()) || (clienteHistoricoModal.empresa && c.cliente.toLowerCase().includes(clienteHistoricoModal.empresa.toLowerCase())))
                  .map((c) => (
                    <div key={c.id} className="p-3 bg-gray-50 rounded-xl border text-xs flex items-center justify-between">
                      <div>
                        <span className="font-bold text-blue-900 mr-2">{c.id}</span>
                        <span className="text-gray-500 mr-2">{c.data}</span>
                        <span className="font-bold text-gray-800">R$ {c.total.toFixed(2)}</span> ({c.formaPagamento})
                      </div>
                      <button onClick={() => { setClienteHistoricoModal(null); setCupomModal(c); }} className="bg-blue-900 text-white font-bold px-2 py-1 rounded text-[11px]">Ver Cupom</button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* MODAL CUPOM NÃO FISCAL DE VENDA (SOFTCOM STYLE) */}
        {cupomModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-gray-300 font-mono text-xs text-gray-800 relative">
              <button onClick={() => setCupomModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg font-bold">✕</button>

              <div className="text-center space-y-1 border-b-2 border-dashed border-gray-300 pb-3">
                <div className="flex justify-center mb-2">
                  <img src={empresa.logoUrl || '/logo-publicarte.png'} alt="Public Arte" className="h-10 object-contain" />
                </div>
                <h3 className="font-extrabold text-sm uppercase text-gray-900 tracking-wider">{empresa.nome}</h3>
                <p className="text-[10px] text-gray-500">{empresa.endereco} - {empresa.bairro}</p>
                <p className="text-[10px] text-gray-500">{empresa.cidade} · Tel: {empresa.whatsapp}</p>
                <div className="mt-2 text-xs font-bold bg-gray-100 py-1 px-3 rounded inline-block">COMPROVANTE NÃO FISCAL · {cupomModal.id}</div>
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
                    <div className="flex justify-between text-gray-600"><span>Valor Recebido:</span><span>R$ {(cupomModal.valorRecebido || cupomModal.total).toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold text-emerald-600"><span>Troco:</span><span>R$ {(cupomModal.troco || 0).toFixed(2)}</span></div>
                  </>
                )}

                {cupomModal.prazo && (
                  <div className="bg-amber-50 p-2 rounded text-amber-900 font-bold text-[10px] mt-2">
                    ⚠️ Venda a Prazo / Saldo Restante: R$ {(cupomModal.total - cupomModal.pago).toFixed(2)}
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={() => window.print()} className="flex-1 bg-blue-900 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 hover:bg-blue-950 transition">
                  <Printer size={15} /> Imprimir Recibo
                </button>
                <button
                  onClick={() => {
                    let text = `*${empresa.nome.toUpperCase()} - COMPROVANTE DE VENDA ${cupomModal.id}*\n`;
                    text += `*Cliente:* ${cupomModal.cliente}\n*Data:* ${cupomModal.data}\n\n*ITENS:*\n`;
                    cupomModal.itens.forEach((it) => (text += `• ${it.qtd}x ${it.produto} - R$ ${it.total.toFixed(2)}\n`));
                    text += `\n*TOTAL:* R$ ${cupomModal.total.toFixed(2)}\n*Forma de Pagamento:* ${cupomModal.formaPagamento}\n\nObrigado pela preferência!`;
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
