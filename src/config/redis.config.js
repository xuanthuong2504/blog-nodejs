const Redis = require("ioredis");
const redis = new Redis({
  retryStrategy(times) {
    return Math.min(times * 200, 3000); // 200ms, 400ms, ... tối đa 3s
  },

  // nếu Redis down lâu, mặc định ioredis có thể làm command fail sau N lần retry.
  // Với cache thường nên để null để nó cứ retry đến khi Redis lên lại.
  maxRetriesPerRequest: null,
});
redis.on("ready", () => console.log("redis ready"));
redis.on("reconnecting", (ms) => console.log("redis reconnecting in", ms));
redis.on("error", (err) => console.error("redis error:", err));
module.exports = redis;
