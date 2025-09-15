import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Auth', 
        required: true 
    },
    products: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Shop', 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true, 
                min: 1 
            }
        }
    ],
    totalAmount: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], 
        default: 'Pending' 
    },
    orderDate: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
