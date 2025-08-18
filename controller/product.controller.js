import Shop from '../model/shop.model.js';
export const createProduct = async (req, res) => {
    try{
        const {  name, address, owner, contactNumber, price, createdAt  } = req.body;
        if (!name || !address || !contactNumber || !price) {
            return res.status(400).json({ message: 'Name, price, and shop are required.' });
        }
        const existingShop = await Shop.findOne({name});
        if (existingShop) {
            return res.status(400).json({ message: 'Shop already created.' });
        }

        const productname = new Shop({
        name,
        address,
        owner: req.user._id,
        contactNumber,
        createdAt: createdAt || Date.now(),
        price,
        isActive: true,
        });
        await productname.save();


        res.status(201)
        .json({ message: 'Product created successfully.',
              data: productname,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const updateProduct = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, address, contactNumber, price } = req.body;
        if (!name || !address || !contactNumber || !price) {
            return res.status(400).json({ message: 'Name, address, contact number, and price are required.' });
        }
        const product = await Shop.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        const findandU = await Shop.findByIdAndUpdate(
            id,
            {
                $set: {
                    name,
                    address,
                    contactNumber,
                    price,
                },
                
            },{new: true},
        ).select('-password');
        if (!findandU) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json({ message: 'Product updated successfully.', data: product });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

// deleteProduct(id)

// getAllProducts(query) (search, sort, pagination)

// getSingleProduct(id)

// getProductsByCategory(categoryId)