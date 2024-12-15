import Menu from "../models/menuSchema/menuSchema.js";
import asyncHandler from 'express-async-handler';

export const getMenu = asyncHandler(async (req, res, next) => {
  const menu = await Menu.findOne();
  const location = menu.locations.find(loc => loc.id === req.params.locationId);

  if (!location) {
    const err = new Error('Location not found');
    err.status = 404;
    return next(err);
  }

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

export const createMenu = asyncHandler(async (req, res, next) => {
  const { name, description, prices } = await req.json();

  if (!name || !description || !prices) {
    const err = new Error('Be sure to fill out every field');
    err.status = 300;
    return next(err);
  }

  const createItem = await Menu.create({
    name,
    description,
    prices
  })
})