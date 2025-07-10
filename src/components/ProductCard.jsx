import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, formatarPreco }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
      {/* Imagem */}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-contain max-h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
          <p className="text-sm text-gray-500 mb-2">{product.brandName}</p>

          <div className="text-green-600 text-xl font-bold">
            {formatarPreco(product.price)}
          </div>
        </div>

        {/* Botão de detalhes */}
        <Link
          to={`/produto/${product.id}`}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-center text-sm transition-colors duration-200"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
