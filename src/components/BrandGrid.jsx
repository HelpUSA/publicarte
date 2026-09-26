import React from 'react';
import { useLanguage } from '../lib/i18n';

const BrandGrid = ({ categoriaSelecionada, onCategoriaSelect }) => {
  const { t } = useLanguage();

  const servicosGraficos = [
    {
      id: 1,
      nameKey: 'catBanners',
      descKey: 'descBanners',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      nameKey: 'catStickers',
      descKey: 'descStickers',
      image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      nameKey: 'catSigns',
      descKey: 'descSigns',
      image: 'https://images.unsplash.com/photo-1542744094-3a3172720449?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 4,
      nameKey: 'catScreenprint',
      descKey: 'descScreenprint',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 5,
      nameKey: 'catPrintshop',
      descKey: 'descPrintshop',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 6,
      nameKey: 'catGiveaways',
      descKey: 'descGiveaways',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=60'
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
          {t('specialtiesTitle')}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm mt-1">
          {t('specialtiesSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {servicosGraficos.map((serv) => {
          const title = t(serv.nameKey);
          const isSelected = categoriaSelecionada === title;
          return (
            <div
              key={serv.id}
              onClick={() => onCategoriaSelect(isSelected ? '' : title)}
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
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 transition-opacity ${isSelected ? 'bg-blue-900/30' : 'bg-black/10 group-hover:bg-transparent'}`} />
              </div>

              {/* Título */}
              <div className="p-3 text-center flex-grow flex flex-col justify-center">
                <h3 className={`font-bold text-xs sm:text-sm ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                  {title}
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
