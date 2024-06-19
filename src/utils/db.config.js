// 모듈 임포트
import mysql from "mysql2";
import dotenv from "dotenv";

// 서버 설정
dotenv.config();

// 데이터베이스 연동
const dbInfo =  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    //database: process.env.DB_NAME
}
console.log(dbInfo)

export async function init() {
    const connection = await mysql.createConnection(dbInfo);
    console.log("MySQL is connected successfully!");
    return connection;
}