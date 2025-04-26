import React from "react";
import { Book } from "../types/book";

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  toggleFavorite: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, isFavorite, toggleFavorite }) => {
  return (
    <div className="border rounded p-4 shadow bg-slate-100 text-center">
      <h3 className="font-bold">{book.title}</h3>
      
      {/* Ajustamos el tamaño de la imagen */}
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-48 object-cover mb-2 rounded"  // Usa w-full para que la imagen se ajuste al ancho
      />
      
      <p className="text-sm text-black">{book.author}</p>
      {book.publishYear && <p className="text-xs text-black">Publicado: {book.publishYear}</p>}
      
      <button
        onClick={() => toggleFavorite(book)}
        className={`mt-2 px-4 py-1 rounded ${isFavorite ? 'bg-red-500 text-white' : 'bg-green-500 font-semibold text-white'}`}
      >
        {isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
      </button>
    </div>
  );
}

export default BookCard;
