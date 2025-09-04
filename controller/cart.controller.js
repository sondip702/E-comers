import { error } from "console";
import Cart from "../model/cart.model.js";
// addToCart(productId, quantity)
export const addToCart = async (req, res) => {
  
    try {
        const { productId, quantity } = req.body;

        const userId = req.user.id;

        console.log("Adding to cart:", productId, quantity, userId);

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;

        } else {
            cart.products.push({ product: productId, quantity, price: 0 }); 
        }

        cart.totalPrice = cart.products.reduce((total, item) => total + (item.price * item.quantity), 0);

        await cart.save();

        res.status(200).json({ message: "Product added to cart", cart });
    } catch  {
        console.error("Error adding to cart:");
        res.status(500).json({ message: "Internal server error" });
    }
}

// updateCartItem(cartItemId, quantity)
export const updateCartItem = async (req, res) => {
    try{
        const { productId, quantity, price } = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.map(p => p.id.toString() === productId).indexOf(true);
        
        if (productIndex === -1) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        
        cart.products[productIndex].quantity = quantity;
        cart.products[productIndex].price = price; 
        
        
        cart.totalPrice = cart.products.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        await cart.save();
        res.status(200).json({ message: "Cart item updated", cart });

    }catch{
        console.error("Error updating cart item:");
        res.status(500).json({ message: "Internal server error" });
    }
}

// removeCartItem(cartItemId)
export const removeCartItem = async (req, res) => {
    try{        
        const userId = req.user.id;
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.products = [];
        cart.totalPrice = 0;

        await cart.save();
        res.status(200).json({ message: "All cart items removed", cart });
    }catch{
        console.error("Error removing cart item:");
        res.status(500).json({ message: "Internal server error" });
    }
}

// getUserCart()
export const getUserCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error){
        console.error("Error fetching user cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
}
