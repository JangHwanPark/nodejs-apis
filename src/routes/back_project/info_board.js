import express from "express";
import pool from "../../utils/dbCon.js";
const router = express.Router();

// 게시글 목록 조회
router.get("/info/all", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM InfoBoard ORDER BY created_at DESC");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 특정 게시글 조회
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM InfoBoard WHERE post_id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 게시글 작성
router.post("/write", async (req, res) => {
    const { title, content, category, user_id } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO InfoBoard (title, content, category, user_id, created_at) VALUES (?, ?, ?, ?, NOW())",
            [title, content, category, user_id]
        );
        res.status(201).json({ message: "Post created", postId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 게시글 수정
router.put("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content, category } = req.body;
    try {
        const [result] = await pool.query(
            "UPDATE InfoBoard SET title = ?, content = ?, category = ?, updated_at = NOW() WHERE post_id = ?",
            [title, content, category, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 게시글 삭제
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM InfoBoard WHERE post_id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;