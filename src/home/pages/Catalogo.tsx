import React, { useState } from 'react';
import BookCard from '../../components/BookCard';
import { useFetchData } from '../../hook/useFetchData';
import { useNotification } from '../../hook/useNotification';  // Importa el hook si lo usas
import { Book } from '../../types/book';

const Catalogo: React.FC = () => {
  const { notify } = useNotification(); // Usamos el hook para disparar las notificaciones
  const [favorites, setFavorites] = useState<Book[]>(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  // URL para consumir la API
  const { data, loading } = useFetchData<any>(
    `https://openlibrary.org/people/mekBot/books/already-read.json`
  );

  // Mapeo de libros con la imagen utilizando cover_id
  const books = data?.reading_log_entries?.slice(0, 12).map((entry: any, index: number) => ({
    id: entry.logged_edition || `book-${index}`,
    title: entry.work.title || 'Título no disponible',
    author: entry.work.author_names ? entry.work.author_names[0] : 'Autor desconocido',
    cover: entry.work.cover_id
      ? `https://covers.openlibrary.org/b/id/${entry.work.cover_id}-M.jpg`
      : 'https://via.placeholder.com/150',  // Placeholder si no hay portada
    publishYear: entry.work.first_publish_year || 'Año desconocido',
  })) || [];

  // Función para agregar/quitar favoritos y mostrar notificación
  const toggleFavorite = (book: Book) => {
    const exists = favorites.find((b) => b.id === book.id);
    const updatedFavorites = exists
      ? favorites.filter((b) => b.id !== book.id)
      : [...favorites, book];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    // Dispara la notificación
    notify(exists ? 'Libro removido de favoritos' : 'Libro agregado a favoritos');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">CATÁLOGO DE LIBROS</h1>
      {loading ? (
        <p>Cargando libros...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {books.map((book) => (
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
