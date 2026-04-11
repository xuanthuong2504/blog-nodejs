const categoryRepo = require("../models/category.model");
const fs = require("fs");
const path = require("path");
const redis = require("../config/redis.config");
const client = require("../config/mqtt.config");
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
      client.publish("getbyid", JSON.stringify(cachedCategory), {
        qos: 1,
      });

      return { category: cachedCategory };
    }
    // Cache miss

    const category = await categoryRepo.getById(id);
    if (!category) {
      return [];
    }
    await redis.hset(cacheKey, {
      id: String(category?.id), //có chấm hỏi thì category có thể rỗng
      name: category?.name,
      description: category?.description,
      images: category?.images,
    });
    await redis.expire(cacheKey, 180);
    client.publish("getbyid", JSON.stringify(category), {
      qos: 1,
      retain: true,
    });
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
const edit = async (id, name, State) => {
  try {
    const cacheKey = `category:${id}`;
    const exists = await redis.exists(cacheKey);
    if (exists) {
      await redis
        .pipeline()
        .hset(cacheKey, "name", name, "State", State)
        .expire(cacheKey, 180)
        .exec();
    }
    await categoryRepo.edit(id, name, State);

    client.publish("category/updated", JSON.stringify({ id, name, State }), {
      qos: 1,
      retain: true,
    });

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
    const result = await categoryRepo.getById(id);

    const category = result?.recordset?.[0];
    if (!category) {
      return {};
    }
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
