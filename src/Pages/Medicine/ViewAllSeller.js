import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewAllSellers = () => {
  // Dummy data for sellers
  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: "Saridon",
      image: "https://multimedicos.in/media/catalog/product/cache/67b225953a43d703d27714231d68a9fa/s/a/saridon_headache_relief_tablet_10_s.png",
      price: "18 Rs",
      pharmacyName: "Pharmacy A",
      address: "123 Main St, City",
      quantity: 0
    },
    {
      id: 2,
      name: "Saridon ",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk_PiSf-X_ugKigVCic5uGZvooaKjwohoMqCzWnspHTg&s",
      price: "20 Rs",
      pharmacyName: "Pharmacy B",
      address: "456 Elm St, City",
      quantity: 0
    },
    // Add more seller data as needed
  ]);

  const navigate = useNavigate();

  const handleAddToBag = (sellerId) => {
    // Handle adding seller to bag here
    console.log(`Added seller with ID ${sellerId} to bag with quantity ${sellers.find(seller => seller.id === sellerId).quantity}.`);
  };

  const handleIncrementQuantity = (sellerId) => {
    setSellers(prevSellers =>
      prevSellers.map(seller =>
        seller.id === sellerId ? { ...seller, quantity: seller.quantity + 1 } : seller
      )
    );
  };

  const handleDecrementQuantity = (sellerId) => {
    setSellers(prevSellers =>
      prevSellers.map(seller =>
        seller.id === sellerId && seller.quantity > 0 ? { ...seller, quantity: seller.quantity - 1 } : seller
      )
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto py-8">
     <div className="flex items-center mb-4">
        <button onClick={goBack} className="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">View All Sellers</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sellers.map((seller) => (
          <div key={seller.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={seller.image} alt={seller.name} className="w-full h-64 object-cover object-center" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{seller.name}</h2>
              <p className="text-gray-700 text-base mb-2">Price: {seller.price}</p>
              <p className="text-gray-700 text-base mb-2">Pharmacy: {seller.pharmacyName}</p>
              <p className="text-gray-700 text-base mb-2">Address: {seller.address}</p>
              <div className="flex items-center space-x-4">
                <button onClick={() => handleDecrementQuantity(seller.id)} className="text-gray-600 bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 focus:outline-none">-</button>
                <span className="text-xl font-semibold">{seller.quantity}</span>
                <button onClick={() => handleIncrementQuantity(seller.id)} className="text-gray-600 bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 focus:outline-none">+</button>
                <button onClick={() => handleAddToBag(seller.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllSellers;
