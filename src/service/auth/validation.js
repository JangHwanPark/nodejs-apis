import prisma from "../../utils/prismaClient.js";

export const validateEmailAndPassword = (email, password) => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
}

export const validateRegistrationData = (userData) => {
    const { name, email, password } = userData;
    if (!name || !email || !password) {
        throw new Error('uid, name, email, and password are required');
    }
}

/**
 * 이메일 중복 확인
 *
 * @param {string} email - 확인할 이메일
 * @returns {boolean} - 중복된 이메일이 있는지 여부
 */
export const isEmailInUse = async (email) => {
    return prisma.users.findUnique({
        where: {email}
    });
}