const { sql, pool } = require("../config/db");

const getAll = async () => {
  const result = await pool
    .request()

    .query("SELECT id,name,description FROM Categories");

  return result.recordset;
};

const getById = async (id) => {
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("SELECT name, description FROM Categories WHERE id = @id");

  return result.recordset[0] || null;
};
const create = async (name, description) => {
  const result = await pool
    .request()
    .input("name", sql.NVarChar, name)
    .input("description", sql.NVarChar, description)
    .query(
      "INSERT INTO Categories (name,description) VALUES (@name, @description)",
    );

  return result.rowsAffected[0];
};
const edit = async (id, name) => {
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .input("name", sql.NVarChar, name)
    .query("UPDATE Categories SET Name=@name Where id = @id");

  return result.rowsAffected[0];
};
const remove = async (id) => {
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("DELETE FROM Categories WHERE id= @id");
  return result.rowsAffected[0];
};
module.exports = {
  getAll,
  getById,
  create,
  edit,
  remove,
};
