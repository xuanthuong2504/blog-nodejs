const userRepo = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require("../config/redis.config");
const {
  ERROR_EMAIL,
  ERROR_PASS,
  ERROR_EMAIL_EXISTS,
  ERROR_USER,
  ERROR_REFTOKEN,
} = require("../constants/msg.constants");
const login = async (email, password) => {
  try {
    const user = await userRepo.getbyEmail(email);
    if (!user) {
      throw new Error(ERROR_EMAIL);
    }
    const isMatch = await bcrypt.compare(password, user.UserPassword);
    if (!isMatch) {
      throw new Error(ERROR_PASS);
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
    const user = await userRepo.getbyId(decoded.userId);

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
    const user = await userRepo.getbyEmail(email);
    if (user) {
      throw new Error(ERROR_EMAIL_EXISTS);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepo.create(name, email, hashPassword);
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
};
