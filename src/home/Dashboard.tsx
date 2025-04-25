import React from "react";
import { Link, Outlet } from 'react-router-dom';

const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen flex">
          {/* Sidebar Fijo */}
          <aside className="w-60 bg-blue-700 text-white flex flex-col py-6 px-4 shadow-md fixed left-0 top-0 h-full">
            <h2 className="text-lg font-bold mb-6">Big I Books</h2>
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-yellow-300">Inicio</Link>
              <Link to="/catalogo" className="hover:text-yellow-300">Catálogo</Link>
            </nav>
          </aside>
    
          {/* Contenido Desplazable */}
          <main className="flex-grow bg-gray-50 p-6 ml-60 overflow-y-auto h-screen">
            <Outlet />
          </main>
        </div>
    );
}

export default Dashboard;
