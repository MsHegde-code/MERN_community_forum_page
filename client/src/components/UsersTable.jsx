import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/userTable.css";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

    const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsers(prev => prev.filter(user => user._id !== id));

    } catch (err) {
        console.error("Delete user failed:", err.response?.data || err.message);
        alert("Failed to delete user");
    }
    };

  if (loading) return <p className="loading">Loading users...</p>;

  return (
    <div className="users-table-wrapper">
      <h2 className="users-title">Registered Users</h2>

      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Interests</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.interests}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
