const userService = require("../service/user.service");
const { controllerWrapper } = require("../utils/controller.utils");
const Response = require("../utils/response.utils");
const {
  SUCCESS_LOGIN,
  SUCCESS_REGISTER,
  SUCCESS_LOGOUT,
  SUCCESS_REFRESH_TOKEN,
} = require("../constants/msg.constants");
class userController extends Response {
  constructor() {
    super();
  }
  login = controllerWrapper(async (req, res) => {
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    this.POST(res, token, SUCCESS_LOGIN, null, null);
  });
  register = controllerWrapper(async (req, res) => {
    const { name, email, password } = req.body;

    const result = await userService.register(name, email, password);
    this.POST(res, result, SUCCESS_REGISTER, null, null);
  });
  logout = controllerWrapper(async (req, res) => {
    const { id } = req.body;
    await userService.logout(id);
    this.POST(res, null, SUCCESS_LOGOUT, null, null);
  });
  refreshtoken = controllerWrapper(async (req, res) => {
    const { refreshtoken } = req.headers;
    const token = await userService.refreshtoken(refreshtoken);
    this.POST(res, token, SUCCESS_REFRESH_TOKEN, null, null);
  });
}
module.exports = new userController();
