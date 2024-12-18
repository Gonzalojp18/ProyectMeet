import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MenuDisplay from './components/MenuDisplay';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Register from './components/Register'; // Importa tu componente Register
import useAuthStore from './store/authStore';

function Layout({ children }) {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4 items-center">
              <a href="/" className="text-gray-800 hover:text-gray-600 font-medium">
                Menú
              </a>
              {isAuthenticated && (
                <a href="/admin" className="text-gray-800 hover:text-gray-600 font-medium">
                  Admin
                </a>
              )}
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="px-4 py-2 text-gray-800 hover:text-gray-600 font-medium transition-colors duration-200"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <>
                  <a
                    href="/login"
                    className="px-4 py-2 text-gray-800 hover:text-gray-600 font-medium transition-colors duration-200"
                  >
                    Iniciar Sesión
                  </a>
                  <a
                    href="/register"
                    className="px-4 py-2 text-gray-800 hover:text-gray-600 font-medium transition-colors duration-200"
                  >
                    Registrarse
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="min-h-[calc(100vh-4rem)]">
        {children}
      </div>
    </div>
  );
}

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><MenuDisplay /></Layout>,
  },
  {
    path: '/admin',
    element: <Layout><ProtectedRoute element={<AdminPanel />} /></Layout>,
  },
  {
    path: '/login',
    element: <Layout><Login /></Layout>,
  },
  {
    path: '/register', // Nueva ruta para registro
    element: <Layout><Register /></Layout>,
  },
]);

function App() {
  return (
    <RouterProvider
      future={{
        v7_startTransition: true,
        v7_skipActionErrorRevalidation: true,
        v7_partialHydration: true,
        v7_normalizeFormMethod: true,
        v7_fetcherPersist: true,
        v7_relativeSplatPath: true,
      }}
      router={router}
    />
  );
}

export default App;
