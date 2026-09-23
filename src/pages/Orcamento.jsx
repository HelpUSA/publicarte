import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { useLanguage } from '../lib/i18n';
import { Calculator, Send, CheckCircle2, FileText } from 'lucide-react';

export default function Orcamento() {
  const { t } = useLanguage();
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [tipoServico, setTipoServico] = useState('Banner de Vinil');
  const [largura, setLargura] = useState('');
  const [altura, setAltura] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [detalhes, setDetalhes] = useState('');
  const [enviado, setEnviado] = useState(false);

  // Preço estimado básico por metro quadrado ou unidade
  const precosBase = {
    'Banner de Vinil': 45, // por m²
    'Adesivo Vinílico': 40, // por m²
    'Placa Metalon + Lona': 120, // por m²
    'Cartão de Visita (1000un)': 90, // por lote
    'Panfletos 10x14cm (1000un)': 130, // por lote
    'Serigrafia / Camisetas': 25, // por un
    'Brindes / Canecas': 28, // por un
  };

  const calcularEstimativa = () => {
    const preco = precosBase[tipoServico] || 50;
    const quant = parseInt(quantidade) || 1;

    if (['Banner de Vinil', 'Adesivo Vinílico', 'Placa Metalon + Lona'].includes(tipoServico)) {
      const l = parseFloat(largura.replace(',', '.')) || 1;
      const a = parseFloat(altura.replace(',', '.')) || 1;
      const area = l * a;
      return (area * preco * quant).toFixed(2);
    }
    return (preco * quant).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const estimativa = calcularEstimativa();
    const mensagem = `Olá, Public Arte! Gostaria de um orçamento:\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*Email:* ${email || 'Não informado'}\n*Serviço:* ${tipoServico}\n*Dimensões:* ${largura && altura ? `${largura}m x ${altura}m` : 'Padrão'}\n*Quantidade:* ${quantidade}\n*Detalhes:* ${detalhes || 'Sem observações'}\n*Estimativa Calculada:* R$ ${estimativa}`;

    const urlWhatsApp = `https://wa.me/5583986104153?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, '_blank');
    setEnviado(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16 w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
            <Calculator size={16} /> {t('quoteBadge')}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">
            {t('quotePageTitle')}
          </h1>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            {t('quotePageSubtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
          {enviado ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{t('successQuoteTitle')}</h2>
              <p className="text-gray-600 max-w-md mx-auto text-sm">
                {t('successQuoteMsg')}
              </p>
              <button
                onClick={() => setEnviado(false)}
                className="mt-4 bg-blue-800 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-900 transition"
              >
                {t('newQuoteBtn')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('labelName')}
                  </label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Maria Silva"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('labelPhone')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="Ex: (83) 99999-9999"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  {t('labelProductType')}
                </label>
                <select
                  value={tipoServico}
                  onChange={(e) => setTipoServico(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm bg-white"
                >
                  <option value="Banner de Vinil">Banner de Vinil ({t('catBanners')})</option>
                  <option value="Adesivo Vinílico">Adesivo Vinílico ({t('catStickers')})</option>
                  <option value="Placa Metalon + Lona">Placa Metalon ({t('catSigns')})</option>
                  <option value="Cartão de Visita (1000un)">Cartão de Visita ({t('catPrintshop')})</option>
                  <option value="Panfletos 10x14cm (1000un)">Panfletos Promocionais ({t('catPrintshop')})</option>
                  <option value="Serigrafia / Camisetas">Serigrafia / Camisetas ({t('catScreenprint')})</option>
                  <option value="Brindes / Canecas">Brindes ({t('catGiveaways')})</option>
                </select>
              </div>

              {['Banner de Vinil', 'Adesivo Vinílico', 'Placa Metalon + Lona'].includes(tipoServico) && (
                <div className="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <div>
                    <label className="block text-xs font-bold text-blue-900 uppercase mb-1">
                      {t('labelWidth')}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={largura}
                      onChange={(e) => setLargura(e.target.value)}
                      placeholder="Ex: 1.5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-blue-900 uppercase mb-1">
                      {t('labelHeight')}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={altura}
                      onChange={(e) => setAltura(e.target.value)}
                      placeholder="Ex: 1.0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('labelQuantity')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {t('labelEmailOpt')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  {t('labelDetails')}
                </label>
                <textarea
                  rows={3}
                  value={detalhes}
                  onChange={(e) => setDetalhes(e.target.value)}
                  placeholder={t('detailsPlaceholder')}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
                ></textarea>
              </div>

              {/* Card de estimativa em tempo real */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                    {t('estimatedTotal')}
                  </span>
                  <span className="text-3xl font-black text-emerald-700">
                    R$ {calcularEstimativa()}
                  </span>
                  <span className="text-[11px] text-emerald-600 block mt-0.5">
                    {t('disclaimer')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-200 flex items-center justify-center gap-2 transition"
                >
                  <Send size={18} />
                  {t('sendWhatsAppBtn')}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
