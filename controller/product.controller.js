import product from '../model/product.model.js';
export const createProduct = async (req, res) => {
    try{
        const { name, price, shop } = req.body;
        console.log(name, price, shop);
        if (!name || !price || !shop) {
            return res.status(400).json({ message: 'Name, price, and shop are required.' });
        }

        const existingShop = await product.findById(shop);
        if (!existingShop) {
            return res.status(404).json({ message: 'Shop not found.' });
        }

        const productname = new product({
            name,
            price,
            shop,
            isActive: true,
        });
        console.log(productname);

        const product = await productname.save();

        res.status(201).json({ message: 'Product created successfully.', product:productname });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// updateProduct(id)

// deleteProduct(id)

// getAllProducts(query) (search, sort, pagination)

// getSingleProduct(id)

// getProductsByCategory(categoryId)