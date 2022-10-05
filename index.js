const express =require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1:27017/farmStand').then(() => {
    console.log("Mongo is now connected ");
}).catch(err =>{
    console.log(err);
    console.log("oops didnt connect");
})
app.set('view engine' ,'ejs');
app.use(express.urlencoded({extended : true}))
app.use(methodOverride('_method'));
app.get('/products' , async (req, res) => {
    const {category} = req.query;
    if(category){
        const products = await Product.find({category : category})
        res.render('products/index', {products,category});
    }else{
        const products = await Product.find({})
        res.render('products/index', {products ,category :"All"});
    }

    
    
    // console.log(products);
   
})
//hamesha new upar rakho 
app.get('/products/new' , (req,res) =>{
    res.render('products/new');
})
app.post('/products' ,async (req,res) =>{
    console.log(req.body);
   const newProduct =  new Product (req.body)
  await newProduct.save();
   res.redirect('/products');
   
})

app.get('/products/:id' , async (req,res) =>{
    const {id }= req.params;
    const foundProduct =  await Product.findById(id);
//    console.log(foundProduct);
    res.render('products/show' , {foundProduct});

})
//product.find and all are model methods 
app.get('/products/:id/edit' ,async (req,res) =>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit',{product});
})
app.put('/products/:id' , async (req,res) =>{
    const {id} = req.params;
   const product = await Product.findByIdAndUpdate(id,req.body,{runValidators : true , new : true});
   
    res.redirect(`/products/${product._id}`)
})
app.delete('/products/:id' , async (req,res) => {
    const {id} = req.params;
   const deleteProduct = await Product.findByIdAndDelete(id);
   res.redirect('/products');
})
app.listen(3000, ()=>{
 console.log('Listening on port 3000');
})