import React from 'react';
import { Printer, Image, FileText, Layout, Sparkles, Tag, Shield, Clock } from 'lucide-react';

const servicosGraficos = [
  { id: 1, name: 'Banners & Lonas', icon: Image, desc: 'Lonas de alta durabilidade com ilhós e acabamento premium' },
  { id: 2, name: 'Adesivos Vinílicos', icon: Tag, desc: 'Recorte eletrônico, transparente, jateado e microperfurado' },
  { id: 3, name: 'Placas & Fachadas', icon: Layout, desc: 'Metalon, acrílico e ACM para empresas e lojas' },
  { id: 4, name: 'Serigrafia & DTF', icon: Sparkles, desc: 'Estamparia em tecidos, camisetas e ecobags' },
  { id: 5, name: 'Gráfica Rápida', icon: Printer, desc: 'Cartões de visita, panfletos, pastas e receituários' },
  { id: 6, name: 'Brindes Promocionais', icon: FileText, desc: 'Canecas, copos, blocos de notas e chaveiros' },
];

const BrandGrid = ({ categoriaSelecionada, onCategoriaSelect }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Especialidades & Soluções</h2>
        <p className="text-gray-600 text-sm mt-1">Selecione uma categoria para filtrar os serviços disponíveis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {servicosGraficos.map((serv) => {
          const Icon = serv.icon;
          const isSelected = categoriaSelecionada === serv.name;
          return (
            <div
              key={serv.id}
              onClick={() => onCategoriaSelect(isSelected ? '' : serv.name)}
              className={`p-4 rounded-xl text-center cursor-pointer transition-all duration-300 border flex flex-col items-center justify-between ${
                isSelected
                  ? 'bg-blue-800 text-white border-blue-800 shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:shadow-md'
              }`}
            >
              <div className={`p-3 rounded-full mb-2 ${isSelected ? 'bg-white/20' : 'bg-blue-50 text-blue-700'}`}>
                <Icon size={24} />
              </div>
              <h3 className="font-semibold text-xs sm:text-sm">{serv.name}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BrandGrid;
