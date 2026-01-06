import Post from "../models/Posts.js";

/**
 * Create a new post
 */
export const createPost = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;

    const post = await Post.create({
      title,
      content,
      author,
      tags
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

/**
 * Get all posts (latest first)
 */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

/**
 * Get a single post by ID
 */
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post" });
  }
};


export const getPostsPerMonth = async (req, res) => {
    try {
        const data = await Post.aggregate([
            {
                // ✅ SAFELY CONVERT createdAt TO DATE (handle both Date and string)
                $addFields: {
                    createdAtDate: {
                        $cond: {
                            if: { $eq: [{ $type: "$createdAt" }, "date"] },
                            then: "$createdAt",
                            else: { $toDate: "$createdAt" }
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAtDate" },
                        month: { $month: "$createdAtDate" }
                    },
                    posts: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ]);

        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const formattedData = data.map(item => ({
            year: item._id.year,
            month: monthNames[item._id.month - 1],
            posts: item.posts
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Post stats error:", error);
        res.status(500).json({ message: error.message });
    }
};


//get total posts
export const getTotalPosts = async (req, res) => {
    try {
        const totalPosts = await Post.countDocuments();
        res.status(200).json({ totalPosts });
    } catch (error) {
        res.status(500).json({ message: "Error fetching post count" });
    }
};