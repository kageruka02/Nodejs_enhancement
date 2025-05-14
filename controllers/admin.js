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
    Product.findByPk(prodId).then((product) => {
        if (!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
        pageTitle: "edit Product",
        path: "/admin/edit-product",
        editing: true,
        product: product
        
    })
    }).catch(err => {
        throw new Error(err);
    }) 
    
}


exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        userId: req.user.id
    }).then((newProduct) => {

        console.log(newProduct)
        res.redirect('/admin/products');
    }).catch((error) => {
        console.log(error);
    })
}
exports.getProductsAdmin = (req, res, next) => {
    Product.findAll().then((products) => {
        res.render('admin/products', {
            prods: products, pageTitle: "Admin Products", path: "/admin/products",hasProducts: products.length > 0,
             });
     }).catch(error => {
        throw new Error(error)
    })
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updateImageUrl = req.body.imageUrl;
    console.log(prodId, updatedTitle, updateImageUrl);
    Product.findByPk(prodId).then((product) => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDescription;
        product.imageUrl = updateImageUrl;
        return product.save()
    }).then(result => {
        console.log('SUCCESSFULLY UPDATED');
        res.redirect('/admin/products');
    }).catch(error => {
        throw new Error(error);
    })
   
} 
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId).then(product => {
        return product.destroy()
    }).then(result => {
        console.log('destroyed product');
        res.redirect("/admin/products")
    }).catch(error => {
        console.log(error)
    });
}