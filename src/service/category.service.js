const categoryRepo = require("../models/category.model");
const ErrorRes = require("../helpers/ErrorRes");

const getAll = async () => {
  try {
    const category = await categoryRepo.getAll();
    if (!category) {
      throw new ErrorRes(500);
    }
    return {
      data: category,
    };
  } catch (error) {
    throw error;
  }
};

const getCategoryById = async (id) => {
  try {
    const category = await categoryRepo.getById(id);
    if (!category) {
      throw new ErrorRes(500);
    }
    return {
      data: category,
    };
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
