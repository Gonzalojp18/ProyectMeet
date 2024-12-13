import React, { useState } from 'react';
import useMenuStore from '../store/menuStore';
import useAuthStore from '../store/authStore';
import CategoryItems from './admin/CategoryItems';
import PromotionManager from './PromotionManager';
import { LocationNav } from './navigation';

const AdminPanel = () => {
  const { menu, selectedLocation, addProduct, updateProduct, deleteProduct } = useMenuStore();
  const { isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState('products');

  if (!isAuthenticated) {
    return <div>Access denied. Please log in.</div>;
  }

  const handleAddItem = (categoryId, itemData) => {
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
          {menu.categories.map(category => (
            <div key={category.id} className="bg-white shadow sm:rounded-lg p-6">
              <CategoryItems
                category={category}
                locations={menu.locations}
                selectedLocation={selectedLocation}
                onAddItem={handleAddItem}
                onUpdateItem={handleUpdateItem}
                onDeleteItem={handleDeleteItem}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {menu.categories.map(category => (
            <div key={category.id} className="bg-white shadow sm:rounded-lg p-6">
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