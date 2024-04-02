class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    addProduct({ title, description, price, thumbnail, code, stock }) {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw new Error('Todos los campos son obligatorios');
      }
  
      const productExists = this.products.some(product => product.code === code);
      if (productExists) {
        throw new Error('El código del producto ya existe');
      }
  
      const newProduct = {
        id: this.nextId++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      this.products.push(newProduct);
      return newProduct;
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (!product) {
        console.error('Not found');
        return null;
      }
      return product;
    }
  }
  
  // PRUEBA:
  const manager = new ProductManager();
  try {
    manager.addProduct({
      title: 'Producto 1',
      description: 'Descripción del Producto 1',
      price: 100,
      thumbnail: 'ruta/de/imagen.jpg',
      code: 'COD001',
      stock: 10
    });
    
    console.log(manager.getProducts());
    console.log(manager.getProductById(1));
  } catch (error) {
    console.error(error.message);
  }