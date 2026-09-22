import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ArrowLeft,
  ShoppingCart,
  FileSpreadsheet,
  Package,
  DollarSign,
  Boxes,
  Smartphone,
  Lock,
  CheckCircle2,
  Printer,
  Send,
  HelpCircle
} from 'lucide-react';

export default function Manual() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        {/* Header do Manual */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2">
              <BookOpen size={16} /> Guia Oficial do Usuário
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
              Manual do Sistema de Gestão – Public Arte
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Orientações completas de operação para o proprietário Tércio Grassi e equipe
            </p>
          </div>

          <Link
            to="/admin"
            className="bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition"
          >
            <ArrowLeft size={16} /> Voltar ao Painel Admin
          </Link>
        </div>

        <div className="space-y-6">
          {/* CREDENCIAIS */}
          <div className="bg-blue-900 text-white rounded-3xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block">
                Acesso Seguro do Gestor
              </span>
              <h2 className="text-xl font-bold mt-1">Credenciais de Autenticação</h2>
              <p className="text-blue-200 text-xs mt-1">
                O acesso à Área Administrativa é restrito exclusivamente ao usuário credenciado.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-2xl text-xs space-y-1">
              <div>
                <strong>Usuário:</strong> <code className="bg-white text-blue-900 px-2 py-0.5 rounded font-mono font-bold">tercio</code>
              </div>
              <div>
                <strong>Senha:</strong> <code className="bg-white text-blue-900 px-2 py-0.5 rounded font-mono font-bold">admin1993</code>
              </div>
            </div>
          </div>

          {/* MÓDULOS DO SISTEMA */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-8">

            {/* Módulo 1 */}
            <div className="border-b pb-6 space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-blue-100 rounded-xl text-blue-800">
                  <ShoppingCart size={22} />
                </div>
                <h3 className="text-lg font-bold">1. Vendas & Comandas de Produção (Balcão)</h3>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Este módulo gerencia todos os trabalhos de comunicação visual em andamento na gráfica. Cada pedido gerado vira uma <strong>Comanda de Produção</strong> com status rastreável.
              </p>
              <div className="bg-gray-50 p-4 rounded-2xl text-xs text-gray-700 space-y-2 border">
                <div className="font-bold text-blue-900 uppercase">Como Operar:</div>
                <ul className="list-disc list-inside space-y-1">
                  <li>Preencha o <strong>Nome do Cliente</strong>, <strong>Telefone</strong> e selecione o <strong>Produto</strong>.</li>
                  <li>Digite a <strong>Quantidade</strong> e o <strong>Pagamento Inicial / Sinal</strong> dado no balcão.</li>
                  <li>Se for uma venda sem entrada (fiado), marque a caixa <strong>"Venda a Prazo"</strong>.</li>
                  <li>Atualize o status conforme a evolução do trabalho: <em>Aguardando → Em Impressão → Em Acabamento → Pronto para Retirada → Entregue</em>.</li>
                  <li>Ao entregar o serviço e receber o restante, clique em <strong>"Dar Baixa no Pagamento"</strong>.</li>
                </ul>
              </div>
            </div>

            {/* Módulo 2 */}
            <div className="border-b pb-6 space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-800">
                  <FileSpreadsheet size={22} />
                </div>
                <h3 className="text-lg font-bold">2. Emissão & Envio de Orçamentos (Quotes)</h3>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Elabore propostas comerciais completas para empresas, fachadas, eventos ou pacotes promocionais.
              </p>
              <div className="bg-gray-50 p-4 rounded-2xl text-xs text-gray-700 space-y-2 border">
                <div className="font-bold text-emerald-900 uppercase">Recursos do Orçamento:</div>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Espelho / Imprimir:</strong> Gera o recibo/orçamento timbrado da Public Arte para impressão em papel ou salvar em PDF.</li>
                  <li><strong>Enviar via WhatsApp:</strong> Abre o aplicativo com a mensagem formatada para envio instantâneo ao cliente.</li>
                </ul>
              </div>
            </div>

            {/* Módulo 3 */}
            <div className="border-b pb-6 space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-purple-100 rounded-xl text-purple-800">
                  <Package size={22} />
                </div>
                <h3 className="text-lg font-bold">3. Gestão de Produtos & Insumos</h3>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Cadastre tanto os produtos comercializados ao cliente quanto os insumos consumidos pela gráfica (lonas, tintas eco-solvente, chapas de acrílico, pacotes de ilhós).
              </p>
            </div>

            {/* Módulo 4 */}
            <div className="border-b pb-6 space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-amber-100 rounded-xl text-amber-800">
                  <DollarSign size={22} />
                </div>
                <h3 className="text-lg font-bold">4. Financeiro, Caixa & Contas a Receber (Fiado)</h3>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Acompanhe o faturamento diário, realize o controle de <strong>Abertura e Fechamento de Caixa</strong> e efetue cobranças de vendas a prazo através do painel de <strong>Contas a Receber</strong>.
              </p>
            </div>

            {/* Módulo 5 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-indigo-100 rounded-xl text-indigo-800">
                  <Smartphone size={22} />
                </div>
                <h3 className="text-lg font-bold">5. Modo Smartphone POS</h3>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Interface simplificada acessível por qualquer celular conectado à internet para que os atendentes lancem comandas diretamente do balcão da gráfica.
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
