import {isEmailInUse} from "../../service/auth/validation.js";

// 공통 에러 처리 함수
const handleCommonError = (res, errorCode, errorMessage, description ) => {
    res.status(500).json({ errorCode, errorMessage, description });
};


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