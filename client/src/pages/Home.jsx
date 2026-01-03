import { useEffect, useState } from "react";
import { fetchPosts } from "../services/postService";
import PostCard from "../components/PostCard";
import "../styles/home.css";
import FloatingButton from "../components/FloatingButton";


function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  return (
    <div className="home-container">
      <h2>Community Posts</h2>

      <div className="post-grid">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <FloatingButton />
    </div>
  );
}

export default Home;
