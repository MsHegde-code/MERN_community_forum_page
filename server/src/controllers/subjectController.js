import Subject from "../models/Subject.js";

// @desc    Get all subjects
// @route   GET /api/subjects
export const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().sort({ name: 1 });
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a subject
// @route   POST /api/subjects
export const createSubject = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if exists
        const existing = await Subject.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (existing) {
            return res.status(400).json({ message: "Subject already exists" });
        }

        const subject = await Subject.create({ name });
        res.status(201).json(subject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a subject
// @route   DELETE /api/subjects/:id
export const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        await Subject.findByIdAndDelete(id);
        res.json({ message: "Subject deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
