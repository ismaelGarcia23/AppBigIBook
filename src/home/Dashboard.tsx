import React from "react";
import { Outlet } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Fijo */}
      <header className="bg-custom-red text-white flex justify-between items-center p-4 fixed top-0 left-0 w-full z-10">
        <h2 className="text-2xl font-bold">Big I Books</h2>
      </header>

      {/* Contenido Desplazable */}
      <main className="flex-grow bg-gray-50 p-6 mt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        <p className="text-lg font-semibold">Big I Books</p>
        <p className="text-sm">Desarrollado por Ismael Garcia</p>
        <p className="text-xs">Código: gh22i04001</p>
      </footer>
    </div>
  );
};

export default Dashboard;
