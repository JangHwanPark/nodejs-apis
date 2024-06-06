import express from "express";

const router = express.Router();

/* 회원가입 (auth/register) */
router.post("/register", async  (req, res) => {
    const {uid, name, age, password, city, email, phone, gender, occupation, join_date, address} = req.body;

    try {
        // 필수 입력 필드 확인
        if (!uid || !name || !email || !password) {
            return res.status(400).json({
                errorCode: 100,
                errorMessage: "Bad Request Exception",
                description: "uid, name, email, and password are required"
            });
        }

        // 이메일 중복 확인
        const existingUser = await prisma.users.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                errorCode: 100,
                errorMessage: "Bad Request Exception",
                description: "Email already in use"
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
            errorCode: 900,
            errorMessage: "Unexpected Error",
            description: "Failed to create user"
        });
    }
});

export default router;