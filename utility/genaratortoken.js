import jwt from "jsonwebtoken"

export const generateTokens = (user) => {
   
    const accessToken = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2d' });
    const refreshToken = jwt.sign({ userId: user._id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };

}