const fs = require('fs');
const path = require('path');
const Cart = require('./cartModel');

 const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');
const getProductsFromFile = cb => {
      
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return cb([])
            }
            if (fileContent.toString().trim()) {
                return cb(JSON.parse(fileContent));
            }
            else {
                cb([])
            }
            
        })
}
module.exports = class Product{
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save() { //create new product and edit the product 

        
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if (err) {
                    console.error("Error writing file:", error);
                }
            })

            }
            else {
                this.id = Math.random().toString();
                  products.push(this)
             fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    console.error("Error writing file:", error);
                }
            })
            }
          
        })
       
    }
    static deleteById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
              const updatedProducts = products.filter(p => p.id !== id);
              fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                  if (!err) {
                      Cart.deleteProduct(id, product.price); 
                  }
                  cb(true);
              })
          })
    }
    static fetchAll(cb) {
      getProductsFromFile(cb)
    }
    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        })
    }
}