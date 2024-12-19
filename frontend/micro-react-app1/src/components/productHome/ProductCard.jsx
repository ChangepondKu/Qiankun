import React from 'react';

export const ProductCard = ({ product }) => {
  return (
    <div className="card h-100 shadow-sm">
      {product.image_url ? (
        <img src={product.image_url} className="card-img-top" alt={product.name} />
      ) : (
        <div className="bg-light d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <span className="text-muted">No Image Available</span>
        </div>
      )}
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-primary fw-bold">₹{product.price}</span>
          <span
            className={`badge ${
              parseInt(product.stock) > 10 ? 'bg-success' : 'bg-danger'
            }`}
          >
            Stock: {product.stock}
          </span>
        </div>
      </div>
    </div>
  );
};
