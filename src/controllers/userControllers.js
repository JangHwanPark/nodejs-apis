import * as prismaService from "../service/prismaService.js";
import * as userService from "../service/userService.js";

import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

// 공통 에러 처리 함수
const handleCommonError = (res, errorCode, errorMessage, description ) => {
    res.status(500).json({ errorCode, errorMessage, description });
};

// Todo
export const createUser = async (req, res) => {
    try {
        const { uid,name, age, city, email, phone, gender, occupation, join_date, address, password } = req.body;
        const newUser = await prisma.users.create({
            data: {
                uid,
                name,
                age: parseInt(age),
                city,
                email,
                phone,
                gender,
                occupation,
                join_date,
                address,
                password,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        handleCommonError(res, 900, "Bad Request Exception", "Failed to create user");
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await prismaService.getAllData('users');
        res.status(200).json(users);
    } catch (error) {
        handleCommonError(res, 900, "Bad Request Exception", "Failed to retrieve users");
    }
}

export const findUserById = async (req, res) => {
    try {
        const user = await userService.findById(req.params.uid);
        if (user) res.status(200).json(user);
        else handleCommonError(res, 100, "Bad Request Exception", "Failed to retrieve users");
    } catch (error) {
        handleCommonError(res, 900, "Bad Request Exception", "Failed to retrieve users");
    }
}

export const findUserCount = async (req, res) => {
    try {
        const count = await userService.userCount();
        res.status(200).json({ count });
    } catch (error) {
        handleCommonError(res, 900, "Bad Request Exception", "Failed to retrieve users");
    }
}

// Todo
export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const { name, age, city, email, phone, gender, occupation, join_date, address, password } = req.body;
        const updatedUser = await prisma.users.update({
            where: { uid: String(uid) },
            data: {
                //name이 존재하는지 확인합니다. 만약 name이 존재하지 않으면 false를 반환하고, 이후의 표현식은 평가되지 않습니다.
                // name이 존재하면 { name } 객체를 반환합니다. 이렇게 하면 name 속성이 있는 객체가 생성됩니다.
                // 전개 연산자(...)는 이렇게 생성된 객체의 속성을 데이터 객체에 추가합니다.
                //결론 post 요청 보낼때 json에 원하는 열만 써도 댐
                ...(name && { name }),
                ...(age && { age }),
                ...(city && { city }),
                ...(email && { email }),
                ...(phone && { phone }),
                ...(gender && { gender }),
                ...(occupation && { occupation }),
                ...(join_date && { join_date }),
                ...(address && { address }),
                ...(password && { password }),
            },
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        handleCommonError(res, 900, "Bad Request Exception", "Failed to update users");
    }
}

export const deleteUserById = async (req, res) => {
    try {
        await userService.deleteById(req.params.uid)
        res.status(204).send();
    } catch (error) {
        handleCommonError(res, 900, "Bad Request Exception", "Failed to delete users");
    }
}