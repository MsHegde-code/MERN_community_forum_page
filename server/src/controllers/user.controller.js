import User from "../models/User.js";

export const getUsersCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users count" });
  }
};

/**
 * Get all users (for dashboard)
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email interests");
    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// export const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deleted = await User.findByIdAndDelete(id);

//     if (!deleted) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // ✅ IMPORTANT: send ONE response and RETURN
//     return res.status(200).json({
//       success: true,
//       message: "User deleted successfully"
//     });

//   } catch (error) {
//     console.error("Delete user error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete user"
//     });
//   }
// };
/**
 * GET logged-in user's profile
 * (Protected route)
 */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
