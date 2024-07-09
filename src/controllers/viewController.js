// controllers/viewController.js
import dotenv from "dotenv";
dotenv.config();

export const renderIndexPage = (req, res) => {
  const data = {
    title: "학술",
    message: "MOCK",
    endpoints: [
      { method: "GET", url: `${process.env.DOMAIN}/admin/users`, description: "전체 유저 조회", id: "user-count" },
      { method: "GET", url: `${process.env.DOMAIN}/books/book`, description: "전체 책 조회", id: "book-count" },
      { method: "GET", url: `${process.env.DOMAIN}/coupang_products/all`, description: "전체 쿠팡 제품 조회", id: "coupang-count" }
    ],
    specificEndpoints: [
      { method: "GET", url: `${process.env.DOMAIN}/admin/user/000043c2-b919-4281-9dab-f2a5b446973b`, description: "특정 유저 조회" },
      { method: "GET", url: `${process.env.DOMAIN}/books/info/1`, description: "특정 책 조회" },
      { method: "GET", url: `${process.env.DOMAIN}/coupang_products/product/1`, description: "특정 제품 조회" },
      { method: "GET", url: `${process.env.DOMAIN}/coupang_products/food`, description: "특정 카테고리 조회" }
    ],
    inputSections: [
      { type: "users", label: "/admin/user/", placeholder: "유저의 ID를 입력하세요" },
      { type: "books", label: "/books/info/", placeholder: "책의 ID를 입력하세요" },
      { type: "products", label: "/coupang_products/product/", placeholder: "제품의 ID를 입력하세요" },
      { type: "github", label: "/github/repos/", placeholder: "유저 ID/레포지트리 이름" }
    ]
  };

  res.render("index", data);
};

export const renderGuidePage = (req, res) => {
  const data = {
    message: "MOCK",
  };
  res.render('guide/index', data);
};

export const renderCoupangPage = (req, res) => {
  const data = {
    message: "MOCK",
  };
  res.render('guide/coupang', data);
}

export const renderBookPage = (req, res) => {
  const data = {
    message: "MOCK",
  };
  res.render('guide/books', data);
}

export const renderUserPage = (req, res) => {
  const data = {
    message: "MOCK",
  };
  res.render('guide/users', data);
}