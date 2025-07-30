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
    // Implementation for updating user profile
};
export const updatePassword = async (req, res) => {
    // Implementation for updating user password
}

    // Admin-only:

    // getAllUsers()

    // getSingleUser(id)

    // updateUserRole(id, role)

    // deleteUser(id)