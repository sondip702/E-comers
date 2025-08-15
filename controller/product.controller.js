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
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// updateProduct(id)


// deleteProduct(id)

// getAllProducts(query) (search, sort, pagination)

// getSingleProduct(id)

// getProductsByCategory(categoryId)