const categoryRepo = require('../models/category.Model');
const ErrorRes = require("../helpers/ErrorRes");

const getAll = async() => {
  try {
    const category = await categoryRepo.getAll();
    if (!category) {
      throw new ErrorRes(404, "Danh mục không tồn tại");
    }
    return {
      status: 200,
      message: "Lấy danh mục thành công",
      data: category,
    };
  } catch (error) {
    throw error;
  }
};

const getCategoryById = async (id) => {
  try {
    const category = await categoryRepo.getById(id);
    if (!category) {
      throw new ErrorRes(404, "Danh mục không tồn tại");
    }
    return {
      status: 200,
      message: "Lấy danh mục thành công",
      data: category,
    };
  } catch (error) {
    throw error;
  }
};

const create = async (name,description) =>{
  try{
    /*
    const existingName = await categoryRepo.getname(name);
    if(existingName){
       throw new ErrorRes(409, "Tên danh mục đã tồn tại");
    };*/
    const category= await categoryRepo.create(name,description);
    return {
      status :200,
      message:"Tạo danh mục thành công",
      data:category
    }
  } catch(error){
    throw error;
  }
};
const edit = async (id,name) =>{
  try{
    
    const category= await categoryRepo.edit(id,name);
    return {
      status :200,
      message:"Sửa  tên danh mục thành công",
      data:category
     
    }
  } catch(error){
    throw error;
  }
};
const remove = async (id) => {
  try{
    
    const category= await categoryRepo.remove(id);
    return {
      status :200,
      message:"xóa danh mục thành công",
     
    }
  } catch(error){
    throw error;
  }
};

module.exports= {
    getAll,
    getCategoryById,
    create,
    edit,
    remove

};