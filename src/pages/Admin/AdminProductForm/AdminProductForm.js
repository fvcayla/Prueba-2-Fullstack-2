import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { productService } from '../../../data/database';
import './AdminProductForm.css';

const AdminProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
    stock: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Verificar si el usuario está logueado y es admin
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    // Si es edición, cargar el producto
    if (isEdit) {
      const product = productService.getById(id);
      if (product) {
        setFormData({
          name: product.name,
          price: product.price.toString(),
          image: product.image,
          description: product.description,
          category: product.category,
          stock: product.stock.toString()
        });
      } else {
        navigate('/admin/productos');
      }
    }
  }, [id, isEdit, navigate]);

  const categories = ['Computadoras', 'Audio', 'Móviles', 'Wearables', 'Monitores', 'Periféricos', 'Video'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.name || !formData.price || !formData.category) {
      setError('Por favor, completa todos los campos requeridos.');
      return;
    }

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image || 'https://via.placeholder.com/250x200/95a5a6/ffffff?text=Producto',
      description: formData.description,
      category: formData.category,
      stock: parseInt(formData.stock) || 0
    };

    try {
      if (isEdit) {
        productService.update(id, productData);
        alert('Producto actualizado exitosamente');
      } else {
        productService.create(productData);
        alert('Producto creado exitosamente');
      }
      navigate('/admin/productos');
    } catch (error) {
      setError('Error al guardar el producto. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="admin-product-form">
      <section className="py-4 bg-light">
        <div className="container">
          <h1 className="display-5">
            {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
          </h1>
        </div>
      </section>

      <section className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="product-form">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="price" className="form-label">Precio *</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Categoría *</label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione una categoría</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">URL de Imagen</label>
                  <input
                    type="url"
                    className="form-control"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    {isEdit ? 'Actualizar' : 'Crear'} Producto
                  </button>
                  <Link to="/admin/productos" className="btn btn-outline-secondary">
                    Cancelar
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminProductForm;
