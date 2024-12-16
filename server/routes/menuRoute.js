import express from 'express';
import Menu from '../models/menuSchema/menuSchema.js';
import asyncHandler from 'express-async-handler';
import { getMenu, createMenu, getAdminMenu } from '../controllers/menuController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:locationId', getMenu);
router.get('/admin', protect, getAdminMenu);
router.post('/', protect, createMenu)

router.post('/create', createMenu)
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