import Category from '../model/category.model.js';


export const createCategory = async(req, res) => {
  const { name, description } = req.body;
  
  try {
    if (!name || !description){
      return res.status(400).json({ message: "All fields are required" });
    }
    const newCategory = new Category({ 
        name, 
        description 
    });

    const savedCategory = await newCategory.save();
    if (savedCategory) {
      res.status(201).json({
        _id: savedCategory._id,
        name: savedCategory.name,
        description: savedCategory.description,
        message: "Category created successfully"
      });
    }
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCategory = (req, res) => {
  try {
    const {name, description} = Category.findByIdAndUpdate(req.user.id,{
        $set:
        { name, description }
    }, 
    {new: true}
);
    return res.status(200).json({
        _id: updatedData._id,
        name: updatedData.name,
        description: updatedData.description,
        message: "Category updated successfully"
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal server error" });
    
  }
    
};

export const deleteCategory = (req, res) => {
    try {
        Category.findByIdAndDelete(req.user.id);
        return res.status(200).json({ message: "Category deleted successfully" });
      } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Internal server error" });
      }
};

export const getAllCategories = async(req, res) => {
    try {
        const categories =await Category.find();
        return res.status(200).json(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
      }
};

