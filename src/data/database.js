/**
 * Archivo de datos simulada (base de datos) para TechStore
 * Implementa operaciones CRUD para productos, usuarios y blog posts
 */

// Datos iniciales
let products = [
    { id: 1, name: "Laptop Ultraligera", price: 1200, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Laptop", description: "Una laptop de alto rendimiento, ideal para trabajo y entretenimiento. Cuenta con un procesador de última generación y una batería de larga duración.", category: "Computadoras", stock: 10 },
    { id: 2, name: "Auriculares Inalámbricos", price: 150, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Auriculares", description: "Auriculares con cancelación de ruido y sonido de alta fidelidad. Perfectos para escuchar música o hacer llamadas sin interrupciones.", category: "Audio", stock: 25 },
    { id: 3, name: "Smartphone 5G", price: 800, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Smartphone", description: "El smartphone más rápido con conectividad 5G. Captura fotos impresionantes y disfruta de una fluidez inigualable en todas tus aplicaciones.", category: "Móviles", stock: 15 },
    { id: 4, name: "Smartwatch Deportivo", price: 250, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Smartwatch", description: "Monitoriza tus actividades físicas y notificaciones con estilo. Resistente al agua y con una batería que dura toda la semana.", category: "Wearables", stock: 30 },
    { id: 5, name: "Monitor 4K", price: 450, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Monitor", description: "Un monitor con una resolución impresionante para trabajo de diseño, edición de video y gaming. Los colores son vivos y el detalle es nítido.", category: "Monitores", stock: 12 },
    { id: 6, name: "Teclado Mecánico", price: 90, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Teclado", description: "Teclado con switches mecánicos para una respuesta táctil y sonora. Ideal para gamers y programadores.", category: "Periféricos", stock: 20 },
    { id: 7, name: "Mouse Gaming", price: 60, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Mouse", description: "Mouse ergonómico con alta precisión. Cuenta con botones programables y luces RGB personalizables.", category: "Periféricos", stock: 35 },
    { id: 8, name: "Cámara Web Full HD", price: 75, image: "https://via.placeholder.com/250x200/95a5a6/ffffff?text=Webcam", description: "Cámara web de alta resolución para videoconferencias y streaming. Captura imágenes claras y nítidas incluso con poca luz.", category: "Video", stock: 18 }
];

let users = [
    { id: 1, name: "Admin", email: "admin@techstore.com", password: "admin123", role: "admin", createdAt: new Date().toISOString() },
    { id: 2, name: "Juan Pérez", email: "juan@example.com", password: "user123", role: "user", createdAt: new Date().toISOString() },
    { id: 3, name: "María González", email: "maria@example.com", password: "user123", role: "user", createdAt: new Date().toISOString() }
];

let blogPosts = [
    { id: 1, title: "Los 5 Gadgets más Esperados de 2025", image: "https://via.placeholder.com/400x250/3498db/ffffff?text=Blog+Post+1", text: "Este año promete ser uno de los más emocionantes para la tecnología. Desde autos voladores hasta dispositivos de realidad aumentada, aquí te mostramos los gadgets que están a punto de cambiar el juego. Conoce las características que los hacen únicos y por qué debes tenerlos en tu lista de deseos.", author: "TechStore Team", createdAt: new Date().toISOString() },
    { id: 2, title: "Guía para Elegir tu Primera Laptop Gaming", image: "https://via.placeholder.com/400x250/3498db/ffffff?text=Blog+Post+2", text: "Adentrarse en el mundo del gaming en PC puede ser intimidante. Te explicamos los componentes clave que debes buscar en una laptop gaming: procesador, tarjeta gráfica, RAM y almacenamiento. Con nuestra guía, estarás listo para jugar tus títulos favoritos sin problemas.", author: "TechStore Team", createdAt: new Date().toISOString() },
    { id: 3, title: "El Futuro de la Realidad Virtual", image: "https://via.placeholder.com/400x250/3498db/ffffff?text=Blog+Post+3", text: "La realidad virtual ya no es solo para juegos. Desde la educación hasta la medicina, su aplicación está creciendo exponencialmente. Analizamos las tendencias futuras de la RV, incluyendo la integración de la IA y el desarrollo de hardware más ligero y potente.", author: "TechStore Team", createdAt: new Date().toISOString() }
];

let cart = [];
let orders = [];
let categories = [
    { id: 1, name: "Computadoras", description: "Laptops y computadoras de escritorio" },
    { id: 2, name: "Audio", description: "Auriculares y sistemas de audio" },
    { id: 3, name: "Móviles", description: "Smartphones y accesorios" },
    { id: 4, name: "Wearables", description: "Smartwatches y dispositivos portátiles" },
    { id: 5, name: "Monitores", description: "Monitores y pantallas" },
    { id: 6, name: "Periféricos", description: "Teclados, mouse y accesorios" },
    { id: 7, name: "Video", description: "Cámaras y equipos de video" }
];
let nextId = {
    products: Math.max(...products.map(p => p.id), 0) + 1,
    users: Math.max(...users.map(u => u.id), 0) + 1,
    blogPosts: Math.max(...blogPosts.map(b => b.id), 0) + 1,
    orders: 1,
    categories: Math.max(...categories.map(c => c.id), 0) + 1
};

// ============ PRODUCTOS CRUD ============

export const productService = {
    // READ - Obtener todos los productos
    getAll: () => {
        return [...products];
    },

    // READ - Obtener un producto por ID
    getById: (id) => {
        return products.find(p => p.id === parseInt(id));
    },

    // CREATE - Crear un nuevo producto
    create: (productData) => {
        const newProduct = {
            id: nextId.products++,
            ...productData,
            createdAt: new Date().toISOString()
        };
        products.push(newProduct);
        return newProduct;
    },

    // UPDATE - Actualizar un producto existente
    update: (id, productData) => {
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index === -1) {
            throw new Error('Producto no encontrado');
        }
        products[index] = {
            ...products[index],
            ...productData,
            updatedAt: new Date().toISOString()
        };
        return products[index];
    },

    // DELETE - Eliminar un producto
    delete: (id) => {
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index === -1) {
            throw new Error('Producto no encontrado');
        }
        const deleted = products.splice(index, 1)[0];
        return deleted;
    },

    // Buscar productos por nombre o categoría
    search: (query) => {
        const lowerQuery = query.toLowerCase();
        return products.filter(p => 
            p.name.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery)
        );
    },

    // Obtener productos por categoría
    getByCategory: (category) => {
        return products.filter(p => p.category === category);
    },

    // Obtener productos críticos (stock bajo)
    getCriticalProducts: (threshold = 15) => {
        return products.filter(p => p.stock <= threshold);
    },

    // Obtener productos en oferta (simulado: productos con descuento del 20% o más)
    getOnSale: () => {
        // Para simular ofertas, podríamos marcar algunos productos
        // Por ahora retornamos productos con precio menor a cierto umbral
        return products.filter(p => p.price < 300);
    }
};

// ============ USUARIOS CRUD ============

export const userService = {
    // READ - Obtener todos los usuarios
    getAll: () => {
        return users.map(u => ({ ...u, password: undefined })); // No devolver passwords
    },

    // READ - Obtener un usuario por ID
    getById: (id) => {
        const user = users.find(u => u.id === parseInt(id));
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    },

    // READ - Obtener usuario por email
    getByEmail: (email) => {
        return users.find(u => u.email === email);
    },

    // CREATE - Crear un nuevo usuario
    create: (userData) => {
        const newUser = {
            id: nextId.users++,
            role: 'user',
            ...userData,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    },

    // UPDATE - Actualizar un usuario existente
    update: (id, userData) => {
        const index = users.findIndex(u => u.id === parseInt(id));
        if (index === -1) {
            throw new Error('Usuario no encontrado');
        }
        users[index] = {
            ...users[index],
            ...userData,
            updatedAt: new Date().toISOString()
        };
        const { password, ...userWithoutPassword } = users[index];
        return userWithoutPassword;
    },

    // DELETE - Eliminar un usuario
    delete: (id) => {
        const index = users.findIndex(u => u.id === parseInt(id));
        if (index === -1) {
            throw new Error('Usuario no encontrado');
        }
        const deleted = users.splice(index, 1)[0];
        const { password, ...userWithoutPassword } = deleted;
        return userWithoutPassword;
    },

    // Autenticar usuario
    authenticate: (email, password) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    }
};

// ============ BLOG POSTS CRUD ============

export const blogService = {
    // READ - Obtener todos los blog posts
    getAll: () => {
        return [...blogPosts];
    },

    // READ - Obtener un blog post por ID
    getById: (id) => {
        return blogPosts.find(b => b.id === parseInt(id));
    },

    // CREATE - Crear un nuevo blog post
    create: (postData) => {
        const newPost = {
            id: nextId.blogPosts++,
            author: "TechStore Team",
            ...postData,
            createdAt: new Date().toISOString()
        };
        blogPosts.push(newPost);
        return newPost;
    },

    // UPDATE - Actualizar un blog post existente
    update: (id, postData) => {
        const index = blogPosts.findIndex(b => b.id === parseInt(id));
        if (index === -1) {
            throw new Error('Blog post no encontrado');
        }
        blogPosts[index] = {
            ...blogPosts[index],
            ...postData,
            updatedAt: new Date().toISOString()
        };
        return blogPosts[index];
    },

    // DELETE - Eliminar un blog post
    delete: (id) => {
        const index = blogPosts.findIndex(b => b.id === parseInt(id));
        if (index === -1) {
            throw new Error('Blog post no encontrado');
        }
        const deleted = blogPosts.splice(index, 1)[0];
        return deleted;
    }
};

// ============ CARRITO ============

export const cartService = {
    // Obtener carrito
    get: () => {
        return [...cart];
    },

    // Añadir producto al carrito
    add: (productId, quantity = 1) => {
        const product = products.find(p => p.id === parseInt(productId));
        if (!product) {
            throw new Error('Producto no encontrado');
        }

        const existingItem = cart.find(item => item.productId === parseInt(productId));
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                productId: parseInt(productId),
                product: product,
                quantity: quantity
            });
        }
        return cart;
    },

    // Remover producto del carrito
    remove: (productId) => {
        const index = cart.findIndex(item => item.productId === parseInt(productId));
        if (index !== -1) {
            cart.splice(index, 1);
        }
        return cart;
    },

    // Actualizar cantidad
    updateQuantity: (productId, quantity) => {
        const item = cart.find(item => item.productId === parseInt(productId));
        if (item) {
            if (quantity <= 0) {
                return cartService.remove(productId);
            }
            item.quantity = quantity;
        }
        return cart;
    },

    // Limpiar carrito
    clear: () => {
        cart = [];
        return cart;
    },

    // Obtener total
    getTotal: () => {
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    },

    // Obtener cantidad de items
    getCount: () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    }
};

// ============ CATEGORÍAS CRUD ============

export const categoryService = {
    // READ - Obtener todas las categorías
    getAll: () => {
        return [...categories];
    },

    // READ - Obtener una categoría por ID
    getById: (id) => {
        return categories.find(c => c.id === parseInt(id));
    },

    // READ - Obtener una categoría por nombre
    getByName: (name) => {
        return categories.find(c => c.name === name);
    },

    // CREATE - Crear una nueva categoría
    create: (categoryData) => {
        const newCategory = {
            id: nextId.categories++,
            ...categoryData,
            createdAt: new Date().toISOString()
        };
        categories.push(newCategory);
        return newCategory;
    },

    // UPDATE - Actualizar una categoría existente
    update: (id, categoryData) => {
        const index = categories.findIndex(c => c.id === parseInt(id));
        if (index === -1) {
            throw new Error('Categoría no encontrada');
        }
        categories[index] = {
            ...categories[index],
            ...categoryData,
            updatedAt: new Date().toISOString()
        };
        return categories[index];
    },

    // DELETE - Eliminar una categoría
    delete: (id) => {
        const index = categories.findIndex(c => c.id === parseInt(id));
        if (index === -1) {
            throw new Error('Categoría no encontrada');
        }
        const deleted = categories.splice(index, 1)[0];
        return deleted;
    }
};

// ============ ÓRDENES CRUD ============

export const orderService = {
    // READ - Obtener todas las órdenes
    getAll: () => {
        return [...orders];
    },

    // READ - Obtener órdenes de un usuario
    getByUserId: (userId) => {
        return orders.filter(o => o.userId === parseInt(userId));
    },

    // READ - Obtener una orden por ID
    getById: (id) => {
        return orders.find(o => o.id === parseInt(id));
    },

    // CREATE - Crear una nueva orden
    create: (orderData) => {
        const newOrder = {
            id: nextId.orders++,
            status: 'pending',
            ...orderData,
            createdAt: new Date().toISOString()
        };
        orders.push(newOrder);
        return newOrder;
    },

    // UPDATE - Actualizar una orden existente
    update: (id, orderData) => {
        const index = orders.findIndex(o => o.id === parseInt(id));
        if (index === -1) {
            throw new Error('Orden no encontrada');
        }
        orders[index] = {
            ...orders[index],
            ...orderData,
            updatedAt: new Date().toISOString()
        };
        return orders[index];
    },

    // DELETE - Eliminar una orden
    delete: (id) => {
        const index = orders.findIndex(o => o.id === parseInt(id));
        if (index === -1) {
            throw new Error('Orden no encontrada');
        }
        const deleted = orders.splice(index, 1)[0];
        return deleted;
    },

    // Procesar pago y crear orden
    processPayment: (userId, cartItems, paymentData) => {
        const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        
        // Simular procesamiento de pago
        const paymentSuccess = Math.random() > 0.1; // 90% de éxito

        if (paymentSuccess) {
            const newOrder = {
                id: nextId.orders++,
                userId: parseInt(userId),
                items: cartItems.map(item => ({
                    productId: item.productId,
                    productName: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price,
                    subtotal: item.product.price * item.quantity
                })),
                total: total,
                status: 'completed',
                paymentMethod: paymentData.method || 'credit_card',
                shippingAddress: paymentData.shippingAddress || {},
                createdAt: new Date().toISOString()
            };
            orders.push(newOrder);
            return { success: true, order: newOrder };
        } else {
            return { success: false, error: 'Error en el procesamiento del pago' };
        }
    }
};
