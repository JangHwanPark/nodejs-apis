import {registerUserService} from "../../service/auth/registerService.js";

// 공통 에러 처리 함수
const handleCommonError = (res, errorCode, errorMessage, description) => {
  res.status(500).json({errorCode, errorMessage, description});
};


/**
 * 사용자 등록 요청을 처리.
 *
 * @param {object} req - Express 요청 객체
 * @param {object} res - Express 응답 객체
 */
export const registerUserControllers = async (req, res) => {
  const { name, age, password, city, email, phone, gender, occupation, join_date, address } = req.body;

  try {

    // 필수 입력 필드 확인
    if (!name || !email || !password) {
      return handleCommonError(res, 100, "Bad Request Exception", "name, email, and password are required");
    }

    // 사용자 등록
    const user = await registerUserService(req.body);
    console.log(user)

    // 응답 전송
    res.status(201).json(user);
  } catch (error) {
    console.error(error)
    handleCommonError(res, 900, "Unexpected Error", "Failed to create user");
  }
}