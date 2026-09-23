import React from 'react';

const servicosGraficos = [
  {
    id: 1,
    name: 'Banners & Lonas',
    desc: 'Lonas de alta durabilidade com ilhós e acabamento premium',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    name: 'Adesivos Vinílicos',
    desc: 'Recorte eletrônico, transparente, jateado e microperfurado',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    name: 'Placas & Fachadas',
    desc: 'Metalon, acrílico e ACM para empresas e lojas',
    image: 'https://images.unsplash.com/photo-1542744094-3a3172720449?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 4,
    name: 'Serigrafia & DTF',
    desc: 'Estamparia em tecidos, camisetas e ecobags',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 5,
    name: 'Gráfica Rápida',
    desc: 'Cartões de visita, panfletos, pastas e receituários',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 6,
    name: 'Brindes Promocionais',
    desc: 'Canecas, copos, blocos de notas e chaveiros',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=60'
  },
];

const BrandGrid = ({ categoriaSelecionada, onCategoriaSelect }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950">Especialidades & Soluções</h2>
        <p className="text-gray-600 text-xs sm:text-sm mt-1">
          Clique nas especialidades abaixo para ver os serviços e produtos em destaque
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {servicosGraficos.map((serv) => {
          const isSelected = categoriaSelecionada === serv.name;
          return (
            <div
              key={serv.id}
              onClick={() => onCategoriaSelect(isSelected ? '' : serv.name)}
              className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-900 text-white border-blue-900 shadow-xl scale-105 ring-4 ring-blue-300'
                  : 'bg-white text-gray-800 border-gray-200 hover:border-blue-400 hover:shadow-lg'
              }`}
            >
              {/* Imagem representativa do serviço */}
              <div className="w-full h-28 bg-gray-100 overflow-hidden relative">
                <img
                  src={serv.image}
                  alt={serv.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 transition-opacity ${isSelected ? 'bg-blue-900/30' : 'bg-black/10 group-hover:bg-transparent'}`} />
              </div>

              {/* Título */}
              <div className="p-3 text-center flex-grow flex flex-col justify-center">
                <h3 className={`font-bold text-xs sm:text-sm ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                  {serv.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BrandGrid;
