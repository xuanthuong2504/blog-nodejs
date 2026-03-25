const { sql, pool } = require("../config/db");
const getbyEmail = async (email) => {
  const result = await pool
    .request()
    .input("email", sql.VarChar, email)
    .query(
      "SELECT UserEmail, UserPassword FROM Users WHERE UserEmail = @email",
    );
  return result.recordset[0] || null;
};
const create = async (name, email, hashPassword) => {
  const result = await pool
    .request()
    .input("UserFullname", sql.NVarChar, name)
    .input("UserEmail", sql.VarChar, email)
    .input("UserPassword", sql.VarChar, hashPassword)
    .query(
      "INSERT INTO Users (UserFullname, UserEmail, UserPassword) VALUES (@UserFullname, @UserEmail, @UserPassword)",
    );
  return result;
};
module.exports = {
  getbyEmail,
  create,
};
