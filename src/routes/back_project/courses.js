import express from "express";
import pool from "../../utils/dbCon.js";
const router = express.Router();

// Courses 목록 조회
router.get("/courses", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Courses ORDER BY created_at DESC");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Courses 특정 조회
router.get("/courses/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM Courses WHERE course_id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Courses 작성
router.post("/courses", async (req, res) => {
    const { title, description, category, instructor_id } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO Courses (title, description, category, instructor_id, created_at) VALUES (?, ?, ?, ?, NOW())",
            [title, description, category, instructor_id]
        );
        res.status(201).json({ message: "Course created", courseId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Courses 수정
router.put("/courses/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, category } = req.body;
    try {
        const [result] = await pool.query(
            "UPDATE Courses SET title = ?, description = ?, category = ?, updated_at = NOW() WHERE course_id = ?",
            [title, description, category, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Courses 삭제
router.delete("/courses/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM Courses WHERE course_id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;