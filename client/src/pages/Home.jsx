import { useEffect, useState } from "react";
import { fetchPosts } from "../services/postService";
import PostCard from "../components/PostCard";
import { useSearch } from "../context/SearchContext";
import "../styles/home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const { search, category } = useSearch();

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !category || post.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-container">
      {category && (
        <div className="category-indicator">
          Showing results from {category}
        </div>
      )}

      <div className="post-grid">
        {filteredPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;

