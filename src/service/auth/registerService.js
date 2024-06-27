import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { validateRegistrationData, isEmailInUse } from "./validation.js";

// 프리즈마 객체 생성
const prisma = new PrismaClient();

/**
 * 사용자 정보를 등록.
 *
 * @param {object} userData - 사용자 정보 데이터
 * @returns {object} - 생성된 사용자 정보
 */
export const registerUser = async (userData) => {
    // 사용자 등록 데이터 검증
    validateRegistrationData(userData);

    const { uid, name, age, password, city, email, phone, gender, occupation, join_date, address } = userData;

    // 이메일 중복 확인
    const emailInUse = await isEmailInUse(email);
    if (emailInUse) {
        throw new Error('Email already in use');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    return prisma.users.create({
        data: { uid, name, age, password: hashedPassword, city, email, phone, gender, occupation, join_date: new Date(join_date), address },
    });
}