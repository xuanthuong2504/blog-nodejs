const categoryRepo = require("../models/category.model");
const ErrorRes = require("../helpers/ErrorRes");

const getAll = async (offset, limit) => {
  try {
    const category = await categoryRepo.getAll(offset, limit);
    return { category };
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
