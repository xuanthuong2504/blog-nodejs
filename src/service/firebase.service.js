const admin = require("../config/firebase.config");
const firebasemodel = require("../models/firebase.model");
const sendNotification = async (token, title, body) => {
  try {
    const message = [];
    for (let i = 0; i < 500; i++) {
      message.push({
        notification: {
          title: title,
          body: body,
        },
        token,
      });
    }

    await admin.messaging().sendEach(message);
    await firebasemodel.batchInsert(
      message.map((m) => ({
        title: m.notification.title,
        body: m.notification.body,
      })),
      // notification đang là array{object}
    );
    return {};
  } catch (error) {
    throw error;
  }
};
module.exports = {
  sendNotification,
};
