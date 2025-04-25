import React from "react";

interface FilterPanelProps {
  genres: string[];
  activeFilters: string[];
  toggleFilter: (genre: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({genres, activeFilters, toggleFilter }) => {
  return (
    <div className="mb-4">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => toggleFilter(genre)}
          className={`px-4 py-1 m-1 rounded ${activeFilters.includes(genre) ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default FilterPanel;
