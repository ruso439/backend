import {Router} from "express";
import { json } from "express";
import ProductManager from "../productManager.js";

const productRouter = Router();
const productos = new ProductManager();

productRouter.use(json());

productRouter.get("/", async (req, res) => {
    try {
        const prods = await productos.getProducts();
        const { limit } = req.query;
        if (limit) {
            return res.send(prods.slice(0, limit));
        } else {
            res.send(prods);
        }
    } catch (error) {
        res.status(404).send({ error: `${error}` });
    }
});

productRouter.get("/:pid", async (req, res) => {
    try {
        const idp = req.params.pid;
        const prod = await productos.getProductById(idp);
        if (prod) {
            return res.send(prod);
        } else {
            res.status(404).send(`El producto con codigo ${idp} no existe`);
        }
    } catch (error) {
        res.status(500).send({ error: `${error}` });
    }
});

productRouter.post("/", async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body;
        const result = await productos.addProduct(title, description, code, price, status, stock, category, thumbnail);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: `${error}` });
    }
});

productRouter.put("/:pid", async (req, res) => {
    try {
        const idp = req.params.pid;
        const updateData = req.body;
        const prod = await productos.getProductById(idp);
        if (!prod) {
            return res.status(404).send(`El producto con codigo ${idp} no existe`);
        }
        await productos.updateProduct(idp, updateData);
        res.send(`Producto codigo ${idp} actualizado`);
    } catch (error) {
        res.status(500).send({ error: `${error}` });
    }
});

productRouter.delete("/:pid", async (req, res) => {
    try {
        const idp = req.params.pid;
        const prod = await productos.getProductById(idp);
        if (!prod) {
            return res.status(404).send(`El producto con codigo ${idp} no existe`);
        }
        await productos.deleteProduct(idp);
        res.send(`Producto codigo ${idp} eliminado`);
    } catch (error) {
        res.status(500).send({ error: `${error}` });
    }
});

export default productRouter;