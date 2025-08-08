import bcrypt from 'bcrypt';
import Auth from "../model/auth.model.js";
import { generateTokens } from '../utility/genaratortoken.js';

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
                message: "User created successfully"

            });
        }


    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        if(!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await Auth.findOne({email});

        if(!user){
            return res.status(400).json({ message: "email or password is incorrect" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        
        const tokens = generateTokens(user);

        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
        await user.save(); 

        const options = {
                    httpOnly: true,
                    secure: false, // set to false for local development
                };
        return res.status(200)
        .cookie('accessToken', tokens.accessToken, options)
        .cookie('refreshToken', tokens.refreshToken, options)
        .json({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            options,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
            
        });

    } catch (error) {   
        res.status(500).json({ message: "Internal server error" });
    }
              
}
export const signout = async (req, res) => {
    // Implementation for login
    // Blacklist refresh token or clear cookie
    await Auth.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        }
    },
    { new: true }
    )
    const options = {
                    httpOnly: true,
                    secure: true
                }
    return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json({ message: "User signed out successfully" })
    
    
;

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


