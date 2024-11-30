import pool from "express";
import express from "express";
const router = express.Router();

// JobBoard 목록 조회
router.get("/jobBoard", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM JobBoard ORDER BY created_at DESC");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// JobBoard 특정 조회
router.get("/jobBoard/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM JobBoard WHERE job_id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// JobBoard 작성
router.post("/jobBoard", async (req, res) => {
    const { title, description, category, location, user_id } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO JobBoard (title, description, category, location, user_id, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
            [title, description, category, location, user_id]
        );
        res.status(201).json({ message: "Job created", jobId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// JobBoard 수정
router.put("/jobBoard/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, category, location } = req.body;
    try {
        const [result] = await pool.query(
            "UPDATE JobBoard SET title = ?, description = ?, category = ?, location = ?, updated_at = NOW() WHERE job_id = ?",
            [title, description, category, location, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// JobBoard 삭제
router.delete("/jobBoard/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM JobBoard WHERE job_id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;