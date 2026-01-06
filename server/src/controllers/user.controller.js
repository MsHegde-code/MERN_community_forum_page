import User from "../models/User.js";

export const getUsersCount = async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users count" });
    }
};
