import "../styles/profile.css";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext.jsx";

const ALL_INTERESTS = ["Politics", "Sports", "Technology", "Science"];

function Profile() {
  const { user, loading, token, setUser } = useAuth();

  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);

  /* ✅ useEffect MUST be here (top-level, unconditional) */
  useEffect(() => {
    if (!token) return;

    const fetchMyPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts/my-posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch user posts");
      } finally {
        setPostLoading(false);
      }
    };

    fetchMyPosts();
  }, [token]);

  /* ----- Handlers ----- */
  const openModal = () => {
    setSelectedInterests(user?.interests || []);
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

  /* ----- Conditional UI rendering (SAFE) ----- */
  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading profile...</p>;
  }

  if (!user) {
    return <p style={{ textAlign: "center" }}>Not authorized</p>;
  }

  return (
    <div className="profile-page">
      {/* PROFILE CARD */}
      <div className="profile-card">
        <div className="profile-image">
          <img src="https://i.pravatar.cc/150?img=3" alt="Profile Avatar" />
        </div>

        <div className="profile-info">
          <h2>{user.name}</h2>

          <p className="profile-label">Interests</p>
          <ul>
            {user.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>

          <button className="edit-btn" onClick={openModal}>
            Edit Interests
          </button>
        </div>
      </div>

      {/* POSTS */}
      <div className="posts-section">
        <h3>My Posts</h3>

        {postLoading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>You have not created any posts yet.</p>
        ) : (
          posts.map((post) => (
            <div className="post-card" key={post._id}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <span className="post-date">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Interests</h3>

            {ALL_INTERESTS.map((item) => (
              <label key={item} className="modal-option">
                <input
                  type="checkbox"
                  checked={selectedInterests.includes(item)}
                  onChange={() => toggleInterest(item)}
                />
                {item}
              </label>
            ))}

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

// import "../styles/profile.css";
// import { useEffect, useState } from "react";
// import { useAuth } from "../context/authContext.jsx";

// const ALL_INTERESTS = ["Politics", "Sports", "Technology", "Science"];

// function Profile() {
//   const { user, loading, token, setUser } = useAuth();
//   const [posts, setPosts] = useState([]);
//   const [postLoading, setPostLoading] = useState(true);
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
//       setUser(updatedUser);
//       setShowModal(false);
//     } else {
//       alert("Failed to update interests");
//     }
//   };

//   useEffect(() => {
//     const fetchMyPosts = async () => {
//       // If no token yet (first render), skip fetch
//       if (!token) {
//         setPosts([]);
//         setPostLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch("http://localhost:5000/api/posts/my-posts", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           setPosts([]);
//           return;
//         }

//         const data = await res.json();
//         setPosts(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Failed to fetch user posts");
//         setPosts([]);
//       } finally {
//         setPostLoading(false);
//       }
//     };

//     fetchMyPosts();
//   }, [token]);

//   return (
//     <div className="profile-page">
//       {/* PROFILE CARD */}
//       <div className="profile-card">
//         <div className="profile-image">
//           <img src="https://i.pravatar.cc/150?img=3" alt="Profile Avatar" />
//         </div>

//         <div className="profile-info">
//           <h2>{user.name}</h2>

//           <p className="profile-label">Interests</p>
//           <ul>
//             {(user.interests || []).map((interest, index) => (
//               <li key={index}>{interest}</li>
//             ))}
//           </ul>

//           <button className="edit-btn" onClick={openModal}>
//             Edit Interests
//           </button>
//         </div>
//       </div>

//       {/* USER POSTS */}
//       <div className="posts-section">
//         <h3>My Posts</h3>

//         {postLoading ? (
//           <p>Loading posts...</p>
//         ) : posts.length === 0 ? (
//           <p>You have not created any posts yet.</p>
//         ) : (
//           <div className="posts-grid">
//             {posts.map((post) => (
//               <div className="post-card" key={post._id}>
//                 <h4>{post.title}</h4>
//                 <p>{post.content}</p>
//                 <span className="post-date">
//                   {new Date(post.createdAt).toLocaleDateString()}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
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
