import express from 'express';
import Menu from '../models/menuSchema.js';
import asyncHandler from 'express-async-handler';
import { getMenu } from '../controllers/menuController.js';

const router = express.Router();

// Get menu for specific location
router.get('/:locationId', getMenu);

// Admin routes
// router.use(auth);

// Get full menu for admin
router.get('/admin/full', asyncHandler(async (req, res) => {
  const menu = await Menu.findOne();
  res.json(menu);
}));

// Update item availability for specific location
router.patch('/admin/items/:itemId/locations/:locationId', asyncHandler(async (req, res) => {
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
    throw new Error('Item not found');
  }

  await menu.save();
  res.json({ message: 'Item updated successfully' });
}));

export default router;