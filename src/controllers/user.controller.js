const Response = require("../utils/response.utils");
const { controllerWrapper } = require("../utils/controller.utils");
const userservice = require("../service/user.service");
const { SUCCESS_USER } = require("../constants/msg.constants");

class UserController extends Response {
  constructor() {
    super();
  }
  getuserbyId = controllerWrapper(async (req, res) => {
    const { id } = req.params;
    const user = await userservice.getuserbyId(id);
    this.GET(res, user, SUCCESS_USER, null, null);
  });
}
module.exports = new UserController();
