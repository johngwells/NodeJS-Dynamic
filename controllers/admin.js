const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/edit-product", {
      prods: products,
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false
    });
  });
};

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

// for testing: http://localhost:3000/admin/edit-product/0.3849122264164735?edit=true
exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });
  });
};

exports.postEditProduct = (req, res) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  
  const updatedProduct = new Product(
    productId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDescription,
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products"
    });
  });
};
