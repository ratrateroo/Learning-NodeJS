const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
    );

const getProductFromFile = callback => {
    
    fs.readFile(p, (error, fileContent) => {
        if (error) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}


module.exports = class Product {    
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        getProductFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), error => {
                console.log(error);
            });
        });
        
        
    }

    static fetchAll(callback) {
        getProductFromFile(callback);
        
    }

    static findById(id, callback) {
        getProductFromFile(products => {
            const product = products.find(p => p.id === id);
            callback(product);
        });
    }
};