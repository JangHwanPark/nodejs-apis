import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { validateEmailAndPassword, validateRegistrationData } from "./validation.js";

// 프리즈마 객체 생성
const prisma = new PrismaClient();

// JWT 블랙리스트를 메모리에 저장
const blacklist = [];

/**
 * 토큰을 JWT_SECRET 을 사용하여 검증한다.
 * 토큰이 유효하지 않거나 만료된 경우 에러가 발생한다.
 *
 * @param {string} token - 검증할 JWT 토큰
 * @returns {object} - 디코딩된 JWT 토큰 페이로드
 * @throws {JsonWebTokenError} - 토큰이 유효하지 않거나 만료된 경우 발생
 */
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}


/**
 * 토큰을 블랙리스트에 추가하며, 이후 요청시 사용이 거부된다.
 * 사용자가 로그아웃할 때 해당 토큰을 더 이상 사용하지 못하도록 하기 위해 사용된다.
 *
 * @param {string} token - 블랙리스트에 추가할 JWT 토큰
 */
export const addToBlacklist = (token) => {
    blacklist.push(token);
}


/**
 * 주어진 토큰이 블랙리스트에 있는지 확인한다.
 *
 * @param {string} token - 확인할 JWT 토큰
 * @returns {boolean} - 블랙리스트에 있으면 true, 아니면 false
 */
export const isBlacklisted = (token) => {
    return blacklist.includes(token);
}


/**
 * 사용자 인증을 처리하고 JWT 토큰을 생성한다.
 *
 * @param {string} email - 사용자의 이메일
 * @param {string} password - 사용자의 비밀번호
 * @returns {object} - 사용자 객체와 JWT 토큰
 * @throws {Error} - 인증 실패 시 에러 발생
 */
export const authenticateUser = async (email, password) => {
    // 이메일과 비밀번호 검증
    validateEmailAndPassword(email, password);

    // 사용자 찾기
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid email or password');

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid email or password');

    // JWT 생성
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION }
    );

    return { user, token };
}