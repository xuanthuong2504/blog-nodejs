const userService = require("../service/user.service");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login(email, password); 
    return res.status(200).json({
      data: token,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const result = await userService.register(name, email, password);
    return res.status(201).json({
      data: result,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await userService.logout(email);
    return res.status(200).json({
      
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  login,
  register,
  logout
};
