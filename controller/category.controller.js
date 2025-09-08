// createCategory()
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

export const updateCategory = (id, updatedData) => {
  const category = Category.findByIdAnd
    
};

export const deleteCategory = (id) => {
};

export const getAllCategories = () => {
};

