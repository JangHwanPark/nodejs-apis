import prisma from "../utils/prismaClient.js";

export const userCount = async () => {
    return prisma.users.count();
}

// Todo
export const findById = async (uid) => {
    return prisma.users.findUnique({where: { uid: String(uid) }});
}

// Todo
export const deleteById = async (uid) => {
    return prisma.users.delete({where: { uid: String(uid) },});
}