import { validateEmailAndPassword, validateRegistrationData, isEmailInUse } from "../service/auth/validation.js";
import prisma from "../utils/prismaClient.js";

// Jest의 Mock 기능을 사용하여 prisma 클라이언트를 모킹합니다.
jest.mock("../utils/prismaClient.js", () => ({
    users: {
        findUnique: jest.fn()
    }
}));

describe('검증 함수들', () => {
    describe('validateEmailAndPassword', () => {
        it('이메일이 없으면 에러를 발생시켜야 한다', () => {
            expect(() => validateEmailAndPassword('', 'password')).toThrow('Email and password are required');
        });

        it('비밀번호가 없으면 에러를 발생시켜야 한다', () => {
            expect(() => validateEmailAndPassword('test@example.com', '')).toThrow('Email and password are required');
        });

        it('이메일과 비밀번호가 모두 제공되면 에러를 발생시키지 않아야 한다', () => {
            expect(() => validateEmailAndPassword('test@example.com', 'password')).not.toThrow();
        });
    });

    describe('validateRegistrationData', () => {
        it('uid가 없으면 에러를 발생시켜야 한다', () => {
            const userData = { name: 'Test', email: 'test@example.com', password: 'password' };
            expect(() => validateRegistrationData(userData)).toThrow('uid, name, email, and password are required');
        });

        it('name이 없으면 에러를 발생시켜야 한다', () => {
            const userData = { uid: '123', email: 'test@example.com', password: 'password' };
            expect(() => validateRegistrationData(userData)).toThrow('uid, name, email, and password are required');
        });

        it('email이 없으면 에러를 발생시켜야 한다', () => {
            const userData = { uid: '123', name: 'Test', password: 'password' };
            expect(() => validateRegistrationData(userData)).toThrow('uid, name, email, and password are required');
        });

        it('password가 없으면 에러를 발생시켜야 한다', () => {
            const userData = { uid: '123', name: 'Test', email: 'test@example.com' };
            expect(() => validateRegistrationData(userData)).toThrow('uid, name, email, and password are required');
        });

        it('모든 필수 필드가 제공되면 에러를 발생시키지 않아야 한다', () => {
            const userData = { uid: '123', name: 'Test', email: 'test@example.com', password: 'password' };
            expect(() => validateRegistrationData(userData)).not.toThrow();
        });
    });

    describe('isEmailInUse', () => {
        it('이메일이 이미 사용 중이면 true를 반환해야 한다', async () => {
            prisma.users.findUnique.mockResolvedValue({ id: 1, email: 'test@example.com' });
            const result = await isEmailInUse('test@example.com');
            expect(result).toBe(true);
        });

        it('이메일이 사용 중이 아니면 false를 반환해야 한다', async () => {
            prisma.users.findUnique.mockResolvedValue(null);
            const result = await isEmailInUse('notused@example.com');
            expect(result).toBe(false);
        });
    });
});