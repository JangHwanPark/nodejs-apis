import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// C: 책 추가 O
router.post('/book/info/add', async (req, res) => {
    try {
        const { book_id, name, category, author, publisher, discount, price, price_normal, point, description, review, img } = req.body;
        const newBook = await prisma.books.create({
            data: {
                book_id,
                name,
                category,
                author,
                publisher,
                discount,
                price,
                price_normal,
                point,
                description,
                review,
                img,
            },
        });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: `책 추가 실패${error}` });
    }
});

// R: 모든 책 가져오기 O
router.get('/books', async (req, res) => {
    try {
        const books = await prisma.books.findMany();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: '책 가져오기 실패' });
    }
});

// R: 특정 책 가져오기 O
router.get('/book/info/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await prisma.books.findUnique({
            where: { book_id: parseInt(id) },
        });
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ error: '책을 찾을 수 없음' });
        }
    } catch (error) {
        res.status(500).json({ error: '책 가져오기 실패' });
    }
});

// U: 책 정보 업데이트 O
router.put('/book/info/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { book_id, name, category, author, publisher, discount, price, price_normal, point, description, review, img } = req.body;
        const updatedBook = await prisma.books.update({
            where: { book_id: parseInt(id) },
            data: {
                book_id,
                name,
                category,
                author,
                publisher,
                discount,
                price,
                price_normal,
                point,
                description,
                review,
                img,
            },
        });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({
            error: `책 업데이트 실패${error}` });
    }
});

// D: 책 삭제 O
router.delete('/book/info/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.books.delete({
            where: { book_id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: '책 삭제 실패' });
    }
});

export default router;
