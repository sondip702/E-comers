import Order from "../model/order.model.js";
export const createOrder = async (req, res) => {
    try {
        const { products, totalAmount } = req.body;
        if (!products || products.length === 0 || !totalAmount) {
            return res.status(400).json({ message: "Products and total amount are required" });
        }
        const newOrder = new Order({
            user: req.user.id,
            products,
            totalAmount,
        });
        await newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('products.product');
        res.status(200).json({ message: "Orders fetched successfully", orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('products.product');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        if (order.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }
        res.status(200).json({ message: "Order fetched successfully", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        if (order.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }
        if (order.status !== 'Pending') {
            return res.status(400).json({ message: "Only pending orders can be cancelled" });
        }
        order.status = 'Cancelled';
        await order.save();
        res.status(200).json({ message: "Order cancelled successfully", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('products.product').populate('user', 'name email');
        res.status(200).json({ message: "All orders fetched successfully", orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const validStatuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = status;
        await order.save();
        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getSalesStats = async (req, res) => {
    try {
        const stats = await Order.aggregate([
            {
                $group: {
                    _id: '$status',
                    totalSales: { $sum: '$totalAmount' },
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json({ message: "Sales stats fetched successfully", stats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}