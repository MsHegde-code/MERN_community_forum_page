import { useEffect, useState } from "react";
import { fetchPosts } from "../services/postService";
import PostCard from "../components/PostCard";
import BottomActionBar from "../components/ButtomActionBar";
import "../styles/home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !category || post.tags?.includes(category);

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="home-container">
        <h2>Community Posts</h2>

        <div className="post-grid">
          {filteredPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      <BottomActionBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />
    </>
  );
}

export default Home;
