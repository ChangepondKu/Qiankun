import React, { useState, useEffect, useCallback } from 'react';
import { productAPI } from '../websocket/api';
import { useWebSocket } from '../websocket/useWebSocket';

export function ProductList() {
  const [products, setProducts] = useState([]);

  // Load initial products
  useEffect(() => {
    productAPI.getAll()
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error loading products:', error));
  }, []);

  
  const handleWebSocketMessage = useCallback((update) => {
    console.log('WebSocket update received:', update); // Debug log
    switch (update.type) {
      case 'product_created':
        setProducts(prev => [...prev, update.data]);
        break;
      case 'product_updated':
        setProducts(prev =>
          prev.map(p => (p.id === update.data.id ? update.data : p))
        );
        break;
      case 'product_deleted':
        setProducts(prev => prev.filter(p => p.id !== update.data.id));
        break;
      default:
        break;
    }
  }, []);
  

  // Initialize WebSocket connection
  useWebSocket(handleWebSocketMessage);

  // Product operations
  const handleCreate = async (productData) => {
    try {
      await productAPI.create(productData);
      // No need to update state - WebSocket will handle it
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleUpdate = async (id, productData) => {
    try {
      await productAPI.update(id, productData);
      // No need to update state - WebSocket will handle it
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await productAPI.delete(id);
      // No need to update state - WebSocket will handle it
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} style={{height:'200px',width:'100%'}}/>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <div className="actions">
              <button onClick={() => handleUpdate(product.id, {
                ...product,
                stock: product.stock - 1
              })}>
                Update Stock
              </button>
              <button onClick={() => handleDelete(product.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}