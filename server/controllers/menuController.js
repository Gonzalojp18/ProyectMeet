import Menu from "../models/menuSchema/menuSchema.js";
import asyncHandler from 'express-async-handler';

// @desc Get Menu
// @route GET /api/menu/:locationID
// @access Public
export const getMenu = asyncHandler(async (req, res, next) => {
  const menu = await Menu.findOne().lean();

  const location = menu.locations.find(loc => loc.nameId === req.params.locationId);

  if (!location) {
    const err = new Error('Location not found');
    err.status = 404;
    return next(err);
  }

  const filterItemsByLocation = (category, locationId) => {
    return category.items
      .filter(item => item.prices[locationId] !== undefined)
      .map(item => ({
        ...item,
        prices: item.prices[locationId]
      }));
  };

  const filteredMenu = {
    categories: menu.categories.map(category => ({
      ...category,
      items: filterItemsByLocation(category, req.params.locationId)
    })),
    locations: location
  };

  res.status(200).json(filteredMenu);
})

// @desc Get Menu to Admin
// @route GET /api/menu
// @access Private
export const getAdminMenu = asyncHandler(async (req, res) => {
  res.status(200).json(req.menu)
})

// @desc Create Menu
// @route POST /api/menu/
// @access Private
export const createMenu = asyncHandler(async (req, res, next) => {
  const createItem = await Menu.create(await req.body)

  if (createItem) {
    res.status(201).json(createItem);
  } else {
    res.status(500).json({ message: "Something went wrong while trying to create the Menu" });
  }
})

// @desc Add Item
// @route POST /api/menu/category/:categoryId/item
// @access Private
export const addItem = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const newItem = req.body;

  const menu = await Menu.findOne();

  if (!menu) {
    const err = new Error('Menu not found');
    err.status = 404;
    return next(err);
  }

  const category = menu.categories.id(categoryId);

  if (!category) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }

  category.items.push(newItem);

  await menu.save();

  res.status(201).json({ data: newItem  });
})

// @desc Update Items Menu
// @route PATCH /api/menu/items/:itemId/locations/locationId
// @access Private
export const updateItemsMenu = asyncHandler(async (req, res, next) => {
  const { itemId, locationId } = req.params;
  const { price, isAvailable } = req.body;

  const menu = await Menu.findOne();
  let itemUpdated = false;

  if (isAvailable) {
    menu.categories.forEach((category) => {
      category.items.filter((item) => item.id === itemId)
        .map((item) => item.prices[locationId] = price)
      itemUpdated = true;
    })
  } else {
    throw new Error('Item Removed')
  }

  if (!itemUpdated) {
    throw new Error('Item not found');
  }

  await menu.save();
  res.status(200).json({ message: 'Item updated successfully' });
})

// @desc Remove Item from Menu
// @route DELETE /api/menu/category/:categoryId/item/:itemId
// @access Private
export const deleteItem = asyncHandler(async (req, res, next) => {
  const { categoryId, itemId } = req.params;

  const menu = await Menu.findOne();

  if (!menu) {
    const err = new Error('Menu not found');
    err.status = 404;
    return next(err);
  }

  const category = menu.categories.id(categoryId);

  if (!category) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }

  const itemIndex = category.items.findIndex(item => item.id === itemId);

  if (itemIndex === -1) {
    const err = new Error('Item not found');
    err.status = 404;
    return next(err);
  }

  category.items.splice(itemIndex, 1);

  await menu.save();

  res.status(200).json({ msg: `Item with the id ${itemId} was successfully deleted` });
});