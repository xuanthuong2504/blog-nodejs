const admin = require("../config/firebase.config");
const { getMessaging } = require("firebase-admin/messaging");
const {
  ERROR_DEVICE,
  SUCCESS_MSG,
  ERROR_MSG,
} = require("../constants/msg.constants");
const sendNotification = async (req, res) => {
  try {
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
    await getMessaging().subscribeToTopic(token, topic);
    const message = [];
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
    });
    const response = await getMessaging().sendEach(message);

    return res.status(200).json({ message: SUCCESS_MSG, response });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG, error: error.message });
  }
};

module.exports = {
  sendNotification,
};
