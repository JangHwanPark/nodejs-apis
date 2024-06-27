import * as authService from "../service/auth/authService.js";
import {isEmailInUse} from "../service/auth/validation.js";

// 공통 에러 처리 함수
const handleCommonError = (res, errorCode, errorMessage, description ) => {
    res.status(500).json({ errorCode, errorMessage, description });
};

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

/**
 * 사용자 등록 요청을 처리.
 *
 * @param {object} req - Express 요청 객체
 * @param {object} res - Express 응답 객체
 */
export const registerUser = async (req, res) => {
    const {uid, name, age, password, city, email, phone, gender, occupation, join_date, address} = req.body;

    try {
        // 필수 입력 필드 확인
        if (!uid || !name || !email || !password) {
            return handleCommonError(res, 100, "Bad Request Exception", "uid, name, email, and password are required");
        }

        // 이메일 중복 확인
        const isEmailUsed = isEmailInUse(email);
        if (isEmailUsed) {
            return handleCommonError(res, 100, "Unexpected Error", "Email already in use");
        }

        // 사용자 등록
        const user = await registerUser(req.body);

        // 응답 전송
        res.status(201).json(user);
    } catch (error) {
        console.error(error)
        handleCommonError(res, 900, "Unexpected Error", "Failed to create user");
    }
}