import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { getAllSubjects, createSubject, deleteSubject } from "../services/subjectService";
import "../styles/manageSubjects.css";

function ManageSubjects() {
    const { token, user } = useAuth();
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const data = await getAllSubjects();
            setSubjects(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSubject = async (e) => {
        e.preventDefault();
        if (!newSubject.trim()) return;

        try {
            const created = await createSubject(newSubject, token);
            setSubjects([...subjects, created]);
            setNewSubject("");
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteSubject = async (id) => {
        if (!window.confirm("Are you sure you want to delete this subject?")) return;
        try {
            await deleteSubject(id, token);
            setSubjects(subjects.filter((s) => s._id !== id));
        } catch (err) {
            alert("Failed to delete");
        }
    };

    if (!user?.isAdmin) {
        return <div className="manage-subjects-container"><h2>Access Denied</h2></div>;
    }

    return (
        <div className="manage-subjects-container">
            <h2>Manage Subjects</h2>
            <p className="subtitle">Add or remove forum categories.</p>

            {/* Input Section */}
            <div className="add-subject-card">
                <form onSubmit={handleAddSubject} className="add-subject-form">
                    <input
                        type="text"
                        placeholder="Enter new subject name..."
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                    />
                    <button type="submit" disabled={!newSubject.trim()}>
                        Add Subject
                    </button>
                </form>
                {error && <p className="error-msg">{error}</p>}
            </div>

            {/* List Section */}
            <div className="subjects-list-card">
                <h3>Existing Subjects ({subjects.length})</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : subjects.length === 0 ? (
                    <p className="empty-msg">No subjects found.</p>
                ) : (
                    <table className="subjects-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((sub) => (
                                <tr key={sub._id}>
                                    <td className="subject-name-cell">{sub.name}</td>
                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteSubject(sub._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default ManageSubjects;
