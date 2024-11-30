import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost", // 데이터베이스 호스트
    user: "root", // MySQL 사용자 이름
    password: "yourpassword", // MySQL 비밀번호
    database: "yourdatabase", // 데이터베이스 이름
});

export default pool;