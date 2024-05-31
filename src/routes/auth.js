import express from "express";
import bcrypt from "bcryptjs";
import {PrismaClient} from "@prisma/client"

const router = express.Router();
const prisma = new PrismaClient();

router.get("/login", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
});

router.post("/register", async  (req, res) => {
    const {uid, name, age, password, city, email, phone, gender, occupation, join_date, address} = req.body;

    try {
        const user = await prisma.users.create({
            data: {uid, name, age, password, city, email, phone, gender, occupation, join_date, address},
        });
        res.status(201).json(user);
    } catch (error) {
        // Test
        console.error(error)
        res.status(500).json({
            error: "Failed to create user",
            log: error
        });
    }
});

router.get("/logout", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    });
})

export default router;