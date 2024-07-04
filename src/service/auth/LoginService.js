import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {validateEmailAndPassword} from "./validation.js";
import redis from "redis";
import prisma from "../../utils/prismaClient.js";
import { promisify } from "util";
import dotenv from "dotenv";
dotenv.config()

console.log("acc" , process.env.ACCESS_TOKEN_EXPIRATION)
// Redis 클라이언트 설정
const redisClient = redis.createClient();
const setAsync = promisify(redisClient.set).bind(redisClient);
const getAsync = promisify(redisClient.get).bind(redisClient);


// JWT 토큰 생성
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {id: user.id, email: user.email},
    process.env.JWT_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION}
  )

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
  )

  return { accessToken, refreshToken };
};


// 비밀번호 검증 및 사용자 반환
const validateCredentials = async (email, password) => {
  console.log("데이터베이스에서 사용자 찾기 시도:", email);
  const user = await prisma.users.findUnique({
    where: { email }
  });
  console.log("사용자 찾기 결과:", user);

  if (!user) throw new Error('Invalid email');

  console.log("사용자의 비밀번호 검증 시도:", password);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log("비밀번호 검증 결과:", isPasswordValid);

  if (!isPasswordValid) throw new Error('Invalid email or password');
  return user;
};


/**
 * 사용자 인증을 처리하고 JWT 토큰을 생성한다.
 *
 * @param {string} email - 사용자의 이메일
 * @param {string} password - 사용자의 비밀번호
 * @returns {object} - 사용자 객체와 JWT 토큰
 * @throws {Error} - 인증 실패 시 에러 발생
 */
export const authenticateUser = async (email, password) => {
  validateEmailAndPassword(email, password);
  console.log("이메일과 비밀번호 검증 통과:", email);

  try {
    const user = await validateCredentials(email, password);
    const { accessToken, refreshToken } = generateTokens(user);

    // 데이터베이스에 리프레시 토큰 저장
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        user: { connect: { uid: user.uid } }
      }
    });

    return { user, accessToken, refreshToken };
  } catch (error) {
    console.error("사용자 인증 중 에러 발생:", error.message);
    throw new Error("인증 실패");
  }
};


// JWT 토큰 검증 함수
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

// 토큰을 블랙리스트에 추가하는 함수
export const addToBlacklist = async (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded) {
      throw new Error("Invalid token");
    }

    // 토큰의 만료 시간을 구함
    const expiresAt = decoded.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    // 토큰이 이미 만료된 경우 예외 처리
    if (expiresAt <= currentTime) {
      throw new Error("Token is already expired");
    }

    // 블랙리스트에 토큰을 추가하고 만료 시간 설정
    await setAsync(token, "blacklisted");
    redisClient.expireat(token, expiresAt);
  } catch (error) {
    throw new Error("Failed to blacklist token");
  }
};

// 블랙리스트에 토큰이 있는지 확인하는 함수
export const isTokenBlacklisted = async (token) => {
  const result = await getAsync(token);
  return result === "blacklisted";
};