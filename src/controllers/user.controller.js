const userservice = require("../service/user.service");
const { controllerWrapper } = require("../utils/controller.utils");
const Response = require("../utils/response.utils");
const {
  SUCCESS_LOGIN,
  SUCCESS_REGISTER,
  SUCCESS_LOGOUT,
  SUCCESS_REFRESH_TOKEN,
  SUCCESS_USER,
} = require("../constants/msg.constants");
class UserController extends Response {
  constructor() {
    super();
  }
  getuserbyId = controllerWrapper(async (req, res) => {
    const { id } = req.params;
    const user = await userservice.getuserbyId(id);
    this.GET(res, user, SUCCESS_USER, null, null);
  });
  login = controllerWrapper(async (req, res) => {
    const { email, password } = req.body;
    const token = await userservice.login(email, password);
    this.send(res, 200, token, SUCCESS_LOGIN, null, null);
  });
  register = controllerWrapper(async (req, res) => {
    const { name, email, password } = req.body;

    const result = await userservice.register(name, email, password);
    this.send(res, 201, result, SUCCESS_REGISTER, null, null);
  });
  logout = controllerWrapper(async (req, res) => {
    const { id } = req.body;
    await userservice.logout(id);
    this.send(res, 200, null, SUCCESS_LOGOUT, null, null);
  });
  refreshtoken = controllerWrapper(async (req, res) => {
    const { refreshtoken } = req.headers;
    const token = await userservice.refreshtoken(refreshtoken);
    this.send(res, 200, token, SUCCESS_REFRESH_TOKEN, null, null);
  });
}
module.exports = new UserController();
