import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, LineChart, Line } from "recharts";
import "./Dashboard.css"; // Custom responsive styles
import { ProductCard } from "./ProductCard";
import { IndianRupee, Package, ShoppingCart } from "lucide-react";

export const Dashboard = ({ products }) => {
  const totalProducts = products?.length;
  const totalStock = products?.reduce((acc, product) => acc + parseInt(product?.stock), 0);
  const totalValue = products?.reduce((acc, product) => acc + parseFloat(product?.price) * parseInt(product?.stock), 0);

  const categoryData = products?.reduce((acc, product) => {
    const category = product?.category;
    const value = parseFloat(product?.price) * parseInt(product?.stock);
    if (acc[category]) {
      acc[category] += value;
    } else {
      acc[category] = value;
    }
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryData).map(([category, value]) => ({
    name: category,
    value: parseFloat(value?.toFixed(2)),
  }));

  const COLORS = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff8042",
    "#8dd1e1", "#a4de6c", "#d0ed57", "#f15b5b",
    "#8e7cc3", "#2ca02c", "#ffbb28", "#1f77b4",
    "#ff7f0e", "#9467bd", "#e377c2", "#7f7f7f",
    "#bcbd22", "#17becf", "#ff4444", "#ffa07a",
    "#32cd32", "#87ceeb", "#4682b4", "#da70d6",
    "#40e0d0", "#ee82ee", "#fa8072", "#ffd700", "#6b8e23", "#8b0000",
  ];

  const renderCustomLegend = (props) => {
    const { payload } = props;

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, max-content)",
          gap: "10px",
          alignItems: "center",
        }}
      >
        {payload?.map((entry, index) => (
          <div
            key={`item-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              color: entry?.color || COLORS[index % COLORS.length],
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                marginRight: "8px",
                backgroundColor: entry?.color || COLORS[index % COLORS.length],
                borderRadius: "50%",
              }}
            />
            {entry?.value}
          </div>
        ))}
      </div>
    );
  };


  // Get the 8 most recently updated products
  const recentlyUpdatedProducts = products
    ?.slice()
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 8);

  // Get the 8 latest created products
  const recentlyCreatedProducts = products
    ?.slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 8);

  const stockData = products?.reduce((acc, product) => {
    const category = product?.category;
    const stock = parseInt(product?.stock);
    if (acc[category]) {
      acc[category] += stock;
    } else {
      acc[category] = stock;
    }
    return acc;
  }, {});

  // Prepare Bar Chart Data
  const barChartData = Object?.entries(stockData).map(([category, stock]) => ({
    name: category,
    stock,
  }));

  // Data for Line Chart (Example: Month-wise data)
  // const lineChartData = products
  //   ?.map((product, index) => ({
  //     month: `Month ${index + 1}`,
  //     total: index + 1, // Mocked: Use your actual data if available
  //   }))
  //   ?.slice(0, 12); // Limit to 12 points for simplicity

  return (
    <div className="container-fluid bg-light dashboard">
      {/* Title Section */}
      <header className="text-start mb-1">
        <h1 className="dashboard-title" style={{ color: "#4a4a4a", fontWeight: "400" }}>
          DASHBOARD
        </h1>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="row">
          {/* Main Section */}
          <div className="col-lg-9 col-12">
            {/* Stat Cards */}
            <div className="stat-cards">
              <div className="stat-card">
                <div className="stat-card-icon">
                  <Package color="blue" />
                </div>
                <div className="stat-card-text">
                  <h5>Total Products</h5>
                  <p>{totalProducts}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon">
                  <ShoppingCart color="green" />
                </div>
                <div className="stat-card-text">
                  <h5>Total Stock</h5>
                  <p>{totalStock}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon">
                  <IndianRupee color="violet" />
                </div>
                <div className="stat-card-text">
                  <h5>Total Value</h5>
                  <p>₹{Math.round(totalValue)}</p>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            {/* Stock by Category (Bar Chart) */}
            <div className="row chart-card mt-4">
              <h4 style={{ color: "#2c3e50" }}>Stock by Category</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="stock" fill="#82ca9d">
                    {barChartData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Panel */}
          <div className="col-lg-3 col-12">
            <div className="summary-panel">
              <h5 style={{ color: "#2c3e50" }}>Top Categories</h5>
              <ul>
                {pieChartData.map((category, index) => (
                  <li key={index} style={{ color: "#34495e", fontWeight: "500" }}>
                    {category?.name}: ₹{category?.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="row mt-4">
            {/* Pie Chart */}
            <div className="col-lg-12 col-12 mb-4">
              <div className="chart-card">
                <h4>Category-wise Total Value</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={pieChartData} dataKey="value" nameKey="name" outerRadius={100}>
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}
                        style={{
                          cursor: "pointer", // Change cursor on hover
                          filter: index ? "brightness(1.2)" : "none", // Slight brightness effect
                        }}
                        />
                      ))}
                    </Pie>
                    <Tooltip/>
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Line Chart */}
            {/* <div className="col-lg-6 col-12 mb-4">
              <div className="chart-card">
                <h4>Total Products Over Time</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div> */}
          </div>


          {/* Random Products Row */}
          <div className="row mt-5">
            <h4
              style={{
                color: "#4a4a4a",
                fontWeight: "600",
                marginBottom: "20px",
                textAlign: "center", // Center align heading
              }}
            >
              Our Latest Products
            </h4>
            {recentlyUpdatedProducts?.map((product, index) => (
              <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                <div
                  className="card h-100 product-card"
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Image Section */}
                  <img
                    src={product?.image_url}
                    alt={product?.name}
                    className="card-img-top"
                    style={{
                      height: "180px",
                      objectFit: "contain",
                      background: "#f9f9f9", // Subtle background for better contrast
                    }}
                  />
                  {/* Card Body */}
                  <div className="card-body text-center">
                    <h6 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>
                      {product?.name}
                    </h6>
                    <p style={{ color: "#27ae60", fontSize: "14px", fontWeight: "500", marginBottom: "12px" }}>
                      ₹{product?.price}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: product?.stock > 0 ? "#27ae60" : "#e74c3c", // Green for in-stock, red for out-of-stock
                      }}
                    >
                      {product?.stock > 0 ? `In Stock : ${product?.stock}` : "Out of Stock"}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>

  );
};
