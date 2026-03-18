const categoryService = require('../service/categoryService');
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const category = await categoryService.getCategoryById(id);
        
        return res.status(200).json(category);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};
const getAll= async (req,res)=>{
    try {
        const category =  await categoryService.getAll();
        return res.status(200).json(category);
    } catch(error){
        return res.status(404).json({error: error.message});
    }
};
const create= async (req,res)=>{
    const { name, description } = req.body;
    try {
        const category = await categoryService.create(name,description);
        return res.status(200).json(category);
    } catch(error){
        return res.status(404).json({error: error.message});
    }
}
const edit= async (req,res)=>{
    const { id }= req.params;
    const { name } = req.body;
    try {
        const category = await categoryService.edit(id,name);
        return res.status(200).json(category);
    } catch(error){
        return res.status(404).json({error: error.message});
    }
}
const remove= async (req,res)=>{
    const { id }= req.params;
    try {
        const category = await categoryService.remove(id);
        return res.status(200).json(category);
    } catch(error){
        return res.status(404).json({error: error.message});
    }
}
module.exports={
    getAll,
    getCategoryById,
    create,
    edit,
    remove
}