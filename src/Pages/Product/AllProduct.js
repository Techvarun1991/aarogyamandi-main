// src/AllProductsPage.js
import React, { useEffect, useState } from 'react';
import Halfpricestore from '../Medicine/Halfpricestore';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductService from '../../Service/PharmcyService/ProductService';

const AllProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = localStorage.getItem("itemId"); // Default to an empty object if state is undefined
  console.log(item, "------------item ---------------")
  const [product, setProduct] = useState([]);


  useEffect(() => {
    ProductService.getProductById(item).then((response) => {
      console.log(response.data, '-------------response product ---------------');
      setProduct(response.data.pharmacyMedicineStock);
    }).catch((error) => {
      console.log(error);
    })

  }, [item]);


  useEffect(() => {
    const handleResize = () => {
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddCart = (event) => {
    event.stopPropagation()
    console.log('handleAddCart---------------');
  }

  const handleProductDetails = (medicineId, event) => {
    console.log('handleProductDetails---------------', medicineId);
    localStorage.setItem("ItemdetailsId", medicineId);
    navigate("/product-details")
  }




  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 p-4">
          <h2 className="text-2xl font-bold mb-4 text-left mx-4">Filters</h2>

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
            {product.map(product => (
              <div key={product.medicine.medicineName} className="bg-white p-4" onClick={(e) => {
                e.stopPropagation(); // Prevents event from bubbling up if necessary
                handleProductDetails(product.medicineId); // Ensures it's called only once
              }}>                <div className="bg-white p-4 shadow relative">
                  <img
                    className="w-3/4 h-full mx-auto mt-10"
                    src="https://s3-alpha-sig.figma.com/img/7264/6296/2fab4e2540ff263ac1bfbc5d62b886b1?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y34ND4NMfhV~Tp40lKOQk467qoEwMFTWxKvSBgRSz0SCnWs1ZrfUXmhRcKZbNMVHn6DM4-ty0lholvYZKXYBvx9tIxAAH6cNx0BJxXWYLFToY-cRXNRXCc-fNlZ4yS8CKFHk0N6RCw~7he1gyCL6SfHJxZIUdhzyKuhteuPKEr7YQpuMdt4IBLJdzALZBQmKyvZCF3L1vY7Erz7RbmuLnX56davUIEWTakHmdCKGiW6qnT7QGTxqoA6iBsEX7Etgx8QN0YfE7eu7QssPXYFqs1aaBueXq0EZXdfIgntN4TOut3fjF9fNAZ3mHdiNqpUYghPaqHtr1uCisrXXQaalnQ__"
                    alt={product.name}
                  />
                  <span className="absolute top-2 sm:top-3 right-3 bg-sky-400 text-black px-1 sm:px-2 py-0.5 sm:py-1 rounded-md">
                    {"40% OFF"}
                  </span>
                  <div className="py-4 min-h-44">
                    {/* Product name */}
                    <div className="font-bold text-lg text-left min-h-12">
                      {product.medicine.medicineName}
                    </div>
                    {/* Chip */}
                    <div className="rounded-md bg-slate-400 py-0.5 px-1.5 w-1/2 text-xs text-white justify-center transition-all shadow-sm text-left mb-1">
                      {product.medicine.category.categoryName}
                    </div>
                    <p className="text-sm text-left">
                      <span className="text-black">Mfr:</span>
                      <span className="text-gray-500"> {product.medicine.manufacturer}</span>
                    </p>
                    <p className="text-sm text-left">
                      Best Price:
                      <span className="text-black">₹</span>
                      <span className="text-pink-500"> {product?.sellingPrice}</span>
                    </p>

                    <p className="text-sm text-left">
                      MRP:
                      <span className="text-black">₹</span>
                      <span className="text-gray-500 line-through"> {product?.originalPrice}</span>
                    </p>



                    <button className="font-bold text-sky-400 w-full mt-2 " onClick={handleAddCart}>
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
