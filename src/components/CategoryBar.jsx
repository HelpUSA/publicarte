import React from 'react';

const categoriasGraphic = [
  'Impressão Digital',
  'Banners & Lonas',
  'Adesivos & Rótulos',
  'Fachadas & Placas',
  'Serigrafia & DTF',
  'Brindes & Canecas',
  'Gráfica Rápida'
];

const CategoryBar = ({ onFiltroTextoChange, onCategoriaSelect, categoriaSelecionada }) => {
  return (
    <div className="mb-8 max-w-6xl mx-auto px-4">
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Buscar por produto, insumo ou serviço de comunicação visual..."
            className="w-full px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
            onChange={(e) => onFiltroTextoChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
            !categoriaSelecionada
              ? 'bg-blue-800 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => onCategoriaSelect('')}
        >
          Todas as Categorias
        </button>
        {categoriasGraphic.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
              categoriaSelecionada === cat
                ? 'bg-blue-800 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:text-blue-700'
            }`}
            onClick={() => onCategoriaSelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
