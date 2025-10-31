import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../../data/database';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const allPosts = blogService.getAll();
    setPosts(allPosts);
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="blog-page">
      <section className="page-title bg-light py-4 mb-4">
        <div className="container">
          <h1 className="display-5">Blog</h1>
        </div>
      </section>

      <section className="blog-list py-4">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">🔍</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar en el blog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="row g-4">
              {filteredPosts.map(post => (
                <div key={post.id} className="col-md-6 col-lg-4">
                  <div className="card h-100 blog-post-card">
                    <Link to={`/blog/${post.id}`} className="text-decoration-none">
                      <img 
                        src={post.image} 
                        className="card-img-top" 
                        alt={post.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    </Link>
                    <div className="card-body">
                      <Link to={`/blog/${post.id}`} className="text-decoration-none text-dark">
                        <h5 className="card-title">{post.title}</h5>
                      </Link>
                      <p className="card-text text-muted">
                        {post.text.substring(0, 150)}...
                      </p>
                      <Link to={`/blog/${post.id}`} className="btn btn-outline-primary">
                        Leer más
                      </Link>
                    </div>
                    <div className="card-footer text-muted">
                      <small>Por {post.author}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info text-center">
              <p className="mb-0">No se encontraron posts que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
