// src/AllProductsPage.js
import React, { useEffect, useState } from 'react';
import Halfpricestore from '../Medicine/Halfpricestore';

const AllProducts = () => {
    const products = [
        // Sample product data
        { id: 1, name: 'TRESemme Anti-Dandruff Shampoo Anti-Hair fall 72 ml', price: '75.76', discount: '10% Off', imageSrc: 'https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png', label: 'New', market: 'Procter & Gamble', bestPrice: '$9', mrp: 'Rs 80' },
        { id: 2, name: 'TRESemme Anti-Dandruff Shampoo Anti-Hair fall 72 ml', price: '75.76', discount: '15% Off', imageSrc: 'https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png', label: 'Sale', market: 'Procter & Gamble', bestPrice: '$18', mrp: 'Rs 80' },
        { id: 3, name: 'Product 3', price: '75.76', discount: '20% Off', imageSrc: 'https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png', label: 'Discount', market: 'Procter & Gamble', bestPrice: '$25', mrp: 'Rs 80' },
        { id: 4, name: 'Product 4', price: '75.76', discount: '25% Off', imageSrc: 'https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png', label: 'Limited', market: 'Procter & Gamble', bestPrice: '$35', mrp: 'Rs 80' },
        { id: 5, name: 'Product 5', price: '75.76', discount: '30% Off', imageSrc: 'https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png', label: 'Offer', market: 'Procter & Gamble', bestPrice: '$40', mrp: 'Rs 80' },
        { id: 6, name: 'Product 6', price: '75.76', discount: '35% Off', imageSrc: 'https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png', label: 'Clearance', market: 'Procter & Gamble', bestPrice: '$50', mrp: 'Rs 80' },
        // Add more products as needed
      ];
    
      const [startIndex, setStartIndex] = useState(0);
      const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
      const handlePrev = () => {
        setStartIndex(startIndex - (windowWidth < 768 ? 1 : 3));
      };
    
      const handleNext = () => {
        setStartIndex(startIndex + (windowWidth < 768 ? 1 : 3));
      };
    
      useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

      const handleClick = () => {
        console.log('hi');
      };
    

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 p-4">
          <h2 className="text-lg mb-4 text-left mx-4">Filters</h2>
          <div className="text-lg mb-4 text-left mx-4">
          <h3 className="mb-2">Category</h3>
            <div className="flex items-center mb-2" onClick={handleClick}>
              <input type="checkbox" id="shampoo" className="mr-2" />
              <label htmlFor="shampoo" className="text-sm">Shampoo</label>
            </div>
            <div className="flex items-center mb-2" onClick={handleClick}>
              <input type="checkbox" id="soap" className="mr-2" />
              <label htmlFor="soap" className="text-sm">Soap</label>
            </div>
            <div className="flex items-center mb-2" onClick={handleClick}>
              <input type="checkbox" id="hair-care" className="mr-2" />
              <label htmlFor="hair-care" className="text-sm">Hair Care</label>
            </div>
          </div>
          <div className="text-lg text-left mx-4 my-8">
          <h3 className="mb-2">Price</h3>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="shampoo" className="mr-2" />
              <label htmlFor="shampoo" className="text-sm">50-100</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="soap" className="mr-2" />
              <label htmlFor="soap" className="text-sm">150-200</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="hair-care" className="mr-2" />
              <label htmlFor="hair-care" className="text-sm">250-350</label>
            </div>
          </div>
          <div className="text-lg text-left mx-4 my-8">
          <h3 className="mb-2">Discount</h3>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="shampoo" className="mr-2" />
              <label htmlFor="shampoo" className="text-sm">10% Off</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="soap" className="mr-2" />
              <label htmlFor="soap" className="text-sm">50% Off</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="hair-care" className="mr-2" />
              <label htmlFor="hair-care" className="text-sm">70% Off</label>
            </div>
          </div>
        </div>
        {/* Products Grid */}
        <div className="w-3/4 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className="bg-white p-4 ">
                <div className="bg-white p-4 shadow relative ">
                  <img
                    className="w-3/4 h-full mx-auto mt-10"
                    src={product.imageSrc}
                    alt={product.name}
                  />
                  <span className="absolute top-2 sm:top-3 right-3 bg-sky-400 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-md">
                    {product.discount}
                  </span>
                  <div className="py-4 min-h-44">
                    <div className="font-bold text-sm mb-2 text-left min-h-12">
                      {product.name}
                    </div>
                    <p className="text-sm text-gray-400 text-left">
                    Mkt: {product.market}
                    </p>
                    <p className="text-sm text-gray-400 text-left">
                      Best Price: {""}
                      <span className="text-blue-500">₹ {product.price}</span>
                    </p>
                    <p className="text-sm text-gray-400 text-left">
                      MRP: <span className="line-through">{product.mrp}</span>
                    </p>
                    <button className="font-bold text-sky-400 w-full mt-2">
                      ADD TO CART
                    </button>
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

export default AllProducts;
