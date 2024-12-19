import React, { useState } from 'react';
import useMenuStore from '../store/menuStore';
import CategoryItems from './admin/CategoryItems';
import PromotionManager from './PromotionManager';
import { LocationNav } from './navigation';
import { useFetch } from '../hooks/useFetch';
import { getToken } from '../utils/authLocalStorage';
import axios from 'axios';
import { handleAxiosError } from '../utils/handleAxiosError';

const AdminPanel = () => {
  const { addProduct, updateProduct, deleteProduct } = useMenuStore();
  const [activeTab, setActiveTab] = useState('products');

  const { data, loading, error } = useFetch('http://localhost:3000/api/menu', getToken())

  if (loading) {
    return <div>Cargando Administrador...</div>
  }

  if (error) {
    return <div>Access denied. Please log in.</div>;
  }

  const handleAddItem = async (categoryId, itemData) => {
    try {
      await axios.post(`http://localhost:3000/api/menu/category/${categoryId}/item`, itemData, getToken())
    } catch (error) {
      handleAxiosError(error)
    }
    addProduct(categoryId, itemData);
  };

  const handleUpdateItem = (categoryId, itemId, itemData) => {
    updateProduct(categoryId, itemId, itemData);
  };

  const handleDeleteItem = (categoryId, itemId) => {
    deleteProduct(categoryId, itemId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 bg-white p-6 shadow sm:rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Configuración de Ubicación</h2>
          <LocationNav adminView={true} />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Seleccione la ubicación para administrar los menús y precios específicos.
        </p>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Productos
            </button>
            <button
              onClick={() => setActiveTab('promotions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'promotions'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Promociones
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'products' ? (
        <div className="space-y-8">
          {data.categories.map(category => (
            <div key={category._id} className="bg-white shadow sm:rounded-lg p-6">
              <CategoryItems
                category={category}
                locations={data.locations}
                onAddItem={handleAddItem}
                onUpdateItem={handleUpdateItem}
                onDeleteItem={handleDeleteItem}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {data.categories.map(category => (
            <div key={category._id} className="bg-white shadow sm:rounded-lg p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{category.name}</h3>
              <PromotionManager category={category} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;