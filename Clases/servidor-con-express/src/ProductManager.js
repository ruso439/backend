const fs = require('fs').promises;


class ProductManager {
    
    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];
        this.nextId = 1;
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            if (data) {
                const products = JSON.parse(data);
                this.products = products;
                this.nextId = products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;
            }
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('Archivo no encontrado, se creará uno nuevo.');
            } else if (error instanceof SyntaxError) {
                console.error('Error al analizar JSON:', error);
            } else {
                throw error;
            }
        }
    }

    async saveProducts() {
        const data = JSON.stringify(this.products);
        await fs.writeFile(this.filePath, data);
    }

    getProducts(limit) {
        return limit ? this.products.slice(0, limit) : [...this.products];
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    addProduct(product) {
        const newProduct = { ...product, id: this.nextId++ };
        this.products.push(newProduct);
        return newProduct;
    }

    updateProduct(id, updatedProduct) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            Object.assign(product, updatedProduct);
            return product;
        }
        return null;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            const [deletedProduct] = this.products.splice(index, 1);
            return deletedProduct;
        }
        return null;
    }
}

module.exports = ProductManager;