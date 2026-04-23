const { sql, getPool } = require("../config/db.config");

const batchInsert = async (notifications) => {
  if (!Array.isArray(notifications) || notifications.length === 0) return; //
  const pool = await getPool();
  const request = pool.request();

  const valuePlaceholders = [];
  // đưa notifications về array{string}
  notifications.forEach((n, i) => {
    valuePlaceholders.push(`(@title${i}, @body${i})`); // lấy phần tử thứ i trong mảng notifications push vào mảng valuePlaceholders
    request.input(`title${i}`, sql.NVarChar, n[i].title);
    request.input(`body${i}`, sql.NVarChar, n[i].body);
  });
  const valuesString = valuePlaceholders.join(", ");
  const query = `INSERT INTO Notify (title, body) VALUES ${valuesString}`;
  return request.query(query);
};

module.exports = {
  batchInsert,
};
