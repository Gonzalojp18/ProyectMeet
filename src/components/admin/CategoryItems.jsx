import React, { useState } from 'react';
import ItemForm from './ItemForm';

const CategoryItems = ({
  category,
  locations,
  onAddItem,
  onUpdateItem,
  onDeleteItem
}) => {
  const [editingItem, setEditingItem] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);

  const handleAddItem = (itemData) => {
    onAddItem(category._id, itemData);
    setIsAddingItem(false);
  };

  const handleUpdateItem = (itemData) => {
    onUpdateItem(category.id, editingItem.id, itemData);
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId) => {
    onDeleteItem(category._id, itemId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{category.name} Items</h3>
        <button
          onClick={() => setIsAddingItem(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Agregar Item
        </button>
      </div>

      {isAddingItem && (
        <div className="bg-white shadow sm:rounded-lg p-4">
          <ItemForm
            locations={locations}
            onSubmit={handleAddItem}
            onCancel={() => setIsAddingItem(false)}
          />
        </div>
      )}

      <div className="space-y-4">
        {category.items.map(item => (
          <div key={item._id} className="bg-white shadow sm:rounded-lg p-4">
            {editingItem?._id === item._id ? (
              <ItemForm
                item={item}
                locations={locations}
                onSubmit={handleUpdateItem}
                onCancel={() => setEditingItem(null)}
              />
            ) : (
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{item.name}</h4>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {locations.map(location => (
                    <div key={location._id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium text-gray-700">{location.name}</span>
                      {item.prices[location.nameId] !== undefined ? (
                        <span className="text-sm font-medium text-gray-900">
                          ${item.prices[location.nameId].toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">Producto no disponible</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryItems;