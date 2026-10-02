import React from 'react';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

const ProductCard = ({ product, formatarPreco, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 group">
      {/* Imagem */}
      <div className="w-full h-52 bg-slate-900 relative flex items-center justify-center overflow-hidden">
        <img
          src={product.imagem_url || product.imageUrl || product.foto}
          alt={product.name || product.nome}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-blue-950/80 backdrop-blur text-blue-200 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-blue-500/30 uppercase">
          {product.brandName || product.categoria || 'Public Arte'}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <h2 className="text-base font-extrabold text-blue-950 group-hover:text-blue-600 transition-colors leading-snug">
            {product.name || product.nome}
          </h2>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {product.observacao || product.description || 'Comunicação Visual Profissional com acabamento de alta qualidade.'}
          </p>
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 font-semibold block uppercase">Preço a partir de:</span>
            <div className="text-emerald-600 text-lg font-black flex items-baseline gap-1.5 flex-wrap">
              <span>{formatarPreco(product.price || product.preco)}</span>
              <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200 uppercase">
                / {product.unidade || 'm²'}
              </span>
            </div>
          </div>

          {/* Botão de personalização e adicionar à sacola */}
          <button
            type="button"
            onClick={() => onSelect && onSelect(product)}
            className="bg-blue-900 hover:bg-blue-800 text-white font-extrabold px-4 py-2.5 rounded-xl shadow-md hover:shadow-blue-900/30 flex items-center gap-2 transition text-xs cursor-pointer"
          >
            <ShoppingBag size={15} />
            <span>Comprar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
