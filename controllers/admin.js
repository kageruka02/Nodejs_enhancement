const Product = require("../models/productModel");
exports.getAddProduct = (req, res, next) => {
    console.log('hello my mother');
    res.render('admin/edit-product', {
        pageTitle: "Add Product",
        path: "/admin/add-product", 
        editing: false
        
    })
}
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    console.log(editMode);
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
        pageTitle: "edit Product",
        path: "/admin/edit-product",
        editing: true,
        product: product
        
    })
    })
    
}


exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
        const product = new Product(null, title, imageUrl, description, price)
     product.save();
        console.log("good final");
      res.redirect('/');
    
    
}
exports.getProductsAdmin = (req, res, next) => {
     Product.fetchAll((products) => {
         res.render('admin/products', {
        prods: products, pageTitle: "Admin Products", path: "/admin/products",hasProducts: products.length > 0,
         });
    })
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updateImageUrl = req.body.imageUrl;
    console.log(prodId, updatedTitle, updateImageUrl);
    const updatedProduct = new Product(prodId, updatedTitle, updateImageUrl, updatedDescription, updatedPrice);
    updatedProduct.save();
    res.redirect('/admin/products');
} 
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId, (isDeleted) => {
        if (isDeleted) {
            console.log(isDeleted);
              res.redirect("/admin/products")
        }
      
    });
}