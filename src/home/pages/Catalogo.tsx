import React, { useState } from 'react';
import BookCard from '../../components/BookCard';
import FilterPanel from '../../components/FilterPanel';
import { useFetchData } from '../../hook/useFetchData';
import { useNotification } from '../../hook/useNotification';
import { Book } from '../../types/book';

const Catalogo: React.FC = () => {
  const { notify } = useNotification();
  const genres = ['romance', 'fantasy', 'mystery'];
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Book[]>(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  // URL para consumir la API que mencionaste
  const { data, loading } = useFetchData<any>(
    `https://openlibrary.org/people/mekBot/books/already-read.json`
  );
  console.log(data);

  const toggleFilter = (genre: string) => {
    setActiveFilters((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const toggleFavorite = (book: Book) => {
    const exists = favorites.find((b) => b.id === book.id);
    const updatedFavorites = exists
      ? favorites.filter((b) => b.id !== book.id)
      : [...favorites, book];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    notify(exists ? 'Libro removido de favoritos' : 'Libro agregado a favoritos');
  };

  // Filtrar los libros según los filtros activos
  const books = data?.reading_log_entries?.slice(0, 20).map((entry: any, index: number) => ({
    id: entry.logged_edition || `book-${index}`,
    title: entry.work.title || 'Título no disponible',
    author: entry.work.author_names ? entry.work.author_names[0] : 'Autor desconocido',
    cover: entry.work.cover_edition_key
      ? `https://covers.openlibrary.org/b/id/${entry.work.cover_edition_key}-M.jpg`
      : 'https://via.placeholder.com/150',
    publishYear: entry.work.first_publish_year || 'Año desconocido',
    genre: 'fantasy', // Asigna un género manualmente
    loggedDate: entry.logged_date
  })) || [];
  

  const filteredBooks = books.filter((book) => {
    if (activeFilters.length === 0) return true;
    return activeFilters.some((filter) => book.genre.toLowerCase().includes(filter.toLowerCase()));
  });
  

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">CATÁLOGO DE LIBROS</h1>
      <FilterPanel genres={genres} activeFilters={activeFilters} toggleFilter={toggleFilter} />
      {loading ? (
        <p>Cargando libros...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredBooks.slice(0, 20).map((book) => (
            <BookCard
              key={book.id}  // Usa un valor único para cada key
              book={book}
              isFavorite={favorites.some((fav) => fav.id === book.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalogo;
