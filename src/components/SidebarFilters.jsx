import React from 'react';

const SidebarFilters = ({ categories, onFilterSelect }) => {
  return (
    <aside className="w-full md:w-1/4 p-4 border-r border-gray-200">
      <h2 className="font-bold text-lg mb-4">Categoria</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              className="text-left w-full hover:underline"
              onClick={() => onFilterSelect('category', cat.id)}
            >
              {cat.name} ({cat.total})
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarFilters;
