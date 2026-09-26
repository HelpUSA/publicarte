import React from 'react';
import { useLanguage } from '../lib/i18n';

const BrandGrid = ({ categoriaSelecionada, onCategoriaSelect }) => {
  const { t } = useLanguage();

  const servicosGraficos = [
    {
      id: 1,
      nameKey: 'catBanners',
      descKey: 'descBanners',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      nameKey: 'catStickers',
      descKey: 'descStickers',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      nameKey: 'catSigns',
      descKey: 'descSigns',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      nameKey: 'catScreenprint',
      descKey: 'descScreenprint',
      image: 'https://images.unsplash.com/photo-1622445268465-8438165a2683?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 5,
      nameKey: 'catPrintshop',
      descKey: 'descPrintshop',
      image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 6,
      nameKey: 'catGiveaways',
      descKey: 'descGiveaways',
      image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 7,
      nameKey: 'catVinylStickers',
      descKey: 'descVinylStickers',
      image: 'https://images.unsplash.com/photo-1601234567890-abcdef123456?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 8,
      nameKey: 'catScreenPrintingDTF',
      descKey: 'descScreenPrintingDTF',
      image: 'https://images.unsplash.com/photo-1601234567891-abcdef123457?w=600&auto=format&fit=crop&q=80'
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
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400?text=Imagem+Indisponível';
                  }}
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