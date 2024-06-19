import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// C: 유저 생성
router.post("/user/create", async (req, res) => {
    try {
        const { uid,name, age, city, email, phone, gender, occupation, join_date, address, password } = req.body;
        const newUser = await prisma.users.create({
            data: {
                uid,
                name,
                age: parseInt(age),
                city,
                email,
                phone,
                gender,
                occupation,
                join_date,
                address,
                password,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: `유저 생성 실패: ${error.message}` });
    }
});

// R: 모든 유저 조회
router.get("/users", async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: `유저 조회 실패: ${error.message}` });
    }
});

// R: 특정 유저 조회
router.get("/user/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await prisma.users.findUnique({
            where: { uid: String(uid) },
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "유저를 찾을 수 없음" });
        }
    } catch (error) {
        res.status(500).json({ error: `유저 조회 실패: ${error.message}` });
    }
});
//유저 수 조회
router.get('/count', async (req, res) => {
    try {
        const count = await prisma.users.count();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ error: '책 개수 가져오기 실패' });
    }
});

// U: 유저 정보 업데이트 (POST)
router.post("/user/update/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const { name, age, city, email, phone, gender, occupation, join_date, address, password } = req.body;
        const updatedUser = await prisma.users.update({
            where: { uid: String(uid) },
            data: {
                //name이 존재하는지 확인합니다. 만약 name이 존재하지 않으면 false를 반환하고, 이후의 표현식은 평가되지 않습니다.
                // name이 존재하면 { name } 객체를 반환합니다. 이렇게 하면 name 속성이 있는 객체가 생성됩니다.
                // 전개 연산자(...)는 이렇게 생성된 객체의 속성을 데이터 객체에 추가합니다.
                //결론 post 요청 보낼때 json에 원하는 열만 써도 댐
                ...(name && { name }),
                ...(age && { age }),
                ...(city && { city }),
                ...(email && { email }),
                ...(phone && { phone }),
                ...(gender && { gender }),
                ...(occupation && { occupation }),
                ...(join_date && { join_date }),
                ...(address && { address }),
                ...(password && { password }),
            },
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: `유저 수정 실패: ${error.message}` });
    }
});

// D: 유저 삭제
router.delete("/user/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        await prisma.users.delete({
            where: { uid: String(uid) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: `유저 삭제 실패: ${error.message}` });
    }
});


export default router;
