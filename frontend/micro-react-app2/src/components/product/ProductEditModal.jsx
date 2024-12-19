import React, { useState } from "react";

export const ProductEditModal = ({ product, onSave, onClose }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProduct((prev) => ({ ...prev, image_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save updated product
  const handleSave = () => {
    onSave(editedProduct);
  };

  return (
    <div
      className="modal fade"
      id="editProductModal"
      tabIndex="-1"
      aria-labelledby="editProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editProductModalLabel">
              Edit Product
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={editedProduct.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={editedProduct.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="stock" className="form-label">
                  Stock
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="stock"
                  name="stock"
                  value={editedProduct.stock}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={editedProduct.category}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  onChange={handleImageChange}
                />
                {editedProduct.image_url && (
                  <img
                    src={editedProduct.image_url}
                    alt="Preview"
                    className="img-fluid mt-2"
                    style={{ maxHeight: "100px", borderRadius: "4px" }}
                  />
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
