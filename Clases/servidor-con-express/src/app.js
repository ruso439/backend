const express = require('express');
const ProductManager = require('./ProductManager'); 

const app = express();
const productManager = new ProductManager('./products.json'); 

app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    let products = await productManager.getProducts();
    if (limit) {
        products = products.slice(0, limit);
    }
    res.json(products);
});

app.get('/products/:pid', async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);
    res.json(product);
});



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));