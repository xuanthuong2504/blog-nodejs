const { sql, pool } = require("../config/db");

const getAll = async (query) => {
  const { offset, limit } = query;

  const total = await pool
    .request()
    .query("SELECT COUNT(id) AS total FROM Categories");

  const result = await pool
    .request()
    .input("offset", sql.Int, offset)
    .input("limit", sql.Int, limit)
    .query(
      "SELECT id,name,description,images FROM Categories Order by id  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY",
    );

  const totalpage = Math.ceil(total.recordset[0].total / limit);

  return {
    categories: result.recordset,
    total: total.recordset[0].total,
    totalpage: totalpage,
  };
};

const getById = async (id) => {
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query(
      "SELECT id, name, description, images FROM Categories WHERE id = @id",
    );

  return result.recordset[0] || null;
};
const create = async (name, description, images) => {
  const transaction = new sql.Transaction(pool);
  try {
    await transaction.begin();
    const request = new sql.Request(transaction);
    const result = await request
      .input("name", sql.NVarChar, name)
      .input("description", sql.NVarChar, description)
      .input("images", sql.NVarChar, JSON.stringify(images))
      .query(
        "INSERT INTO Categories (name,description,images) VALUES (@name, @description, @images)",
      );
    await transaction.commit();
    return result.rowsAffected[0];
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
const edit = async (id, name, State) => {
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .input("name", sql.NVarChar, name)
    .input("State", sql.VarChar, State)
    .query("UPDATE Categories SET Name=@name, State=@State WHERE id = @id");

  return result.rowsAffected[0];
};
const remove = async (id) => {
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("DELETE FROM Categories WHERE id= @id");
  return result.rowsAffected[0];
};
const removeimage = async (id) => {
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("Update Categories SET images = NULL WHERE id= @id");
  return result.rowsAffected[0];
};
module.exports = {
  getAll,
  getById,
  create,
  edit,
  remove,
  removeimage,
};
