// 모듈 임포트
import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

// 라우터 임포트
import routes from './routes/index.js';
import {
    renderBookPage,
    renderCoupangPage,
    renderGuidePage,
    renderIndexPage,
    renderUserPage
} from "./controllers/viewController.js";
import {retryMiddleware, timeoutMiddleware} from "./middlewares/retry.js";

// __dirname 및 __filename 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// 서버 설정
const app = express();
app.use(cors());         // 모든 프론트 서버 허용
app.use(express.json()); // JSON 형식의 요청 본문을 파싱


// ejs 를 사용자 뷰 엔진으로 설정
app.set('view engine', 'ejs');
// 뷰 파일의 디렉토리 설정
app.set('views', path.join(__dirname, 'views'));
// 정적파일 적용 - 정적 파일을 서빙할 디렉토리 설정
app.use(express.static(path.join(__dirname, 'public')));


// Router
app.get('/', renderIndexPage);
app.get('/guide', (req, res) => {
    console.log('GET /guide called');
    renderGuidePage(req, res);
});
app.get('/guide/get/coupang', renderCoupangPage);
app.get('/guide/get/books', renderBookPage);
app.get('/guide/get/users', renderUserPage);
app.use(routes);


// Timeout
app.use(timeoutMiddleware);
app.use(retryMiddleware);


// Start Server
app.listen(process.env.PORT, () => {
    console.log(`서버 시작 Port: ${process.env.PORT}`)
})