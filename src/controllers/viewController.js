// controllers/viewController.js
import dotenv from "dotenv";
dotenv.config();

export const renderIndexPage = (req, res) => {
  const data = {
    title: "Resources",
    subTitle: "Routes",
    message: "MOCK",
    hero: "Home",
    endpoints: [
      { method: "GET", url: `${process.env.DOMAIN}/users/v1/get/all`, description: "/users/v1/get/all", id: "user-count" },
      { method: "GET", url: `${process.env.DOMAIN}/books/v1/get/all`, description: "/books/v1/get/all", id: "book-count" },
      { method: "GET", url: `${process.env.DOMAIN}/products/v1/get/all`, description: "/products/v1/get/all", id: "coupang-count" }
    ],

    specificEndpoints: [
      { method: "GET", url: `${process.env.DOMAIN}/users/v1/get/user/0fd41b40-6c25-497d-930d-1b3c44273ffa`, description: "/users/v1/get/user/:uid" },
      { method: "GET", url: `${process.env.DOMAIN}/books/v1/get/info/1`, description: "/books/v1/get/info/:id" },
      { method: "GET", url: `${process.env.DOMAIN}/products/v1/get/food`, description: "/products/v1/get/:category" }
    ],
  };

  res.render("index", data);
};

export const renderGuidePage = (req, res) => {
  const data = {
    message: "MOCK",
    hero: 'Documentation',
  };
  res.render('guide/index', data);
};

export const renderCoupangPage = (req, res) => {
  const data = {
    message: "MOCK",
    hero: 'Documentation',
    resourceFetch: `fetch('http://34.236.41.203:5000/products/v1/get/all')
        .then((response) => response.json())
        .then((json) => console.log(json));`,
    mock: {
      "pid": "6001",
      "category": "Electronics",
      "name": "Smartphone",
      "base_price": "100000",
      "price": "90000",
      "unit_price": "90000",
      "arrival": "2024-06-11",
      "rating": "4.5",
      "reward": "100",
      "url": "http://example.com/product/123"
    },
    errorMessage: {"error": "상품정보를 찾을 수 없습니다."}
  };
  res.render('guide/coupang', data);
}

export const renderBookPage = (req, res) => {
  const data = {
    message: "MOCK",
    hero: 'Books',
    getTitle: 'EndPoint - GET books/v1/get/all',
    getTitleId: 'EndPoint - GET books/v1/get/:id',
    resourceFetch: `fetch('http://34.236.41.203:5000/books/v1/get/all')
        .then((response) => response.json())
        .then((json) => console.log(json));`,
    descriptionAll: '도서 조회 API 는 데이터베이스에 등록된 모든 도서 정보를 JSON 형식으로 반환하는 API 입니다.',
    descriptionId: '이 API 는 도서의 고유 식별번호를 사용하여 특정 도서를 JSON 형식으로 반환하는 API 입니다.',
    mock: {
      "book_id": 2,
      "name": "예약판매 최고의 프로덕트는 무엇이 다른가",
      "category": "Computer Science",
      "author": "공옥순",
      "publisher": "2024.05.31",
      "discount": "10%",
      "price": "14,850원",
      "price_normal": "정가16,500원",
      "point": "820p",
      "description": "소",
      "review": "0.0",
      "img": "kyobo/book_img_002.jpg"
    },
    errorMessage: {"error": "도서정보를 찾을 수 없습니다."}
  };
  res.render('guide/books', data);
}

export const renderUserPage = (req, res) => {
  const data = {
    message: "MOCK",
    hero: 'Users',
    getTitle: 'EndPoint - GET users/v1/get/all',
    getTitleId: 'EndPoint - GET users/v1/get/:id',
    resourceFetch: `fetch('http://34.236.41.203:5000/users/v1/get/all')
        .then((response) => response.json())
        .then((json) => console.log(json));`,
    descriptionAll: '사용자 조회 API는 등록된 모든 사용자를 조회하여 JSON 형식으로 반환하는 API 입니다.',
    descriptionId: 'users/user/{uid} 는 사용자의 고유 식별번호를 사용하여 특정 사용자를 조회하여 JSON 형식으로 반환하는 API 입니다.',
    mock: {
      "uid": "123456",
      "name": "홍길동",
      "age": 25,
      "city": "서울",
      "email": "hong@example.com",
      "phone": "010-1234-5678",
      "gender": "남성",
      "occupation": "개발자",
      "join_date": "2023-06-07",
      "address": "서울특별시 강남구",
      "password": "securepassword123"
    },
    errorMessage: {"error": "사용자를를 찾을 수 없습니다"}
  };
  res.render('guide/users', data);
}