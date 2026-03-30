const { sql, pool } = require("../config/db");

const getAll = async (offset, limit) => {
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

  const categories = result.recordset.map((row) => {
    let images = [];
    if (row.images) {
      try {
        images = JSON.parse(row.images);
      } catch (e) {
        images = [];
      }
    }
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      images,
    };
  });

  return {
    categories,
    total: total.recordset[0].total,
  };
};

const getById = async (id) => {
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query(
      "SELECT id, name, description, images FROM Categories WHERE id = @id",
    );

  const row = result.recordset[0];
  if (!row) return null;

  let images = [];
  if (row.images) {
    try {
      images = JSON.parse(row.images);
    } catch (e) {
      images = [];
    }
  }

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    images,
  };
};
const create = async (name, description, images) => {
  const result = await pool
    .request()
    .input("name", sql.NVarChar, name)
    .input("description", sql.NVarChar, description)
    .input("images", sql.NVarChar, JSON.stringify(images))
    .query(
      "INSERT INTO Categories (name,description,images) VALUES (@name, @description, @images)",
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
