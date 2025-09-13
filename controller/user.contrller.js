import Auth from '../model/auth.model.js';
export const profile = async (req, res) => {
    try {
        const user = await Auth.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
export const updateProfile = async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await Auth.findOne({email});
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        await Auth.findByIdAndUpdate( req.user._id,{
            $set: {
                 name,
                  email 
                } 
            },
              { new: true }
            );
        await user.save();
        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    }
    catch (error) {
        
        res.status(500).json({ message: "Internal server error" });
    }
};
export const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await Auth.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }
        user.password = newPassword;
        await user.save();
        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

    // Admin-only:

    // getAllUsers()

    // getSingleUser(id)

    // updateUserRole(id, role)

    // deleteUser(id)