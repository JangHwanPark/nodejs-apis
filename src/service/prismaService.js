import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

/**
 * 주어진 테이블의 모든 데이터를 조회한다.
 * PrismaClient에서 테이블 이름을 동적으로 접근하는 방법으로 객체의 동적 속성 접근 방식을 사용한다. (배열 인덱싱 표기법([])을 통해 동적으로 속성에 접근할 수 있다.)
 *
 * @param {string} table - 조회할 테이블 이름
 * @returns {Promise<Array>} - 조회된 데이터 배열
 */
export const getAllData = (table) => {
    return prisma[table].findMany()
}