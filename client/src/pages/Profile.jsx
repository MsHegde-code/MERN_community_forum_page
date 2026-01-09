import "../styles/profile.css";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

const ALL_INTERESTS = ["Politics", "Sports", "Technology", "Science"];

function Profile() {
  const { user, loading, token, setUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading profile...</p>;
  }

  if (!user) {
    return <p style={{ textAlign: "center" }}>Not authorized</p>;
  }

  const openModal = () => {
    setSelectedInterests(user.interests || []);
    setShowModal(true);
  };

  const toggleInterest = (value) => {
    setSelectedInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const saveInterests = async () => {
    const res = await fetch("http://localhost:5000/api/user/interests", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ interests: selectedInterests }),
    });

    if (res.ok) {
      const updatedUser = await res.json();
      setUser(updatedUser);
      setShowModal(false);
    } else {
      alert("Failed to update interests");
    }
  };

  useEffect(() => {
    const fetchMyPosts = async () => {
      // If no token yet (first render), skip fetch
      if (!token) {
        setPosts([]);
        setPostLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/posts/my-posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setPosts([]);
          return;
        }

        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch user posts");
        setPosts([]);
      } finally {
        setPostLoading(false);
      }
    };

    fetchMyPosts();
  }, [token]);

  return (
    <div className="profile-page">
      {/* PROFILE CARD */}
      <div className="profile-card">
        <div className="profile-image">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="60" cy="60" r="60" fill="#E5E7EB" />
            <circle cx="60" cy="45" r="18" fill="#9CA3AF" />
            <ellipse cx="60" cy="95" rx="30" ry="20" fill="#9CA3AF" />
          </svg>
        </div>

        <div className="profile-info">
          <h2>{user.name}</h2>

          <p className="profile-label">Interests</p>
          <div className="interests-container">
            {(user.interests || []).map((interest, index) => (
              <span key={index} className="interest-tag">
                {interest}
              </span>
            ))}
          </div>

          <button className="edit-btn" onClick={openModal}>
            Edit Interests
          </button>
        </div>
      </div>

      {/* USER POSTS */}
      <div className="posts-section">
        <h3>My Posts ({posts.length})</h3>

        {postLoading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>You have not created any posts yet.</p>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <div
                className="post-card"
                key={post._id}
                onClick={() => navigate(`/posts/${post._id}`)}
              >
                <h4>{post.title}</h4>
                <p className="post-content">
                  {post.content.length > 160
                    ? post.content.slice(0, 160) + "..."
                    : post.content}
                </p>
                <div className="post-footer">
                  {post.content.length > 160 && (
                    <span className="read-more">Read more →</span>
                  )}
                  <span className="post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------- MODAL ---------- */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Interests</h3>

            <div className="interest-chips-container">
              {ALL_INTERESTS.map((item) => (
                <label
                  key={item}
                  className={`interest-chip ${selectedInterests.includes(item) ? "selected" : ""
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedInterests.includes(item)}
                    onChange={() => toggleInterest(item)}
                    hidden
                  />
                  {selectedInterests.includes(item) && (
                    <svg
                      className="checkmark-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3333 4L6 11.3333L2.66667 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <span>{item}</span>
                </label>
              ))}
            </div>

            <div className="modal-actions">
              <button onClick={saveInterests}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;

// import "./styles/profile.css";
// import { useState } from "react";
// import { useAuth } from "../context/authContext.jsx";

// const ALL_INTERESTS = ["Politics", "Sports", "Technology", "Science"];

// function Profile() {
//   const { user, loading, token, setUser } = useAuth();
//   const [showModal, setShowModal] = useState(false);
//   const [selectedInterests, setSelectedInterests] = useState([]);

//   if (loading) {
//     return <p style={{ textAlign: "center" }}>Loading profile...</p>;
//   }

//   if (!user) {
//     return <p style={{ textAlign: "center" }}>Not authorized</p>;
//   }

//   const openModal = () => {
//     setSelectedInterests(user.interests || []);
//     setShowModal(true);
//   };

//   const toggleInterest = (value) => {
//     setSelectedInterests((prev) =>
//       prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
//     );
//   };

//   const saveInterests = async () => {
//     const res = await fetch("http://localhost:5000/api/user/interests", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ interests: selectedInterests }),
//     });

//     if (res.ok) {
//       const updatedUser = await res.json();
//       setUser(updatedUser); // update AuthContext
//       setShowModal(false);
//     } else {
//       alert("Failed to update interests");
//     }
//   };

//   return (
//     <div className="profile-page">
//       <div className="profile-card">
//         <div className="profile-image">
//           <img src="https://via.placeholder.com/120" alt="Profile" />
//         </div>

//         <div className="profile-info">
//           <h2>{user.name}</h2>

//           <p className="profile-label">Interests</p>
//           <ul>
//             {user.interests.map((interest, index) => (
//               <li key={index}>{interest}</li>
//             ))}
//           </ul>

//           <button className="edit-btn" onClick={openModal}>
//             Edit Interests
//           </button>
//         </div>
//       </div>

//       {/* ---------- MODAL ---------- */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <h3>Edit Interests</h3>

//             {ALL_INTERESTS.map((item) => (
//               <label key={item} className="modal-option">
//                 <input
//                   type="checkbox"
//                   checked={selectedInterests.includes(item)}
//                   onChange={() => toggleInterest(item)}
//                 />
//                 {item}
//               </label>
//             ))}

//             <div className="modal-actions">
//               <button onClick={saveInterests}>Save</button>
//               <button onClick={() => setShowModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Profile;
