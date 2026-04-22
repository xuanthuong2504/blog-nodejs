require("dotenv").config();

const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: process.env.DB_TRUST_CERT === "true",
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000, // thời gian chờ trước khi đóng kết nối không hoạt động
  },
};
let poolPromise = null;
let retryInterval = null;
let isConnecting = false;

async function createConnectionPool() {
  if (isConnecting) return; // Tránh gọi nhiều lần đồng thời

  isConnecting = true;
  try {
    const pool = new sql.ConnectionPool(config);
    await pool.connect();
    console.log(" Kết nối SQL Server thành công!");

    // Xóa interval retry nếu có
    if (retryInterval) {
      clearInterval(retryInterval);
      retryInterval = null;
    }

    poolPromise = pool;
    return pool;
  } catch (err) {
    console.error(" Kết nối thất bại:", err.message);
    poolPromise = null;
    throw err;
  } finally {
    isConnecting = false;
  }
}
async function initConnection() {
  try {
    await createConnectionPool();
  } catch (err) {
    console.log(`🔄 Thử lại sau 5 giây...`);
    setTimeout(initConnection, 5000); // Retry sau 5s
  }
}
async function getPool() {
  if (poolPromise) {
    console.log(" Sử dụng kết nối SQL Server đã tồn tại");
    return poolPromise;
  }

  return await createConnectionPool();
}

// Khởi tạo lần đầu
initConnection();

module.exports = { sql, getPool, initConnection };
