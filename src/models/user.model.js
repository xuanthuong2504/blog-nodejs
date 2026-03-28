const { sql, pool } = require("../config/db");

const getbyId = async (id) => {
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query(
      "SELECT UserId, UserFullname, UserEmail, UserRole, RefreshToken FROM Users WHERE UserId = @id",
    );
  return result.recordset[0] || null;
};

const getbyEmail = async (email) => {
  const result = await pool
    .request()
    .input("email", sql.VarChar, email)
    .query(
      "SELECT UserId, UserEmail, UserPassword, UserRole, RefreshToken FROM Users WHERE UserEmail = @email",
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
const saverefreshtoken = async (id, refreshtoken) => {
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .input("refreshtoken", sql.VarChar, refreshtoken)
    .query("UPDATE Users SET RefreshToken = @refreshtoken WHERE UserId = @id");
  return result;
};
module.exports = {
  getbyId,
  getbyEmail,
  create,
  saverefreshtoken,
};
