const { sql, pool } = require("../config/db");

const getAll = async (query, userId) => {
  const { offset, limit } = query;

  const total = await pool
    .request()
    .input("userId", sql.Int, userId)
    .query(
      "SELECT COUNT(id) AS total FROM Categories Join Users  ON Categories.UserId = Users.UserId WHERE Users.UserId = @userId",
    );

  const result = await pool
    .request()
    .input("userId", sql.Int, userId)
    .input("offset", sql.Int, offset)
    .input("limit", sql.Int, limit)
    .query(
      "SELECT id,name,description,images FROM Categories JOIN Users ON Categories.UserId = Users.UserId WHERE Users.UserId = @userId ORDER BY id OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY",
    );

  const totalpage = Math.ceil(total.recordset[0].total / limit);

  return {
    categories: result.recordset,
    total: total.recordset[0].total,
    totalpage: totalpage,
  };
};

const getById = async (id, userId) => {
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .input("userId", sql.Int, userId)
    .query(
      "SELECT id, name, description, images FROM Categories JOIN Users ON  Categories.UserId = Users.UserId Where Categories.id = @id AND Users.UserId = @userId ",
    );

  return result;
};
const create = async (name, description, images, userId) => {
  const result = await pool
    .request()
    .input("name", sql.NVarChar, name)
    .input("description", sql.NVarChar, description)
    .input("images", sql.NVarChar, JSON.stringify(images))
    .input("userId", sql.Int, userId)
    .query(
      "INSERT INTO Categories (name,description,images,UserId) VALUES (@name, @description, @images, @userId)",
    );
  return result;
};
const edit = async (id, name, State, userId) => {
  await pool
    .request()
    .input("id", sql.Int, id)
    .input("name", sql.NVarChar, name)
    .input("State", sql.VarChar, State)
    .input("userId", sql.Int, userId)
    .query(
      "UPDATE Categories SET Name=@name, State=@State WHERE id = @id AND UserId = @userId",
    );

  return [];
};
const remove = async (id, userId) => {
  await pool
    .request()
    .input("id", sql.Int, id)
    .input("userId", sql.Int, userId)
    .query("DELETE FROM Categories WHERE id= @id AND UserId = @userId");
  return [];
};
const removeimage = async (id, userId) => {
  await pool
    .request()
    .input("id", sql.Int, id)
    .input("userId", sql.Int, userId)
    .query(
      "Update Categories SET images = NULL WHERE id= @id AND UserId = @userId",
    );
  return [];
};
module.exports = {
  getAll,
  getById,
  create,
  edit,
  remove,
  removeimage,
};
