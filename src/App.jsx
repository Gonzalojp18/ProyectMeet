import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MenuDisplay from './components/MenuDisplay';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Register from './components/Register'; // Importa tu componente Register
import { getValue } from './utils/authLocalStorage'
import { FullScreenError } from './components/Error';
import { Link } from 'react-router-dom';
import { deleteLocalStorage } from './utils/authLocalStorage';

function Layout({ children }) {
  let isAuthenticated = false;

  if (getValue()) {
    isAuthenticated = true;
  }

  const handleDelete = () => {
    deleteLocalStorage()
    localStorage.removeItem('admin')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4 items-center">
              <Link to="/" className="text-gray-900 hover:text-gray-600 font-medium">
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
                  {
                    localStorage.getItem('admin') &&
                    <Link
                      to="/register"
                      className="px-4 py-2 text-gray-800 hover:text-gray-600 font-medium transition-colors duration-200"
                    >
                      Registrarse
                    </Link>
                  }
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

  if (getValue()) {
    return element;
  }

  return <Navigate to="/login" />;
};

const ProtectRegister = ({ element }) => {
  if (localStorage.getItem('admin')) {
    return element;
  }

  return <Navigate to="/login" />;
}

const router = createBrowserRouter([
  {
    path: '/menu/:locationId',
    element: <Layout><MenuDisplay /></Layout>,
  },
  {
    path: '/',
    element: <Layout><ProtectedRoute element={<AdminPanel />} /></Layout>,
  },
  {
    path: '/login',
    element: <Layout><Login /></Layout>,
  },
  {
    path: '/register',
    element: <Layout><ProtectRegister element={<Register />}></ProtectRegister></Layout>,
  },
  {
    path: '*',
    element: <FullScreenError message='404' buttonText='Regresa a inicio' />,
  }
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
