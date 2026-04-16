const usermodel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require("../config/redis.config");
const {
  ERROR_EMAIL_FALSE,
  ERROR_PASS_FALSE,
  ERROR_EMAIL_EXISTS,
  ERROR_USER,
  ERROR_REFTOKEN,
} = require("../constants/msg.constants");
const getuserbyId = async (id) => {
  try {
    const cachekey = `user:${id}`;
    const cacheuser = await redis.hgetall(cachekey);
    if (cacheuser !== null && Object.keys(cacheuser).length > 0) {
      return cacheuser;
    }

    const user = await usermodel.getbyId(id);

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
const login = async (email, password) => {
  try {
    const user = await usermodel.getbyEmail(email);
    if (!user) {
      throw new Error(ERROR_EMAIL_FALSE);
    }
    const isMatch = await bcrypt.compare(password, user.UserPassword);
    if (!isMatch) {
      throw new Error(ERROR_PASS_FALSE);
    }
    const accesstoken = jwt.sign(
      { userId: user.UserId, userRole: user.UserRole },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );
    const refreshtoken = jwt.sign(
      { userId: user.UserId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "5d" },
    );
    const cacheKey = `refreshtoken:${user.UserId}`;
    await redis.set(cacheKey, refreshtoken, "EX", 5 * 24 * 60 * 60);

    return { accesstoken, refreshtoken };
  } catch (error) {
    throw error;
  }
};
const refreshtoken = async (refreshtoken) => {
  try {
    const decoded = jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET);

    const cachekey = `refreshtoken:${decoded.userId}`;

    const stored = await redis.get(cachekey);
    if (!stored || stored !== refreshtoken) {
      throw new Error(ERROR_REFTOKEN);
    }
    const user = await usermodel.getbyId(decoded.userId);

    if (!user) throw new Error(ERROR_USER);
    const accesstoken = jwt.sign(
      { userId: user.UserId, userRole: user.UserRole },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );
    return { accesstoken };
  } catch (error) {
    throw error;
  }
};
const register = async (name, email, password) => {
  try {
    const user = await usermodel.getbyEmail(email);
    if (user) {
      //throw new Error(ERROR_EMAIL_EXISTS);
      const err = new Error(ERROR_EMAIL_EXISTS);
      err.statusCode = 422;
      throw err;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await usermodel.create(name, email, hashPassword);
    return {};
  } catch (error) {
    throw error;
  }
};
const logout = async (id) => {
  try {
    const cacheKey = `refreshtoken:${id}`;
    await redis.del(cacheKey);
    return {};
  } catch (error) {
    throw error;
  }
};
module.exports = {
  login,
  register,
  logout,
  refreshtoken,
  getuserbyId,
};
