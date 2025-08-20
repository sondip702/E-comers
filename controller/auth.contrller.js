import bcrypt from 'bcrypt';
import Auth from "../model/auth.model.js";
import { generateTokens } from '../utility/genaratortoken.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';
configDotenv();

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
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = crypto.randomBytes(32).toString('hex');
        
        user.resettoken = token;
        user.resetTokenExpiry = Date.now() + 3600000;

        await user.save();

        const tranceports = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        }); 
        console.log(process.env.EMAIL, process.env.EMAIL_PASSWORD);
        const resetLink = `http://localhost:3000/api/user/reset-password/${token}`;
        await tranceports.sendMail({
            to: user.email,
            subject: 'Password Reset',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
        });
        return res.status(200).json({ message: "Reset link sent to your email" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }

};
export const resetPassword = async (req, res) => {
    try{

        const { token } = req.params;
        const { password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ message: "Token and password are required" });
        }

        const user = await Auth.findOne({ resettoken: token, resetTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.resettoken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        return res
        .status(200)
        .json({ message: "Password reset successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }

};


