import jwt from "jsonwebtoken";



export const verifyUser = async(req, res, next) => {
  try {
    const token = req.coookies?.accessToken || req.headers("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoder = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Auth.findById(decoder?._id).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(500).json({ message: "Internal server error" });
    
  }
  next();
}