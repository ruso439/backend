const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor(filePath) {
        this.path = path.resolve(__dirname, filePath);
        this.id = 0;
        this.products = [];
    }

    addProduct(product) {
        product.id = ++this.id;
        this.products.push(product);
        this.saveProducts();
    }

    getProducts() {
        this.loadProducts();
        return this.products;
    }

    getProductById(id) {
        this.loadProducts();
        return this.products.find(product => product.id === id);
    }

    updateProduct(id, updatedProduct) {
        this.loadProducts();
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct };
            this.saveProducts();
            return true;
        }
        return false;
    }

    deleteProduct(id) {
        this.loadProducts();
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            return true;
        }
        return false;
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }

    loadProducts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            if (data) {
                this.products = JSON.parse(data);
                this.id = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
            }
        }
    }
}
