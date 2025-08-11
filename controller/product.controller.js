// createProduct()
export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// updateProduct(id)

// deleteProduct(id)

// getAllProducts(query) (search, sort, pagination)

// getSingleProduct(id)

// getProductsByCategory(categoryId)