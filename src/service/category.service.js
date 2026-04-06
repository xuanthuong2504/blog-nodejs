const categoryRepo = require("../models/category.model");
const fs = require("fs");
const path = require("path");
const redis = require("../config/redis.config");
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
    const cacheKey = `category:${id}`;
    // Try to get category from Redis hash cache first
    const cachedCategory = await redis.hgetall(cacheKey);
    if (cachedCategory && Object.keys(cachedCategory).length > 0) {
      return { category: cachedCategory };
    }
    // Cache miss

    const category = await categoryRepo.getById(id);
    await redis.hset(cacheKey, {
      id: String(category.id),
      name: category.name,
      description: category.description,
      images: category.images,
    });
    await redis.expire(cacheKey, 180);
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
    const cacheKey = `category:${id}`;
    const exists = await redis.exists(cacheKey);
    if (exists) {
      await redis
        .pipeline()
        .hset(cacheKey, "name", name)
        .expire(cacheKey, 180)
        .exec();
    }
    await categoryRepo.edit(id, name);
    return {};
  } catch (error) {
    throw error;
  }
};
const remove = async (id) => {
  try {
    const cacheKey = `category:${id}`;
    await redis.del(cacheKey);
    await categoryRepo.remove(id);
    return {};
  } catch (error) {
    throw error;
  }
};
const removeimage = async (id) => {
  try {
    const category = await categoryRepo.getById(id);

    const filename = JSON.parse(category.images);

    const uploadDir = path.join(__dirname, "../public/img/categories");
    for (const name of filename) {
      if (!name) continue;
      await fs.promises.unlink(path.join(uploadDir, name)).catch(() => {});
    }
    await categoryRepo.removeimage(id);
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
  removeimage,
};
