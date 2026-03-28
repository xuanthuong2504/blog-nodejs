const categoryRepo = require("../models/category.model");

const getAll = async (offset, limit) => {
  try {
    const { categories, total } = await categoryRepo.getAll(offset, limit);
    const totalpage = Math.ceil(total / limit);
    return { categories, total, totalpage };
  } catch (error) {
    throw error;
  }
};

const getCategoryById = async (id) => {
  try {
    const category = await categoryRepo.getById(id);

    return { category };
  } catch (error) {
    throw error;
  }
};

const create = async (name, description) => {
  try {
    const category = await categoryRepo.create(name, description);
    return {};
  } catch (error) {
    throw error;
  }
};
const edit = async (id, name) => {
  try {
    const category = await categoryRepo.edit(id, name);
    return {};
  } catch (error) {
    throw error;
  }
};
const remove = async (id) => {
  try {
    const category = await categoryRepo.remove(id);
    return {};
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  getCategoryById,
  create,
  edit,
  remove,
};
