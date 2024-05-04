import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();

let productManager = new ProductManager();

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    let cantProducts = products.length;
    res.render('home', {
        products,
        cantProducts,
    });
}); 

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realtimeproducts', {
        products,
    });
});

router.get('/chat', (req, res) => {
    // const {socketServer} = req;
    res.render('chat', {});
});

export default router;