import bcrypt from "bcryptjs";
import prisma from "../../utils/prismaClient.js";
import { v4 as uuidv4 } from 'uuid';
import { validateRegistrationData, isEmailInUse } from "./validation.js";

/**
 * 사용자 정보를 등록.
 *
 * @param {object} userData - 사용자 정보 데이터
 * @returns {object} - 생성된 사용자 정보
 */
export const registerUserService = async (userData) => {
    // 사용자 등록 데이터 검증
    validateRegistrationData(userData);

    const { name, age, password, city, email, phone, gender, occupation, join_date, address } = userData;

    // 이메일 중복 확인
    const emailInUse = await isEmailInUse(email);
    if (emailInUse) throw new Error('Email already in use');

    // 비밀번호 해싱
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // UUID 생성
    const uid = uuidv4();

    // join_date가 유효한 날짜인지 확인
    const validJoinDate = join_date ? new Date(join_date) : new Date();
    if (isNaN(validJoinDate.getTime())) {
        throw new Error('Invalid join_date');
    }


    // 사용자 생성
    return prisma.users.create({
        data: {
            uid,
            name,
            age: age,
            password: hashedPassword,
            city: city,
            email,
            phone: phone,
            gender: gender,
            occupation: occupation,
            join_date: validJoinDate.toString(),
            address: address,
        },
    });
}