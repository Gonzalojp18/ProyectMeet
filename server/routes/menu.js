import express from 'express';
import Menu from '../models/Menu.js';
import { auth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { AppError } from '../utils/AppError.js';

const router = express.Router();

// Get menu for specific location
router.get('/:locationId', asyncHandler(async (req, res) => {
  const menu = await Menu.findOne();
  const location = menu.locations.find(loc => loc.id === req.params.locationId);

  if (!location) {
    throw new AppError('Location not found', 404);
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
}));

// Admin routes
// router.use(auth);

// Get full menu for admin
router.get('/admin/full', asyncHandler(async (req, res) => {
  const menu = await Menu.findOne();
  res.json(menu);
}));

// Update item availability for specific location
router.patch('/admin/items/:itemId/locations/:locationId', auth, asyncHandler(async (req, res) => {
  const { itemId, locationId } = req.params;
  const { price, isAvailable } = req.body;

  const menu = await Menu.findOne();
  let itemUpdated = false;

  menu.categories.forEach(category => {
    const item = category.items.find(item => item.id === parseInt(itemId));
    if (item) {
      if (isAvailable === false) {
        delete item.prices[locationId];
      } else if (price !== undefined) {
        item.prices[locationId] = price;
      }
      itemUpdated = true;
    }
  });

  if (!itemUpdated) {
    throw new AppError('Item not found', 404);
  }

  await menu.save();
  res.json({ message: 'Item updated successfully' });
}));

export default router;