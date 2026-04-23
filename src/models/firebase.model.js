const { sql, getPool } = require("../config/db.config");

const batchInsert = async (notifications) => {
  if (!Array.isArray(notifications) || notifications.length === 0) return; //
  const pool = await getPool();
  const request = pool.request();

  const valuePlaceholders = [];
  // đưa notifications về array{string}

  for (let i = 0; i < notifications.length; i++) {
    const n = notifications[i];
    valuePlaceholders.push(`(@title${i}, @body${i})`);
    request.input(`title${i}`, sql.NVarChar, n.title);
    request.input(`body${i}`, sql.NVarChar, n.body);
  }
  const valuesString = valuePlaceholders.join(", ");
  const query = `INSERT INTO Notify (title, body) VALUES ${valuesString}`;
  return request.query(query);
};

module.exports = {
  batchInsert,
};
