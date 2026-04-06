const userRepo = require("../models/user.model");
const redis = require("../config/redis.config");
const getuserbyId = async (id) => {
  try {
    const cachekey = `user:${id}`;
    const cacheuser = await redis.hgetall(cachekey);
    if (cacheuser !== null && Object.keys(cacheuser).length > 0) {
      return cacheuser;
    }

    const user = await userRepo.getbyId(id);

    await redis.hset(cachekey, {
      id: String(user.UserId),
      username: user.UserFullname,
      email: user.UserEmail,
    });

    await redis.expire(cachekey, 180);

    return user;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getuserbyId,
};
