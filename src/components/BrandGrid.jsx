import React from 'react';

const marcas = [
  { id: 1, name: 'Caloi' },
  { id: 2, name: 'Bradox' },
  { id: 3, name: 'Oggi' },
  { id: 4, name: 'Monark' },
  { id: 5, name: 'Absolute' },
  { id: 6, name: 'DNZ' },
  { id: 7, name: 'GTI' },
  { id: 8, name: 'Viking' },
  { id: 9, name: 'Samy' },
];

const BrandGrid = ({ marcaSelecionada, onMarcaSelect }) => {
  return (
    <section className="max-w-7xl mx-auto p-4">
      <h2 className="text-xl font-semibold text-center mb-4">Filtrar por Marca</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <div
          className={`border rounded p-3 text-center font-medium cursor-pointer shadow transition ${
            !marcaSelecionada ? 'bg-blue-600 text-white' : 'bg-white hover:bg-blue-100'
          }`}
          onClick={() => onMarcaSelect('')}
        >
          Todas
        </div>
        {marcas.map((marca) => (
          <div
            key={marca.id}
            className={`border rounded p-3 text-center font-medium cursor-pointer shadow transition ${
              marca.name === marcaSelecionada
                ? 'bg-blue-600 text-white'
                : 'bg-white hover:bg-blue-100'
            }`}
            onClick={() => onMarcaSelect(marca.name)}
          >
            {marca.name}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandGrid;
