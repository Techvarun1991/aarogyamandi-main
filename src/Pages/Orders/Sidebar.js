import React, { useState } from 'react';

const Sidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="w-1/4 p-4">
      <h2 className="text-lg mb-4 text-left mx-4">My Orders</h2>
      <div className="text-md mb-4 text-left mx-4">
        <h3 className="mb-2">Categories</h3>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="orders"
            name="orderCategory"
            value="Orders"
            checked={selectedCategory === 'Orders'}
            onChange={handleChange}
            className="mr-2"
          />
          <label
            htmlFor="orders"
            className={`text-sm ${selectedCategory === 'Orders' ? 'text-cyan-400' : ''}`}
          >
            Orders
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="notYetShipped"
            name="orderCategory"
            value="Not yet Shipped"
            checked={selectedCategory === 'Not yet Shipped'}
            onChange={handleChange}
            className="mr-2"
          />
          <label
            htmlFor="notYetShipped"
            className={`text-sm ${selectedCategory === 'Not yet Shipped' ? 'text-cyan-400' : ''}`}
          >
            Not yet Shipped
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="cancelledOrders"
            name="orderCategory"
            value="Cancelled Orders"
            checked={selectedCategory === 'Cancelled Orders'}
            onChange={handleChange}
            className="mr-2"
          />
          <label
            htmlFor="cancelledOrders"
            className={`text-sm ${selectedCategory === 'Cancelled Orders' ? 'text-cyan-400' : ''}`}
          >
            Cancelled Orders
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="delivered"
            name="orderCategory"
            value="Delivered"
            checked={selectedCategory === 'Delivered'}
            onChange={handleChange}
            className="mr-2"
          />
          <label
            htmlFor="delivered"
            className={`text-sm ${selectedCategory === 'Delivered' ? 'text-cyan-400' : ''}`}
          >
            Delivered
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
