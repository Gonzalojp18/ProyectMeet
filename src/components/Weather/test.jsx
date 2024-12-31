return (
    <div className="min-h-screen bg-gray-100">
        {showNav && (
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex space-x-4 items-center">
                            <Link
                                to="/"
                                className="text-gray-900 hover:text-gray-600 font-medium"
                            >
                                Menú
                            </Link>
                        </div>
                        <div className="flex items-center">
                            {isAuthenticated ? (
                                <button
                                    onClick={() => handleDelete()}
                                    className="px-4 py-2 text-gray-300 hover:text-gray-600 font-medium transition-colors duration-200"
                                >
                                    Cerrar Sesión
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 text-gray-800 hover:text-gray-600 font-medium transition-colors duration-200"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    {localStorage.getItem("admin") && (
                                        <Link
                                            to="/register"
                                            className="px-4 py-2 text-gray-800 hover:text-gray-600 font-medium transition-colors duration-200"
                                        >
                                            Registrarse
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        )}
        <div className="min-h-[calc(100vh-4rem)]">{children}</div>
    </div>
);
}