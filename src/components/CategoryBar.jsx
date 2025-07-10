import React from 'react';

const marcas = [
  'Absolute', 'Bradox', 'Caloi', 'DNZ', 'GTI', 'Monark', 'Oggi', 'Samy', 'Viking'
];

const CategoryBar = ({ onFiltroTextoChange, onMarcaSelect }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Busque por nome, marca ou categoria..."
          className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded shadow"
          onChange={(e) => onFiltroTextoChange(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          className="px-4 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          onClick={() => onMarcaSelect('')}
        >
          Todas
        </button>
        {marcas.map((marca) => (
          <button
            key={marca}
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => onMarcaSelect(marca)}
          >
            {marca}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
