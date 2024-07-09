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