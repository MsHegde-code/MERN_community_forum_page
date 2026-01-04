import { useNavigate } from "react-router-dom";
import "../styles/bottomBar.css";

function BottomActionBar({ search, setSearch, category, setCategory }) {
  const navigate = useNavigate();

  return (
    <div className="bottom-bar">
      <div className="bottom-bar-content">

        {/* Search */}
        <input
          className="search-input"
          placeholder="Search community posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="react">React</option>
          <option value="backend">Backend</option>
          <option value="mongodb">MongoDB</option>
          <option value="general">General</option>
        </select>

        {/* Create Post */}
        <button
          className="create-post-btn"
          onClick={() => navigate("/create")}
        >
          ✍ Create
        </button>

      </div>
    </div>
  );
}

export default BottomActionBar;
