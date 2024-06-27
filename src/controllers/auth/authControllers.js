import {authenticateUser} from "../../service/auth/authService.js";

// 공통 에러 처리 함수
const handleCommonError = (res, errorCode, errorMessage, description ) => {
    res.status(500).json({ errorCode, errorMessage, description });
};


// 로그인
/**
 * 사용자 로그인 요청을 처리합니다.
 *
 * @param {object} req - Express 요청 객체
 * @param {object} res - Express 응답 객체
 */
export const signIn = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // 필수 입력 필드 확인
      if (!email || !password) {
        return handleCommonError(res, 400, 'Bad Request Exception', 'Email and password are required');
      }
  
      // 사용자 인증, 토큰 생성
      const { user, accessToken } = await authenticateUser(email, password);
  
      // 로그인 성공
      console.log(`사용자 ${email}이(가) 로그인하였습니다.`);
      res.status(200).json({
        message: 'Login successful',
        user: user,
        accessToken: accessToken,
      });
    } catch (error) {
      console.error(`사용자 ${email} 로그인 중 에러 발생:`, error.message);
      handleCommonError(res, 500, 'Unexpected Error', 'Failed to login user');
    }
  };


// 로그아웃
export const signOut = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        verifyToken(token);
        addToBlacklist(token);
        res.status(200).json({message: "Logout successful"});
    } catch (error) {
        handleCommonError(res, 500, "Unexpected Error", "Failed to log out");
    }
}