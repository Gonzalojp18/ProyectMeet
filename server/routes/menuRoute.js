import express from 'express';
import { getMenu, createMenu, getAdminMenu, updateItemsMenu, addCategory, addItem } from '../controllers/menuController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:locationId', getMenu);
router.get('/', protect, getAdminMenu);
router.post('/', protect, createMenu)
router.post('/category/:categoryId', addCategory)
router.post('/category/:categoryId/item/:itemId', addItem)
router.patch('/items/:itemId/locations/:locationId', protect, updateItemsMenu);

export default router;