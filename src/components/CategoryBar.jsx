import React from 'react';
import { useLanguage } from '../lib/i18n';

const CategoryBar = ({ onFiltroTextoChange, onCategoriaSelect, categoriaSelecionada }) => {
  const { t } = useLanguage();

  const categoriasGraphicKeys = [
    'catBanners',
    'catStickers',
    'catSigns',
    'catScreenprint',
    'catPrintshop',
    'catGiveaways'
  ];

  return (
    <div className="mb-8 max-w-6xl mx-auto px-4">
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="w-full px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-white"
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
          {t('allCategories')}
        </button>
        {categoriasGraphicKeys.map((catKey) => {
          const catLabel = t(catKey);
          return (
            <button
              key={catKey}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                categoriaSelecionada === catLabel
                  ? 'bg-blue-800 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:text-blue-700'
              }`}
              onClick={() => onCategoriaSelect(catLabel)}
            >
              {catLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBar;
