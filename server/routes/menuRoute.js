import express from 'express';
import { getMenu, createMenu, getAdminMenu, updateItemsMenu, addItem, deleteItem } from '../controllers/menuController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:locationId', getMenu);
router.get('/', protect, getAdminMenu);
router.post('/', protect, createMenu)
router.post('/category/:categoryId/item', protect, addItem)
router.patch('/items/:itemId/locations/:locationId', protect, updateItemsMenu);
router.delete('/category/:categoryId/item/:itemId', protect, deleteItem)


export default router;