import React, { useState } from "react";

function MenuAdmin() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (!localStorage.getItem('admin')) return null; // Oculta el menú si no eres admin.


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative">
            {/* Botón del menú */}
            <button
                onClick={toggleMenu}
                className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-600 focus:outline-none"
            >
                {isMenuOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg> // Ícono de "cerrar"
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg> // Ícono de "menú hamburguesa"
                )}
            </button>

            {/* Menú desplegable */}
            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <ul>
                        <li className="px-4 py-2 hover:bg-gray-100">
                            <a href="/menu">Menú</a>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                            <a href="/login">Iniciar Sesión</a>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                            <a href="/register">Registrarse</a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default MenuAdmin;
