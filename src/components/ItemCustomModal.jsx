import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check, Calculator, Info, ShieldCheck } from 'lucide-react';

export default function ItemCustomModal({
  item,
  isOpen,
  onClose,
  onAddToCart,
  formatarPreco
}) {
  const [quantidade, setQuantidade] = useState(1);
  const [largura, setLargura] = useState(1.0);
  const [altura, setAltura] = useState(1.0);
  const [acabamento, setAcabamento] = useState('');
  const [observacao, setObservacao] = useState('');

  useEffect(() => {
    if (item) {
      setQuantidade(1);
      setLargura(1.0);
      setAltura(1.0);
      setObservacao('');

      // Opções de acabamento padrão por categoria
      if (item.categoria?.includes('Banners')) {
        setAcabamento('Ilhós nas pontas + Dobra reforçada');
      } else if (item.categoria?.includes('Adesivos')) {
        setAcabamento('Recorte eletrônico + Máscara de aplicação');
      } else if (item.categoria?.includes('Placas')) {
        setAcabamento('Estrutura em metalon + Lona tensionada');
      } else {
        setAcabamento('Padrão de fábrica');
      }
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const eCalculadoPorMetro = item.unidade === 'm²';
  const areaMetroQuadrado = eCalculadoPorMetro ? Math.max(0.25, largura * altura) : 1;
  const precoUnitarioFinal = (item.preco || 0) * areaMetroQuadrado;
  const precoTotalFinal = precoUnitarioFinal * quantidade;

  const handleAdd = () => {
    onAddToCart({
      ...item,
      quantidade,
      dimensoes: eCalculadoPorMetro ? `${largura.toFixed(2)}m x ${altura.toFixed(2)}m (${areaMetroQuadrado.toFixed(2)}m²)` : null,
      acabamento,
      observacao,
      precoUnitario: precoUnitarioFinal,
      precoTotal: precoTotalFinal
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden text-slate-100 relative">
        {/* Modal Header */}
        <div className="relative h-48 bg-slate-950 overflow-hidden">
          <img
            src={item.foto || item.imagem_url || 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=60'}
            alt={item.nome}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-5 right-5">
            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-extrabold border border-blue-500/30 uppercase">
              {item.categoria || 'Comunicação Visual'}
            </span>
            <h3 className="text-xl font-extrabold text-white mt-1 leading-tight">{item.nome}</h3>
          </div>
        </div>

        {/* Modal Form */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {item.observacao && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{item.observacao}</span>
            </div>
          )}

          {/* Calculadora de Metro Quadrado (m²) */}
          {eCalculadoPorMetro && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-blue-400" />
                <span>Calculadora de Medidas (m²)</span>
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Largura (metros)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.2"
                    value={largura}
                    onChange={(e) => setLargura(parseFloat(e.target.value) || 0.2)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Altura (metros)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.2"
                    value={altura}
                    onChange={(e) => setAltura(parseFloat(e.target.value) || 0.2)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="text-right text-[11px] text-blue-400 font-mono font-bold">
                Área Total: {areaMetroQuadrado.toFixed(2)} m²
              </div>
            </div>
          )}

          {/* Tipo de Acabamento */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Opção de Acabamento</label>
            <select
              value={acabamento}
              onChange={(e) => setAcabamento(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Ilhós nas pontas + Dobra reforçada">Ilhós nas pontas + Dobra reforçada</option>
              <option value="Bastão de madeira + Cordinha">Bastão de madeira + Cordinha</option>
              <option value="Recorte eletrônico de precisão">Recorte eletrônico de precisão</option>
              <option value="Verniz localizado UV">Verniz localizado UV</option>
              <option value="Sem acabamento (corte reto)">Sem acabamento (corte reto)</option>
            </select>
          </div>

          {/* Observação / Briefing da Arte */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Observação para o Pedido / Design</label>
            <textarea
              rows={2}
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Descreva detalhes como cores, texto ou informe se já possui a arte..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* Quantidade */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-300">Quantidade:</span>
            <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-slate-200 font-bold transition"
              >
                -
              </button>
              <span className="text-xs font-extrabold text-white px-2 font-mono">{quantidade}</span>
              <button
                type="button"
                onClick={() => setQuantidade(quantidade + 1)}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-slate-200 font-bold transition"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Valor Total:</span>
            <span className="text-lg font-extrabold text-emerald-400">{formatarPreco(precoTotalFinal)}</span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition cursor-pointer text-xs sm:text-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Adicionar à Sacola</span>
          </button>
        </div>
      </div>
    </div>
  );
}
