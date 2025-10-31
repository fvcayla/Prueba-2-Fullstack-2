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
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts/AdminProducts';
import AdminUsers from './pages/Admin/AdminUsers/AdminUsers';
import AdminProductForm from './pages/Admin/AdminProductForm/AdminProductForm';
import AdminUserForm from './pages/Admin/AdminUserForm/AdminUserForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/productos" element={<AdminProducts />} />
          <Route path="/admin/usuarios" element={<AdminUsers />} />
          <Route path="/admin/productos/nuevo" element={<AdminProductForm />} />
          <Route path="/admin/productos/editar/:id" element={<AdminProductForm />} />
          <Route path="/admin/usuarios/nuevo" element={<AdminUserForm />} />
          <Route path="/admin/usuarios/editar/:id" element={<AdminUserForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
