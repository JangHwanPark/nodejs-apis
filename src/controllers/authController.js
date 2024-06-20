import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {PrismaClient} from "@prisma/client";
import * as authService from "../service/authService.js";

// 공통 에러 처리 함수
const handleCommonError = (res, errorCode, errorMessage, description ) => {
    res.status(500).json({ errorCode, errorMessage, description });
};

const prisma = new PrismaClient();

export const signIn = async (req, res) => {
    const {email, password} = req.body;

    try {
        // 필수 입력 필드 확인
        if (!email || !password) {
            return handleCommonError(res, 400, "Bad Request Exception", "Email and password are required");
        }

        // 사용자 인증, 토큰 생성
        const {user, token} = await authService.authenticateUser(email, password);

        // 로그인 성공
        res.status(200).json({
            message: 'Login successful',
            user: user,
            token: token
        });

    } catch (error) {
        console.error(error)
        handleCommonError(res, 500, "Unexpected Error", "Failed to login user");
    }
}

export const signOut = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        authService.verifyToken(token);
        authService.addToBlacklist(token);
        res.status(200).json({message: "Logout successful"});
    } catch (error) {
        handleCommonError(res, 500, "Unexpected Error", "Failed to log out");
    }
}