import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validateEmailAndPassword } from "./validation.js";
import prisma from "../../utils/prismaClient.js";

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

    try {
        // 사용자 찾기
        console.log("이메일로 사용자 찾기 시도:", email);
        const user = await prisma.users.findUnique({ where: { email } });
        console.log("찾은 사용자:", user);

        if (!user) {
            throw new Error('Invalid email');
        }

        // 데이터베이스에 저장된 비밀번호가 해싱되지 않은 경우, 비밀번호를 해싱하여 비교
        let hashedPasswordFromDB = user.password;
        console.log("해싱된 비밀번호 (DB에서):", hashedPasswordFromDB);

        if (!hashedPasswordFromDB.startsWith("$2a$")) {
            // 데이터베이스에 저장된 비밀번호가 해싱되지 않은 경우에만 해싱 처리
            console.log("비밀번호가 해싱되지 않았음. 해싱 중...");
            hashedPasswordFromDB = await bcrypt.hash(user.password, 10);
            console.log("해싱된 비밀번호:", hashedPasswordFromDB);

            // 데이터베이스에 해싱된 비밀번호 업데이트
            await prisma.users.update({
                where: { email },
                data: { password: hashedPasswordFromDB },
            });
            console.log("데이터베이스에 해싱된 비밀번호 업데이트 완료.");
        }

        // 비밀번호 비교
        const isPasswordValid = await bcrypt.compare(password, hashedPasswordFromDB);
        console.log("비밀번호 유효성 검사 결과:", isPasswordValid);

        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // JWT 액세스 토큰 생성 (토큰 페이로드에 필요한 정보만 포함)
        const accessToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
        );
        console.log("액세스 토큰 생성 완료:", accessToken);

        // JWT 리프레시 토큰 생성 
        const refreshToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
        );
        console.log("리프레시 토큰 생성 완료:", refreshToken);

        // 데이터베이스에 리프레시 토큰 저장
        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id
            }
        });
        console.log("리프레시 토큰 데이터베이스 저장 완료.");

        return { user, accessToken, refreshToken };
    } catch (error) {
        console.error("사용자 인증 중 에러 발생:", error.message);
        throw new Error("인증 실패");
    }
};
