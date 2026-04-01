const categoryRepo = require("../models/category.model");

const getAll = async (query) => {
  try {
    const { categories, total, totalpage } = await categoryRepo.getAll(query);
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

const create = async (name, description, images) => {
  try {
    const category = await categoryRepo.create(name, description, images);
    // throw Error("Test rollback");
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
