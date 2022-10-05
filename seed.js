
const mongoose = require('mongoose');
const Product = require('./models/product');
mongoose.connect('mongodb://127.0.0.1:27017/farmStand').then(() => {
    console.log("Mongo is now connected ");
}).catch(err =>{
    console.log(err);
    console.log("oops didnt connect");
})

// const p = new Product({
//     name :'Ruby Grapefruit',
//     price : 1.99,
//     caretgory : 'fruit'
// })
// p.save()
// .then((p) =>{
//     console.log(p);
// })
// .catch(err =>{
//     console.log(err);
// })
const seedProducts = [
    {
        name :'Fairy Eggplant',
        price : 1.00,
        category : 'vegetable'
    },
    {
        name :'Organic Goddess Melon',
        price : 4.99,
        category : 'fruit'
    },
    {
        name :'Orgainc Mini Seedless Watermelon',
        price : 3.99,
        category : 'fruit'
    },
    {
        name :'Orgainc Celery',
        price : 1.50,
        category : 'vegetable'
    },
    {
        name :'Chocolate Whole Milk',
        price : 2.69,
        category : 'diary'
    },
]
Product.insertMany(seedProducts)
.then(p=>{
    console.log(p);
})
.catch(err =>{
    console.log(err);
})