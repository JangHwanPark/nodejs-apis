import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/book", async (req, res) => {
    try {
        const book_review = await prisma.book_review.findMany();
        res.status(200).json(book_review);
    } catch (error) {
        res.status(500).json({
            error: `데이터를 조회할 수 없습니다: ${error.message}`
        })
    }
})