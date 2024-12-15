import Menu from "../models/menuSchema.js";
import asyncHandler from 'express-async-handler';

export const getMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findOne();
  const location = menu.locations.find(loc => loc.id === req.params.locationId);

  if (!location) {
    throw new Error('Location not found');
  }

  // Filter menu data for specific location
  const filteredMenu = {
    ...menu.toObject(),
    locations: [location],
    categories: menu.categories.map(category => ({
      ...category,
      items: category.items
        .filter(item => item.prices?.[req.params.locationId] !== undefined)
        .map(item => ({
          ...item,
          prices: { [req.params.locationId]: item.prices[req.params.locationId] }
        }))
    })).filter(category => category.items.length > 0)
  };

  res.json(filteredMenu);
})