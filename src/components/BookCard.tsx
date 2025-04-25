import React from "react";
import { Book } from "../types/book";

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  toggleFavorite: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, isFavorite, toggleFavorite }) => {


  return (
    <>
      <div className="border rounded p-4 shadow">
        <h3 className="font-bold">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
        {book.publishYear && <p className="text-xs text-gray-400">Publicado: {book.publishYear}</p>}
        <button
          onClick={() => toggleFavorite(book)}
          className={`mt-2 px-4 py-1 rounded ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
        >
          {isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
        </button>
      </div>
    </>
  )
}
export default BookCard;