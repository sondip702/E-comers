import bcrypt from 'bcrypt';
import Auth from "../model/auth.model.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try{
        if(!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const findUser = await Auth.findOne({email});
        if(findUser) {
            return res.status(400).json({ message: "User already exists " });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await Auth.create({ 
             name,
             email, 
             password:hashedPassword,
        });

        if(newUser) {
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                createdAt: newUser.createdAt,
                message: "User created successfully"

            });
        }

    

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    // Implementation for login
    // Validate email and password
    // Compare password using bcrypt
    // Generate and send JWT + Refresh Token
    // Optional: log login time/IP
}
export const signout = async (req, res) => {
    // Implementation for login
    // Blacklist refresh token or clear cookie
};
export const forgetPassword = async (req, res) => {
    // Implementation for forget password
    // Generate reset token
    // Save token with expiry in DB
    // Send email with reset link

};
export const resetPassword = async (req3, res) => {
    // Implementation for reset password
    // Validate token and expiry
    // Hash and update new password
    // Clear reset token

};


