const Product = require('../models/product')

const getAllProducts = async(req, res) => {
    const { featured, name, sort, section } = req.query;

    const queryObjects = {};

    if (featured) {
        queryObjects.featured = featured === 'true' ? true : false;
    }

    if (name) {
        queryObjects.name = { $regex: name, $options: 'i' };
    }
    if(section) {
        queryObjects.gender = section;
    }

    let result = Product.find(queryObjects)
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    } else {
        result = result.sort("createdAt")
    }



    const products = await result
    res.status(200).json({ products, nbProducts: products.length });
}

const createProduct = async(req, res) => { 
    const product = await Product.create(req.body);
    res.status(201).json({ product });
}

const getProduct = async(req, res) => {
    const {id: id} = req.params;
    const product = await Product.findOne({ _id: id });
    
    if(!product) {
        res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product });
}

module.exports = { getAllProducts, getProduct, createProduct };