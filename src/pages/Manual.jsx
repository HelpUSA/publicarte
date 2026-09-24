import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import {
  BookOpen,
  ArrowLeft,
  ShoppingCart,
  Package,
  DollarSign,
  Users,
  Building2,
  Settings,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function Manual() {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <Header />

      <main className="max-w-5xl mx-auto px-4 pt-24 pb-16 w-full flex-1">
        {/* Header do Manual */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2">
              <BookOpen size={16} /> {t('manualDocBadge') || 'Documentação Oficial Public Arte'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
              Manual Completo do Sistema de Gestão & PDV
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Guia detalhado de operação para o proprietário Tércio Grassi e equipe
            </p>
          </div>

          <Link
            to="/admin"
            className="bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition"
          >
            <ArrowLeft size={16} /> {t('btnBackAdmin') || 'Voltar para Área Admin'}
          </Link>
        </div>

        <div className="space-y-6">
          {/* CREDENCIAIS E PERFIS DE ACESSO */}
          <div className="bg-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-emerald-400" size={28} />
              <div>
                <h2 className="text-xl font-extrabold">Níveis de Acesso & Credenciais do Sistema</h2>
                <p className="text-blue-200 text-xs">Acesse em <code className="bg-white/20 text-white px-2 py-0.5 rounded font-mono">https://publicarte.helpusbr.com/admin</code></p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <UserCheck size={16} /> Perfil 1: Administrador (Tércio)
                </div>
                <div className="text-xs text-blue-100">Acesso Total: Relatórios, Cadastros, Financeiro, Configurações e PDV.</div>
                <div className="bg-black/30 p-2.5 rounded-xl text-xs space-y-1 font-mono">
                  <div><strong>Usuário:</strong> <span className="text-emerald-300">tercio</span></div>
                  <div><strong>Senha:</strong> <span className="text-emerald-300">admin1993</span></div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-blue-300 font-bold text-xs uppercase tracking-wider">
                  <UserCheck size={16} /> Perfil 2: Vendedor / Funcionário
                </div>
                <div className="text-xs text-blue-100">Acesso Restrito: Exclusivamente Frente de Caixa (PDV) e Orçamentos.</div>
                <div className="bg-black/30 p-2.5 rounded-xl text-xs space-y-1 font-mono">
                  <div><strong>Usuário:</strong> <span className="text-blue-300">vendedor</span></div>
                  <div><strong>Senha:</strong> <span className="text-blue-300">venda123</span></div>
                </div>
              </div>
            </div>
            <p className="text-xs text-blue-300 italic pt-1">
              💡 <strong>Dica do Gestor:</strong> O usuário Admin possui um seletor no topo da tela (<em>"Simular Perfil: Admin / Vendedor"</em>) para testar exatamente o que os funcionários visualizam.
            </p>
          </div>

          {/* ESTRUTURA COMPLETA DE MÓDULOS */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-8">

            {/* Módulo 1: Frente de Caixa / PDV */}
            <div className="border-b pb-6 space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-blue-100 rounded-xl text-blue-800">
                  <ShoppingCart size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">1. Frente de Caixa (PDV Softcom com Fotos)</h3>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ⚡ Agilidade no balcão sem travamento de estoque
                  </span>
                </div>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-2 pl-2">
                <li><strong>Grade Visual com Fotos:</strong> Os produtos cadastrados aparecem com suas fotos no catálogo para seleção rápida em 1 clique.</li>
                <li><strong>Identificação do Cliente:</strong> Digite o nome/WhatsApp ou selecione um cliente cadastrado (ou mantenha <em>"Cliente Balcão"</em>).</li>
                <li><strong>Item Avulso / Sob Medida:</strong> Botão <code>+ Adicionar Item Avulso</code> para registrar serviços sob medida com valor personalizado na hora.</li>
                <li><strong>Cálculo de Troco:</strong> Ao selecionar pagamento em Dinheiro, informe o valor entregue para calcular o troco automático instantaneamente.</li>
                <li><strong>Venda A Prazo (Fiado):</strong> Informe quanto o cliente deu de entrada. O saldo restante vai direto para o controle de Contas a Receber.</li>
                <li><strong>Cupom Não Fiscal:</strong> Emissão de recibo estilo bobina térmica com botões de <strong>Imprimir (🖨️)</strong> e <strong>Enviar no WhatsApp (📲)</strong>.</li>
              </ul>
            </div>

            {/* Módulo 2: Clientes & Histórico */}
            <div className="border-b pb-6 space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-indigo-100 rounded-xl text-indigo-800">
                  <Users size={22} />
                </div>
                <h3 className="text-lg font-bold">2. Gestão de Clientes & Histórico de Compras</h3>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-2 pl-2">
                <li><strong>Cadastro Completo:</strong> Nome, CPF/CNPJ, WhatsApp, E-mail e Endereço de entrega.</li>
                <li><strong>Modal de Histórico de Compras:</strong> Clique em <code>📋 Histórico</code> no cliente para visualizar todas as compras já realizadas, datas, totais e status de pagamento.</li>
              </ul>
            </div>

            {/* Módulo 3: Produtos & Fotos */}
            <div className="border-b pb-6 space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-purple-100 rounded-xl text-purple-800">
                  <Package size={22} />
                </div>
                <h3 className="text-lg font-bold">3. Catálogo de Produtos, Fotos & Margem de Lucro</h3>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-2 pl-2">
                <li><strong>Campos do Produto:</strong> Nome, Foto (URL da imagem), Categoria, Preço de Custo, Preço de Venda e Unidade (`un`, `m²`, `pacote`, `milheiro`, `serviço`).</li>
                <li><strong>Margem de Lucro Automática:</strong> O sistema calcula a porcentagem de margem de lucro (% lucro) em tempo real no cadastro.</li>
                <li><strong>Edição e Exclusão:</strong> Botão azul de Lápis (<code>✏️ Editar</code>) para alterar dados e Lixeira Vermelha (<code>🗑️ Excluir</code>) para remover.</li>
              </ul>
            </div>

            {/* Módulo 4: Funcionários */}
            <div className="border-b pb-6 space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-teal-100 rounded-xl text-teal-800">
                  <UserCheck size={22} />
                </div>
                <h3 className="text-lg font-bold">4. Cadastro de Funcionários & Cargos</h3>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-2 pl-2">
                <li>Cadastre a equipe com Nome, Cargo/Função (ex: Vendedor, Impressor, Designer, Gerente), WhatsApp, E-mail e Nível de Acesso no sistema.</li>
              </ul>
            </div>

            {/* Módulo 5: Fornecedores */}
            <div className="border-b pb-6 space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-amber-100 rounded-xl text-amber-800">
                  <Building2 size={22} />
                </div>
                <h3 className="text-lg font-bold">5. Cadastros de Fornecedores</h3>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-2 pl-2">
                <li>Registre seus fornecedores com Razão Social/Empresa, <strong>Pessoa de Contato ("Pessoa que falo")</strong>, WhatsApp direto, Endereço e Categoria de suprimento (ex: Lonas, Tintas, Vinil, Chapa ACM).</li>
              </ul>
            </div>

            {/* Módulo 6: Financeiro & Caixa */}
            <div className="border-b pb-6 space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-800">
                  <DollarSign size={22} />
                </div>
                <h3 className="text-lg font-bold">6. Financeiro, Controle de Caixa & Fiado</h3>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-2 pl-2">
                <li><strong>Resumo Financeiro:</strong> Faturamento total recebido do dia e saldo pendente em Contas a Receber.</li>
                <li><strong>Quitar Fiado:</strong> Clique em <code>Quitar Fiado</code> na lista de vendas a prazo assim que o cliente efetuar o pagamento restante.</li>
                <li><strong>Reemitir Cupom:</strong> Clique em <code>Ver Recibo</code> em qualquer venda para reabrir o comprovante e imprimir ou enviar pelo WhatsApp.</li>
              </ul>
            </div>

            {/* Módulo 7: Configurações */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-slate-100 rounded-xl text-slate-800">
                  <Settings size={22} />
                </div>
                <h3 className="text-lg font-bold">7. Configurações da Empresa</h3>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-2 pl-2">
                <li>Personalize Razão Social, Nome Fantasia, CNPJ, Endereço completo da loja, WhatsApp de atendimento, Chave PIX oficial e URL da Logo da Public Arte.</li>
              </ul>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
