import express from "express";
import pool from "../../utils/dbCon.js";
const router = express.Router();

// Reviews 목록 조회
router.get("/reviews", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Reviews ORDER BY created_at DESC");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reviews 특정 조회
router.get("/reviews/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM Reviews WHERE review_id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reviews 작성
router.post("/reviews", async (req, res) => {
    const { course_id, user_id, rating, comment } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO Reviews (course_id, user_id, rating, comment, created_at) VALUES (?, ?, ?, ?, NOW())",
            [course_id, user_id, rating, comment]
        );
        res.status(201).json({ message: "Review created", reviewId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reviews 수정
router.put("/reviews/:id", async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    try {
        const [result] = await pool.query(
            "UPDATE Reviews SET rating = ?, comment = ?, updated_at = NOW() WHERE review_id = ?",
            [rating, comment, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reviews 삭제
router.delete("/reviews/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM Reviews WHERE review_id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;