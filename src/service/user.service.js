const userRepo = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (email, password) => {
  try {
    const user = await userRepo.getbyEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.UserPassword);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    const accesstoken = jwt.sign(
      { userId: user.UserId, userRole: user.UserRole },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );
    const refreshtoken = jwt.sign(
      { userId: user.UserId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );
    await userRepo.saverefreshtoken(user.UserId, refreshtoken);
    return { accesstoken, refreshtoken };
  } catch (error) {
    throw error;
  }
};
const refreshtoken = async (refreshtoken) => {
  try {
    const decoded = jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET);

    const user = await userRepo.getbyId(decoded.userId);

    if (!user) throw new Error("User not found");
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
      throw new Error("Email already exists");
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
    const user = await userRepo.getbyId(id);

    user.refreshtoken = null;

    await userRepo.saverefreshtoken(id, user.refreshtoken);
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
