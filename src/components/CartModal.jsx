import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, CheckCircle2, MessageSquare, MapPin, CreditCard, Send } from 'lucide-react';

export default function CartModal({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  formatarPreco,
  whatsappNumber = '5583986104153'
}) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' | 'takeout'
  const [customer, setCustomer] = useState({
    nome: '',
    telefone: '',
    endereco: '',
    bairro: '',
    cidade: 'João Pessoa - PB',
    pagamento: 'pix',
    observacoes: ''
  });

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.precoTotal || item.preco * item.quantidade), 0);
  const taxaEntrega = orderType === 'delivery' ? 15.00 : 0.00;
  const total = subtotal + taxaEntrega;

  const handleSendWhatsAppOrder = (e) => {
    e.preventDefault();
    if (!customer.nome.trim()) {
      alert('Por favor, informe seu nome.');
      return;
    }
    if (!customer.telefone.trim()) {
      alert('Por favor, informe seu telefone de contato.');
      return;
    }
    if (orderType === 'delivery' && !customer.endereco.trim()) {
      alert('Por favor, informe o endereço de entrega.');
      return;
    }

    let msg = `🎨 *NOVO PEDIDO - PUBLIC ARTE (COMUNICAÇÃO VISUAL)*\n`;
    msg += `-----------------------------------\n`;
    msg += `👤 *Cliente:* ${customer.nome.trim()}\n`;
    msg += `📞 *Telefone:* ${customer.telefone.trim()}\n`;
    msg += `📍 *Tipo:* ${orderType === 'delivery' ? 'Entrega em Domicílio / Instalação' : 'Retirada na Loja'}\n`;

    if (orderType === 'delivery') {
      msg += `🏠 *Endereço:* ${customer.endereco.trim()}\n`;
      if (customer.bairro.trim()) msg += `🏙️ *Bairro:* ${customer.bairro.trim()}\n`;
      msg += `📍 *Cidade:* ${customer.cidade}\n`;
    }

    msg += `-----------------------------------\n`;
    msg += `🛒 *ITENS DO PEDIDO:*\n\n`;

    cart.forEach((cItem, index) => {
      msg += `*${index + 1}. ${cItem.quantidade}x ${cItem.nome}*\n`;
      if (cItem.dimensoes) {
        msg += `   └ 📏 _Dimensões:_ ${cItem.dimensoes}\n`;
      }
      if (cItem.acabamento) {
        msg += `   └ 🛠️ _Acabamento:_ ${cItem.acabamento}\n`;
      }
      if (cItem.observacao) {
        msg += `   └ 📝 _Obs:_ ${cItem.observacao}\n`;
      }
      msg += `   └ 💰 _Valor:_ ${formatarPreco(cItem.precoTotal || cItem.preco * cItem.quantidade)}\n\n`;
    });

    msg += `-----------------------------------\n`;
    msg += `💵 *Subtotal:* ${formatarPreco(subtotal)}\n`;
    if (orderType === 'delivery') {
      msg += `🚚 *Taxa de Entrega/Frete:* ${formatarPreco(taxaEntrega)}\n`;
    }
    msg += `💰 *TOTAL DO PEDIDO:* ${formatarPreco(total)}\n`;

    msg += `-----------------------------------\n`;
    msg += `💳 *Forma de Pagamento:* `;
    if (customer.pagamento === 'pix') msg += `Pix (Desconto de 5% à vista)\n`;
    else if (customer.pagamento === 'cartao') msg += `Cartão de Crédito / Débito\n`;
    else if (customer.pagamento === 'boleto') msg += `Faturamento / Boleto da Empresa\n`;

    if (customer.observacoes.trim()) {
      msg += `📝 *Observações Gerais:* ${customer.observacoes.trim()}\n`;
    }

    msg += `\nObrigado por escolher a *Public Arte — Comunicação Visual*! 🎨✨`;

    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMsg}`;

    onClearCart();
    setShowCheckout(false);
    onClose();

    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-lg h-full flex flex-col shadow-2xl text-slate-100 relative">
        {/* Top Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Sua Sacola de Compras</h3>
              <p className="text-xs text-slate-400">{cart.length} {cart.length === 1 ? 'item selecionado' : 'itens selecionados'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!showCheckout ? (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Sua sacola está vazia</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Navegue pelo catálogo e adicione os serviços de comunicação visual à sua sacola.
                  </p>
                </div>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={item.cartId || index} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      {item.foto && (
                        <img src={item.foto} alt={item.nome} className="w-14 h-14 rounded-xl object-cover border border-slate-800" />
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-white leading-snug">{item.nome}</h4>
                        <p className="text-[11px] text-blue-400 font-medium mt-0.5">{item.categoria}</p>
                        {item.dimensoes && (
                          <p className="text-[11px] text-slate-400">📏 {item.dimensoes}</p>
                        )}
                        {item.acabamento && (
                          <p className="text-[11px] text-slate-400">🛠️ {item.acabamento}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                      title="Remover item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
                      <button
                        onClick={() => onUpdateQuantity(index, -1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-200 transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-white px-2">{item.quantidade}</span>
                      <button
                        onClick={() => onUpdateQuantity(index, 1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-200 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-extrabold text-emerald-400">
                        {formatarPreco(item.precoTotal || item.preco * item.quantidade)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Checkout Form (Padrão Queijeira 504) */
          <form onSubmit={handleSendWhatsAppOrder} className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 space-y-1">
              <span className="font-bold text-white block">📋 Finalização de Pedido via WhatsApp</span>
              <p className="text-slate-300">Preencha seus dados abaixo para enviar o orçamento direto para o atendimento da Public Arte.</p>
            </div>

            {/* Tipo de Pedido */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                  orderType === 'delivery' ? 'bg-blue-600 text-white border-blue-500 shadow-lg' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <MapPin className="w-4 h-4" /> Entrega / Instalação
              </button>
              <button
                type="button"
                onClick={() => setOrderType('takeout')}
                className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                  orderType === 'takeout' ? 'bg-blue-600 text-white border-blue-500 shadow-lg' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <ShoppingBag className="w-4 h-4" /> Retirada no Balcão
              </button>
            </div>

            {/* Campos do Cliente */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Seu Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={customer.nome}
                  onChange={(e) => setCustomer({ ...customer, nome: e.target.value })}
                  placeholder="Ex: Carlos Silva"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp / Telefone *</label>
                <input
                  type="text"
                  required
                  value={customer.telefone}
                  onChange={(e) => setCustomer({ ...customer, telefone: e.target.value })}
                  placeholder="(83) 99999-9999"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {orderType === 'delivery' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Endereço de Entrega *</label>
                    <input
                      type="text"
                      required
                      value={customer.endereco}
                      onChange={(e) => setCustomer({ ...customer, endereco: e.target.value })}
                      placeholder="Rua, número, complemento"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Bairro</label>
                    <input
                      type="text"
                      value={customer.bairro}
                      onChange={(e) => setCustomer({ ...customer, bairro: e.target.value })}
                      placeholder="Bairro em João Pessoa"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Forma de Pagamento</label>
                <select
                  value={customer.pagamento}
                  onChange={(e) => setCustomer({ ...customer, pagamento: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="pix">Pix (Desconto de 5% à vista)</option>
                  <option value="cartao">Cartão de Crédito / Débito</option>
                  <option value="boleto">Faturamento / Boleto para Empresa</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Observações do Pedido / Arte</label>
                <textarea
                  rows={2}
                  value={customer.observacoes}
                  onChange={(e) => setCustomer({ ...customer, observacoes: e.target.value })}
                  placeholder="Ex: Já tenho a arte pronta / Preciso que criem o design..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
            </div>
          </form>
        )}

        {/* Bottom Total & Checkout Bar */}
        {cart.length > 0 && (
          <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-200">{formatarPreco(subtotal)}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between text-slate-400">
                  <span>Entrega / Frete:</span>
                  <span className="font-semibold text-slate-200">{formatarPreco(taxaEntrega)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-900">
                <span>Total Estimado:</span>
                <span className="text-emerald-400">{formatarPreco(total)}</span>
              </div>
            </div>

            {!showCheckout ? (
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition cursor-pointer text-xs sm:text-sm"
              >
                <span>Avançar para Finalização</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="w-1/3 py-3 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-2xl border border-slate-800 transition text-xs"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={handleSendWhatsAppOrder}
                  className="w-2/3 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition cursor-pointer text-xs sm:text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Pedido WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
