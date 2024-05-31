import express from "express";
import bcrypt from "bcryptjs";
import {PrismaClient} from "@prisma/client"

const router = express.Router();
const prisma = new PrismaClient();

/* 로그인 (auth/login) */
router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);

    try {
        // 사용자 찾기
        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({
                error: 'Invalid email or password'
            });
        }

        // 비밀번호 검증
        // const isPasswordValid = await bcrypt.compare(password, users.password);

        // if (!isPasswordValid) {
        //     return res.status(401).json({
        //         error: 'Invalid email or password'
        //     });
        // }

        // 로그인 성공
        res.status(200).json({
            message: 'Login successful',
            user
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Internal server error",
            log: error
        });
    }
});

/* 회원가입 (auth/register) */
router.post("/register", async  (req, res) => {
    const {uid, name, age, password, city, email, phone, gender, occupation, join_date, address} = req.body;

    try {
        // 필수 입력 필드 확인
        if (!uid || !name || !email || !password) {
            return res.status(400).json({
                "errorCode": 100,
                "errorMessage": "Bad Request Exception",
                "description": "uid, name, email, and password are required"
            });
        }

        // 이메일 중복 확인
        const existingUser = await prisma.users.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                "errorCode": 100,
                "errorMessage": "Bad Request Exception",
                "description": "Email already in use"
            });
        }

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        // 사용자 생성
        const user = await prisma.users.create({
            data: {
                uid,
                name,
                age,
                password: hashedPassword,
                city,
                email,
                phone,
                gender,
                occupation,
                join_date: new Date(join_date),
                address,
            },
        });

        res.status(201).json(user);
    } catch (error) {
        // Test
        console.error(error)
        res.status(500).json({
            "errorCode": 900,
            "errorMessage": "Unexpected Error",
            "description": "Failed to create user"
        });
    }
});

// Todo
router.get("/logout", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    });
})

export default router;