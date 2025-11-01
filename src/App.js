import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Blog from './pages/Blog/Blog';
import BlogDetail from './pages/BlogDetail/BlogDetail';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Categories from './pages/Categories/Categories';
import CategoryDetail from './pages/CategoryDetail/CategoryDetail';
import Offers from './pages/Offers/Offers';
import Checkout from './pages/Checkout/Checkout';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';
import PaymentError from './pages/PaymentError/PaymentError';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts/AdminProducts';
import AdminUsers from './pages/Admin/AdminUsers/AdminUsers';
import AdminProductForm from './pages/Admin/AdminProductForm/AdminProductForm';
import AdminProductDetail from './pages/Admin/AdminProductDetail/AdminProductDetail';
import AdminUserForm from './pages/Admin/AdminUserForm/AdminUserForm';
import AdminUserDetail from './pages/Admin/AdminUserDetail/AdminUserDetail';
import AdminOrders from './pages/Admin/AdminOrders/AdminOrders';
import AdminOrderDetail from './pages/Admin/AdminOrderDetail/AdminOrderDetail';
import AdminCriticalProducts from './pages/Admin/AdminCriticalProducts/AdminCriticalProducts';
import AdminReports from './pages/Admin/AdminReports/AdminReports';
import AdminCategories from './pages/Admin/AdminCategories/AdminCategories';
import AdminCategoryForm from './pages/Admin/AdminCategoryForm/AdminCategoryForm';
import AdminPurchaseHistory from './pages/Admin/AdminPurchaseHistory/AdminPurchaseHistory';
import AdminProfile from './pages/Admin/AdminProfile/AdminProfile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          {/* TIENDA - Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/categorias/:id" element={<CategoryDetail />} />
          <Route path="/ofertas" element={<Offers />} />
          <Route path="/comprar" element={<Checkout />} />
          <Route path="/pago-correcto" element={<PaymentSuccess />} />
          <Route path="/pago-error" element={<PaymentError />} />
          
          {/* ADMINISTRADOR - Rutas protegidas */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/perfil" element={<AdminProfile />} />
          
          {/* Rutas de Productos - Más específicas primero */}
          <Route path="/admin/productos/nuevo" element={<AdminProductForm />} />
          <Route path="/admin/productos/editar/:id" element={<AdminProductForm />} />
          <Route path="/admin/productos-criticos" element={<AdminCriticalProducts />} />
          <Route path="/admin/productos/:id" element={<AdminProductDetail />} />
          <Route path="/admin/productos" element={<AdminProducts />} />
          
          {/* Rutas de Usuarios - Más específicas primero */}
          <Route path="/admin/usuarios/nuevo" element={<AdminUserForm />} />
          <Route path="/admin/usuarios/editar/:id" element={<AdminUserForm />} />
          <Route path="/admin/usuarios/:id/historial" element={<AdminPurchaseHistory />} />
          <Route path="/admin/usuarios/:id" element={<AdminUserDetail />} />
          <Route path="/admin/usuarios" element={<AdminUsers />} />
          
          {/* Rutas de Órdenes */}
          <Route path="/admin/ordenes/:id" element={<AdminOrderDetail />} />
          <Route path="/admin/ordenes" element={<AdminOrders />} />
          
          {/* Rutas de Categorías - Más específicas primero */}
          <Route path="/admin/categorias/nuevo" element={<AdminCategoryForm />} />
          <Route path="/admin/categorias/editar/:id" element={<AdminCategoryForm />} />
          <Route path="/admin/categorias" element={<AdminCategories />} />
          
          {/* Reportes */}
          <Route path="/admin/reportes" element={<AdminReports />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
