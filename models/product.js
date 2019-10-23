const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

// const mongodb = require('mongodb');
// const getDB = require('../util/database').getDB;

// class Product {
//     constructor(title, price, description, imageUrl, id, userId) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId = userId;
//     }

//     save() {
//         const db = getDB();
//         let dbOp;
//         if (this._id) {
//             //Update the product
//             dbOp = db
//                 .collection('products')
//                 .updateOne({ _id: this._id }, { $set: this });
//         } else {
//             dbOp = db.collection('products').insertOne(this);
//         }
//         return db.collection('products')
//         .insertOne(this)
//         .then(result => {
//             console.log(result);
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     static fetchAll() {
//         const db = getDB();
//         return db
//         .collection('products')
//         .find()
//         .toArray() // returns a promise
//         .then(products => {
//             console.log(products);
//             return products;
//         })
//         .catch(err => console.log(err));
//     }

//     static findById(prodId) {
//         const db = getDB();
//         return db.collection('products')
//         .find({ _id: new mongodb.ObjectId(prodId) })
//         .next()
//         .then(product => {
//             return product;
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     static deleteById(prodId) {
//         const db = getDB();
//         return db
//         .collection('products')
//         .deleteOne({ _id: new mongodb.ObjectId(prodId)})
//         .then(result => {
//             console.log('Deleted');
//         })
//         .catch(err => {
//             console.log(err);
//         });

//     }


// }

// module.exports = Product;