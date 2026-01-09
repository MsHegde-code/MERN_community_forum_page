const API_URL = "http://localhost:5000/api/subjects";

export const getAllSubjects = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch subjects");
    return response.json();
};

export const createSubject = async (name, token) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to create subject");
    return data;
};

export const deleteSubject = async (id, token) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error("Failed to delete subject");
    return response.json();
};
