import React, { useState } from 'react';
import BookCard from '../../components/BookCard';
import { useFetchData } from '../../hook/useFetchData';
import { useNotification } from '../../hook/useNotification';
import { Book } from '../../types/book';

const Catalogo: React.FC = () => {
  const { notify } = useNotification();
  const [favorites, setFavorites] = useState<Book[]>(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  const [filter, setFilter] = useState<string>(''); // <--- Filtro agregado aquí

  const { data, loading } = useFetchData<any>(
    `https://openlibrary.org/people/mekBot/books/already-read.json`
  );

  const books = data?.reading_log_entries?.slice(0, 97).map((entry: any, index: number) => ({
    id: entry.logged_edition || `book-${index}`,
    title: entry.work.title || 'Título no disponible',
    author: entry.work.author_names ? entry.work.author_names[0] : 'Autor desconocido',
    cover: entry.work.cover_id
      ? `https://covers.openlibrary.org/b/id/${entry.work.cover_id}-M.jpg`
      : 'https://via.placeholder.com/150',
    publishYear: entry.work.first_publish_year || 'Año desconocido',
  })) || [];

  // 🔎 Aplica el filtro por título
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(filter.toLowerCase())
  );

  const toggleFavorite = (book: Book) => {
    const exists = favorites.find((b) => b.id === book.id);
    const updatedFavorites = exists
      ? favorites.filter((b) => b.id !== book.id)
      : [...favorites, book];
  
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  
    // Notificación con el nombre del libro 📢
    notify(
      exists
        ? `📕 "${book.title}" removido de favoritos`
        : `📗 "${book.title}" agregado a favoritos`
    );
  };
  

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">CATÁLOGO DE LIBROS</h1>

      {/* 🏷️ Botones sugeridos */}
      <div className="flex justify-center gap-2 mb-4">
        {['Biology', 'History', 'Science'].map((categoria) => (
          <button
            key={categoria}
            onClick={() => setFilter(categoria)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* 🔍 Input de filtro */}
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="🔍 Filtra por título o tema (ej. Biology)"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p>Cargando libros...</p>
      ) : (
        <>
          {filteredBooks.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">No se encontraron libros con ese filtro.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  isFavorite={favorites.some((fav) => fav.id === book.id)}
                  toggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Catalogo;
