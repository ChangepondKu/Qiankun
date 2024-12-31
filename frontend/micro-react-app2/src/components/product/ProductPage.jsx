import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./ProductPage.css";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../api/apiRepository";
import { DeleteIcon, Edit, Trash } from "lucide-react"
import { dummyProductData } from "../fallbackStore/dummyProductData";
import Cookies from "js-cookie";

export const ProductPage = () => {
  const fileInputRef = useRef(null);
  const state = useSelector((state) => state?.app);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // State for category filter
  const [editableProduct, setEditableProduct] = useState(null); // State for the product to be edited
  const [imageURLInput, setImageURLInput] = useState('');
  const [editedProduct, setEditedProduct] = useState({
    imagePreview: '',
    image_url: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  });
  const [isProductChanged, setIsProductChanged] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [sortOption, setSortOption] = useState(""); // State for sort option
  const [isDummyProduct, setIsDummyProduct] = useState(false);
  const [isProductCreation, setIsProductCreation] = useState(false);
 
  // Handle File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Convert the image file to Base64 format
        const base64Image = event.target.result;

        // Set the image preview in Base64 format
        setEditedProduct({
          ...editedProduct,
          imagePreview: base64Image,
          image_url: base64Image, // Store the Base64 image string to be validated
        });
      };
      reader.readAsDataURL(file);
    }
  };


  // Handle URL Input change
  useEffect(() => {
    if (imageURLInput) {
      setEditedProduct({
        ...editedProduct,
        imagePreview: imageURLInput,
      });
    }
  }, [imageURLInput]);

  // Handle Delete Image
  const handleDeleteImage = () => {
    setEditedProduct({
      ...editedProduct,
      imagePreview: '',
      image_url: '',
    });
    setImageURLInput('');
    // Clear the file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Fetch Products
  const getProductList = async () => {
    const authToken = state?.token;
    // const authToken = Cookies.get('authToken');
    const productList = await getAllProducts(authToken);
    if (productList?.length > 0) {
      setProducts(productList);
    } else {
      //set the product with dummyData
      setProducts(dummyProductData);
      setIsDummyProduct(true);
    }
  };

  useEffect(() => {
    getProductList();
  }, [isProductChanged]);

  const categories = Array.from(new Set(products?.map((product) => product?.category)));

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target?.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target?.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target?.value);
  };

  const filteredProducts = products
    ?.filter((product) =>
      product?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      return 0;
    });

  const handleModifyProduct = (product) => {
    if (product === 'create') {
      const createNew = {
        imagePreview: '',
        image_url: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
      }
      setIsProductCreation(true);
      setEditableProduct(createNew);
      setEditedProduct({ ...createNew }); // Initialize form with product details
      return;
    }
    setEditableProduct(product);
    setEditedProduct({ ...product }); // Initialize form with product details
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const updateProductList = (products, editableProduct, payload) => {
    const updatedProducts = products.map((item) =>
      item.id === editableProduct?.id
        ? { ...item, ...payload } // Update the matching product
        : item // Leave other products unchanged
    );
    return updatedProducts;
  };

  const handleSaveProduct = async () => {
    const authToken = state?.token;
    // const authToken = Cookies.get('authToken');
    if (!editedProduct?.name || !editedProduct?.price) {
      return;
    }
    const payload = {
      name: editedProduct?.name,
      description: editedProduct?.description,
      price: editedProduct?.price,
      stock: editedProduct?.stock,
      category: editedProduct?.category,
      image_url: editedProduct?.image_url || editedProduct?.imagePreview
    };
    if (isProductCreation && !isDummyProduct) {
      const createProductResponse = await createProduct(authToken, payload);
      if (createProductResponse?.id) {
        setIsProductChanged(!isProductChanged);
        setEditableProduct(null); // Close modal
      }
      return;
    }
    if (editableProduct?.id) {
      if (!isDummyProduct) {
        const updateResponse = await updateProduct(authToken, editedProduct?.id, payload);
        if (updateResponse?.id) {
          setIsProductChanged(!isProductChanged);
          setEditableProduct(null); // Close modal
        }
      } else {
        // Usage
        const updatedProducts = updateProductList(products, editableProduct, payload);
        setProducts(updatedProducts);
        setEditableProduct(null); // Close modal
      }

    }
  };

  const handleDelete = async (productId) => {
    const authToken = state?.token; // Retrieve the token from storage
    // const authToken = Cookies.get('authToken');
    try {
      await deleteProduct(productId, authToken);
      setIsProductChanged(!isProductChanged);

    } catch (error) {
      console.error('Failed to delete product:', error.message);
    }
  };

  return (
    <section id="products" className="products-section">
      <div className="container-fluid">
        <div><h2 className="text-start mb-4">Featured products</h2></div>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="ms-auto d-flex align-items-center gap-4">
            {/* Search Section */}
            <div className="d-flex align-items-center">
              <label htmlFor="search-input" className="me-2 flex-shrink-0">
                Search:
              </label>
              <input
                id="search-input"
                type="text"
                className="form-control flex-grow-1"
                placeholder="Search products"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ maxWidth: "200px" }}
              />
            </div>

            {/* Category Filter Section */}
            <div className="d-flex align-items-center">
              <label htmlFor="category-filter" className="me-2 flex-shrink-0">
                Filter by Category:
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="form-select flex-grow-1"
                style={{ maxWidth: "200px" }}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown Section */}
            <div className="d-flex align-items-center">
              <label htmlFor="sort-dropdown" className="me-2 flex-shrink-0">
                Sort by Price:
              </label>
              <select
                id="sort-dropdown"
                value={sortOption}
                onChange={handleSortChange}
                className="form-select flex-grow-1"
                style={{ maxWidth: "200px" }}
              >
                <option value="">None</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>


        </div>
        <div className="mb-3 mt-4">
          <button className="btn btn-dark" onClick={() => handleModifyProduct('create')}>Add Products</button>
        </div>

        {/* Product Display Section */}
        <div className="products-grid">
          {filteredProducts?.length > 0 ?
            filteredProducts?.map((product) => (
              <div key={product?.id} className="product-card">
                <div className="product-img-container">
                  <img
                    src={product?.image_url || product?.imagePreview}
                    alt={product?.name}
                    onError={(e) =>
                    (e.target.src =
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png")
                    }
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product?.name}</h3>
                  <p className="product-description">{product?.description}</p>
                  <p className="product-price">₹{Math.round(product?.price)}</p>
                  <p
                    className={`product-stock ${product?.stock === 0 ? "out-of-stock" : ""
                      }`}
                  >
                    {product.stock > 0
                      ? `In Stock: ${product?.stock}`
                      : "Out of Stock"}
                  </p>
                  <p className="product-category">Category: {product?.category}</p>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-primary mt-auto mx-2"
                      onClick={() => handleModifyProduct(product)}
                    >
                      <Edit />
                    </button>
                    <button className="btn btn-danger mt-auto text-end" onClick={() => handleDelete(product?.id)}>
                      <Trash className="tex-end" />
                    </button>
                  </div>
                </div>
              </div>
            ))
            :
            (<div className="text-center bold"> No Match Found </div>)
          }
        </div>
        {/* Modal for Editing Product */}
        {editableProduct && (
          <div
            className={`modal fade ${editableProduct ? "show d-block" : ""}`}
            tabIndex="-1"
            aria-labelledby="editProductModalLabel"
            aria-hidden={!editableProduct}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                {/* Modal Header */}
                <div className="modal-header text-white" style={{ backgroundColor: '#4A90E2' }}>
                  <h5 className="modal-title" id="editProductModalLabel">
                    Edit Product
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn btn-light"
                    aria-label="Close"
                    onClick={() => setEditableProduct(null)}
                  ></button>
                </div>

                {/* Modal Body */}
                <div className="modal-body">
                  <form>
                    <div className="container">
                      <div className="row">
                        {/* Image Section */}
                        <div className="col-md-6">
                          {/* <p className="fw-bold">Upload or Paste Image URL</p> */}

                          {/* File Upload */}
                          <div className="mb-3">
                            <input
                              type="file"
                              className="form-control"
                              id="image-upload"
                              ref={fileInputRef} // Add a ref to the input field
                              onChange={(e) => {
                                setImageURLInput(""); // Reset URL input
                                handleFileUpload(e);
                              }}
                              disabled={!!imageURLInput}
                            />
                          </div>

                          {/* URL Input */}
                          <div className="mb-3">
                            <p className="fw-bold">Paste URL</p>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Paste Image URL here"
                              value={imageURLInput}
                              onChange={(e) => {
                                setEditedProduct({ ...editedProduct, imagePreview: e.target.value });
                                setImageURLInput(e.target.value);
                              }}
                              disabled={!!editedProduct?.imagePreview}
                            />
                          </div>

                          {/* Preview Section */}
                          {(editedProduct?.imagePreview || editedProduct?.image_url) && (
                            <div className="text-center">
                              <img
                                src={editedProduct.imagePreview || editedProduct.image_url}
                                alt="Preview"
                                className="img-thumbnail"
                                style={{ maxHeight: "250px" }}
                              />
                              <div className="mt-2">
                                <button
                                  type="button"
                                  className="btn btn-danger d-flex align-items-center gap-2"
                                  onClick={handleDeleteImage}
                                  style={{ cursor: "pointer" }}
                                >
                                  <Trash className="lucide lucide-trash" />
                                  {editedProduct?.imagePreview && <span>Delete Image</span>}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Product Info Section */}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="name" className="fw-medium form-label">
                              Product Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              value={editedProduct.name}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="description" className="fw-bold form-label">
                              Description
                            </label>
                            <textarea
                              className="form-control"
                              id="description"
                              name="description"
                              value={editedProduct.description}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="price" className="fw-bold form-label">
                              Price (₹)
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="price"
                              name="price"
                              value={editedProduct.price}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="stock" className="fw-bold form-label">
                              Stock
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="stock"
                              name="stock"
                              value={editedProduct.stock}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="category" className="fw-bold form-label">
                              Category
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="category"
                              name="category"
                              value={editedProduct.category}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditableProduct(null)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSaveProduct}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}



      </div>
    </section>
  );
};
