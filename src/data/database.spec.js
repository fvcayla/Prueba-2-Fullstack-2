/**
 * Pruebas unitarias para database.js
 * Verifica las operaciones CRUD de productos, usuarios y blog posts
 */

import {
  productService,
  userService,
  blogService,
  cartService
} from './database';

describe('Database Service Tests', () => {
  // Backup de datos originales (simulado)
  let originalProducts, originalUsers, originalBlogPosts;

  beforeEach(() => {
    // Guardar estado original (en un escenario real, resetearías los datos)
    originalProducts = productService.getAll().length;
    originalUsers = userService.getAll().length;
    originalBlogPosts = blogService.getAll().length;
  });

  describe('ProductService', () => {
    it('debería obtener todos los productos', () => {
      const products = productService.getAll();
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    it('debería obtener un producto por ID', () => {
      const product = productService.getById(1);
      expect(product).toBeDefined();
      expect(product.id).toBe(1);
      expect(product.name).toBeDefined();
    });

    it('debería crear un nuevo producto', () => {
      const newProduct = {
        name: 'Producto Test',
        price: 100,
        image: 'https://example.com/image.jpg',
        description: 'Descripción test',
        category: 'Test',
        stock: 10
      };

      const created = productService.create(newProduct);
      expect(created).toBeDefined();
      expect(created.id).toBeDefined();
      expect(created.name).toBe(newProduct.name);
      expect(created.price).toBe(newProduct.price);
    });

    it('debería actualizar un producto existente', () => {
      const product = productService.getById(1);
      if (!product) return;

      const updatedData = {
        name: 'Producto Actualizado',
        price: 150
      };

      const updated = productService.update(1, updatedData);
      expect(updated.name).toBe(updatedData.name);
      expect(updated.price).toBe(updatedData.price);
    });

    it('debería eliminar un producto', () => {
      const allProducts = productService.getAll();
      const lastProduct = allProducts[allProducts.length - 1];
      
      if (lastProduct && lastProduct.id > 8) { // Solo eliminar si es un producto de prueba
        const deleted = productService.delete(lastProduct.id);
        expect(deleted).toBeDefined();
        expect(productService.getById(lastProduct.id)).toBeUndefined();
      }
    });

    it('debería buscar productos por query', () => {
      const results = productService.search('Laptop');
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
    });

    it('debería obtener productos por categoría', () => {
      const products = productService.getAll();
      if (products.length > 0) {
        const category = products[0].category;
        const filtered = productService.getByCategory(category);
        expect(Array.isArray(filtered)).toBe(true);
        filtered.forEach(p => expect(p.category).toBe(category));
      }
    });
  });

  describe('UserService', () => {
    it('debería obtener todos los usuarios', () => {
      const users = userService.getAll();
      expect(users).toBeDefined();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);
      // Verificar que no se devuelven passwords
      users.forEach(user => {
        expect(user.password).toBeUndefined();
      });
    });

    it('debería obtener un usuario por ID', () => {
      const user = userService.getById(1);
      expect(user).toBeDefined();
      expect(user.id).toBe(1);
      expect(user.password).toBeUndefined();
    });

    it('debería crear un nuevo usuario', () => {
      const newUser = {
        name: 'Usuario Test',
        email: 'test@example.com',
        password: 'password123'
      };

      const created = userService.create(newUser);
      expect(created).toBeDefined();
      expect(created.id).toBeDefined();
      expect(created.name).toBe(newUser.name);
      expect(created.email).toBe(newUser.email);
      expect(created.password).toBeUndefined();
      expect(created.role).toBe('user');
    });

    it('debería autenticar un usuario correcto', () => {
      const user = userService.authenticate('admin@techstore.com', 'admin123');
      expect(user).toBeDefined();
      expect(user.email).toBe('admin@techstore.com');
      expect(user.password).toBeUndefined();
    });

    it('debería fallar la autenticación con credenciales incorrectas', () => {
      const user = userService.authenticate('wrong@example.com', 'wrongpass');
      expect(user).toBeNull();
    });
  });

  describe('BlogService', () => {
    it('debería obtener todos los blog posts', () => {
      const posts = blogService.getAll();
      expect(posts).toBeDefined();
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
    });

    it('debería obtener un blog post por ID', () => {
      const post = blogService.getById(1);
      expect(post).toBeDefined();
      expect(post.id).toBe(1);
      expect(post.title).toBeDefined();
    });

    it('debería crear un nuevo blog post', () => {
      const newPost = {
        title: 'Blog Post Test',
        text: 'Contenido del blog post',
        image: 'https://example.com/image.jpg'
      };

      const created = blogService.create(newPost);
      expect(created).toBeDefined();
      expect(created.id).toBeDefined();
      expect(created.title).toBe(newPost.title);
      expect(created.author).toBeDefined();
    });
  });

  describe('CartService', () => {
    beforeEach(() => {
      cartService.clear();
    });

    it('debería obtener el carrito', () => {
      const cart = cartService.get();
      expect(Array.isArray(cart)).toBe(true);
    });

    it('debería añadir un producto al carrito', () => {
      cartService.add(1, 1);
      const cart = cartService.get();
      expect(cart.length).toBe(1);
      expect(cart[0].productId).toBe(1);
      expect(cart[0].quantity).toBe(1);
    });

    it('debería incrementar la cantidad si el producto ya está en el carrito', () => {
      cartService.add(1, 1);
      cartService.add(1, 2);
      const cart = cartService.get();
      expect(cart.length).toBe(1);
      expect(cart[0].quantity).toBe(3);
    });

    it('debería remover un producto del carrito', () => {
      cartService.add(1, 1);
      cartService.remove(1);
      const cart = cartService.get();
      expect(cart.length).toBe(0);
    });

    it('debería calcular el total correctamente', () => {
      cartService.add(1, 2);
      const product = productService.getById(1);
      const total = cartService.getTotal();
      expect(total).toBe(product.price * 2);
    });

    it('debería obtener el conteo de items', () => {
      cartService.add(1, 2);
      cartService.add(2, 1);
      const count = cartService.getCount();
      expect(count).toBe(3);
    });

    it('debería limpiar el carrito', () => {
      cartService.add(1, 1);
      cartService.add(2, 1);
      cartService.clear();
      const cart = cartService.get();
      expect(cart.length).toBe(0);
    });
  });
});
