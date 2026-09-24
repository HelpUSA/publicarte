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
  DollarSign
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
              <BookOpen size={16} /> {t('manualDocBadge')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
              Manual do Sistema de Gestão – Public Arte
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Guia simplificado para operação da Área Administrativa em 3 passos
            </p>
          </div>

          <Link
            to="/admin"
            className="bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition"
          >
            <ArrowLeft size={16} /> {t('btnBackAdmin')}
          </Link>
        </div>

        <div className="space-y-6">
          {/* CREDENCIAIS */}
          <div className="bg-blue-900 text-white rounded-3xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block">
                Acesso Seguro do Gestor
              </span>
              <h2 className="text-xl font-bold mt-1">Credenciais da Área Administrativa</h2>
              <p className="text-blue-200 text-xs mt-1">
                Acesse <code className="bg-white/20 text-white px-1.5 py-0.5 rounded">/admin</code> com seu usuário e senha.
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

          {/* ESTRUTURA EM 3 ABAS SIMPLIFICADAS */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-8">

            {/* Módulo 1: Frente de Caixa / PDV Softcom */}
            <div className="border-b pb-6 space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-blue-100 rounded-xl text-blue-800">
                  <ShoppingCart size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">1. Aba "🛒 Frente de Caixa (PDV)"</h3>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ⚡ Modelo Softcom Balcão - Vendas sem controle de estoque
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Desenvolvida para registrar vendas presenciais no balcão ou por atendimento via WhatsApp:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-2 pl-2">
                <li><strong>Passo 1:</strong> Preencha o nome e WhatsApp do cliente (ou mantenha <em>"Cliente Balcão"</em>).</li>
                <li><strong>Passo 2:</strong> Clique no produto desejado no catálogo ou adicione um <em>"+ Item Avulso"</em> para cobrir serviços sob medida.</li>
                <li><strong>Passo 3:</strong> Insira um desconto se desejar e selecione a forma de pagamento (PIX, Cartão de Crédito, Cartão de Débito, Dinheiro ou A Prazo). Se for Dinheiro, informe quanto o cliente entregou para ver o troco automático.</li>
                <li><strong>Passo 4:</strong> Clique em <strong>"FINALIZAR VENDA (F9)"</strong>. O sistema registrará a venda e abrirá o comprovante timbrado para imprimir ou enviar no WhatsApp.</li>
              </ul>
            </div>

            {/* Módulo 2: Produtos & Serviços */}
            <div className="border-b pb-6 space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-purple-100 rounded-xl text-purple-800">
                  <Package size={22} />
                </div>
                <h3 className="text-lg font-bold">2. Aba "📦 Produtos & Serviços"</h3>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Cadastre e consulte os produtos da sua gráfica (Banners, Adesivos, Placas, Cartões, Serigrafia, Canecas):
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-1.5 pl-2">
                <li>Cadastre o nome do produto, categoria, preço unitário e unidade de medida (un, m², pacote, milheiro, serviço).</li>
                <li><strong>Sem estoque:</strong> você pode cadastrar e vender livremente qualquer produto sem travas numéricas.</li>
              </ul>
            </div>

            {/* Módulo 3: Financeiro & Vendas */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-blue-900">
                <div className="p-2.5 bg-amber-100 rounded-xl text-amber-800">
                  <DollarSign size={22} />
                </div>
                <h3 className="text-lg font-bold">3. Aba "💰 Financeiro & Vendas"</h3>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Acompanhe o desempenho financeiro e o histórico de vendas:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-1.5 pl-2">
                <li><strong>Faturamento Recebido:</strong> Soma total das vendas confirmadas e pagas.</li>
                <li><strong>Contas a Receber (Fiado):</strong> Saldo pendente das vendas efetuadas A Prazo. Clique em <strong>"Quitar Fiado"</strong> para dar baixa no pagamento.</li>
                <li><strong>Reemissão de Comprovantes:</strong> Clique em <strong>"Ver Recibo"</strong> em qualquer venda para reabrir o cupom não fiscal e imprimir ou enviar pelo WhatsApp.</li>
              </ul>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
