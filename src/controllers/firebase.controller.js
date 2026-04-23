const { ERROR_DEVICE, SUCCESS_MSG } = require("../constants/msg.constants");
const { controllerWrapper } = require("../utils/controller.utils");
const { sendNotification } = require("../service/firebase.service");
const Response = require("../utils/response.utils");
class FirebaseController extends Response {
  constructor() {
    super();
  }

  sendNotification = controllerWrapper(async (req, res) => {
    const { token, title, body, topic } = req.body;

    if (!token) {
      return res.status(400).json({ message: ERROR_DEVICE });
    }
    //gửi thông báo đến thiết bị
    /*  const message = {
      notification: {
        title: title ,  
        body: body ,
      },

      token,
    };
      const response = await getMessaging().send(message);
    */
    // await getMessaging().subscribeToTopic(token, topic);

    /*
    message.push({
      notification: {
        title: title,
        body: body,
      },
      token,
    });
    message.push({
      notification: {
        title: "Thông báo A",
        body: "Bạn có một thông báo mới từ hệ thống",
      },
      topic: "client1",
    });*/

    await sendNotification(token, title, body, topic);
    this.send(res, 200, null, SUCCESS_MSG, null, null);
  });
}
module.exports = new FirebaseController();
