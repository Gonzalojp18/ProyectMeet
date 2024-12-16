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
// @route GET /api/menu/admin
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
    res.status(200).json(createItem);
  } else {
    res.status(500).json({ message: "Something went wrong while trying to create the Menu" });
  }
})