const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products"
    });
  });
};

exports.getProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId, product => {
    res.render("shop/product-details", {
      product: product,
      pageTitle: "product.title",
      path: "/products"
    });
  });
}

exports.getIndex = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/"
    });
  });
};

exports.getCart = (req, res) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart"
  });
};

exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Order"
  });
};

exports.getCheckout = (req, res) => {
  res.render("/shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout"
  });
};
