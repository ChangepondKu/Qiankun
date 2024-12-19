import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const StockChart = ({ products }) => {
  const data = products.map(product => ({
    name: product.name,
    stock: parseInt(product.stock),
  }));

  return (
    <div className="card shadow-sm p-3">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          {/* Customizing Y-axis labels */}
          <YAxis tickFormatter={(value) => `${value}`} />
          <Tooltip />
          <Bar dataKey="stock" fill="#0d6efd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
