import React, { useState } from 'react';
import Carousel from './Carousel';
import MedicineBanner from "./MedicineByCategory"
import OfferCard from "./OfferCard"
const products = [
  {
    id: 1,
    name: 'Paracetamoldmfewdsjibhwkjsjws',
    href: '/Medicine/Cart',
    imageSrc: 'https://images.apollo247.in/pub/media/catalog/product/3/_/3_7_3.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '350Rs',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Paracetamol',
    href: '/Medicine/Cart',
    imageSrc: 'https://img.freepik.com/free-photo/medical-treatment_23-2148108928.jpg?t=st=1713417269~exp=1713420869~hmac=9bf752ac200761ef717c6d7ce9f51f9f96a4bbc86c52b2adc522a1179cfa1b9d&w=1380',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '350Rs',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Paracetamol',
    href: '/Medicine/Cart',
    imageSrc: 'https://m.media-amazon.com/images/I/71Gy7z9J0AL._AC_UF1000,1000_QL80_.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '350Rs',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Paracetamol',
    href: '/Medicine/Cart',
    imageSrc: 'https://d2j6dbq0eux0bg.cloudfront.net/images/22962135/3634764310.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '350Rs',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Paracetamol',
    href: '/Medicine/Overview',
    imageSrc: 'https://m.media-amazon.com/images/I/71t9JRry+3L.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '350Rs',
    color: 'Black',
    
  },
  {
    id: 1,
    name: 'Paracetamol',
    href: '/Medicine',
    imageSrc: 'https://m.media-amazon.com/images/I/71Gy7z9J0AL._AC_UF1000,1000_QL80_.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '350Rs',
    color: 'Black',
  },
  
];

const MedicineCards = () => {
    const [quantities, setQuantities] = useState({});
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const handleQuantityChange = (productId, quantity) => {
      setQuantities({ ...quantities, [productId]: quantity });
    };
  
    const handleIncrement = (productId) => {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: (prevQuantities[productId] || 0) + 1,
      }));
    };
  
    const handleDecrement = (productId) => {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0),
      }));
    };
  
    const handleAddToCart = (productId) => {
      console.log(`Adding product ${productId} to cart with quantity ${quantities[productId]}`);
    };
  
    const handlePrevSlide = () => {
      setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
    };
  
    const handleNextSlide = () => {
      setCurrentSlide((prevSlide) => Math.min(prevSlide + 1, Math.ceil(products.length / 5) - 1));
    };

  
    const isPrevButtonDisabled = currentSlide === 0;
    const isNextButtonDisabled = currentSlide === Math.ceil(products.length / 5) - 1;
  
    return (
      <div className="bg-white relative">
      <Carousel/>

        <div className="absolute inset-y-1/2 left-0 flex items-center justify-center transform -translate-y-1/2">
          <button
            className={`px-4 py-2 text-black rounded-full ${
              isPrevButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handlePrevSlide}
            disabled={isPrevButtonDisabled}
          >
            {'<'}
          </button>
        </div>
        <div className="absolute inset-y-1/2 right-0 flex items-center justify-center transform -translate-y-1/2">
          <button
            className={`px-4 py-2 text-black rounded-full ${
              isNextButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleNextSlide}
            disabled={isNextButtonDisabled}
          >
            
            {'>'}
          </button>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Medicine Lists</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {products.slice(currentSlide * 5, (currentSlide + 1) * 5).map((product) => (
              <div key={product.id} className="flex flex-col items-center mb-8">
                <a href={product.href}>
                  <img
                    src={product.imageSrc} 
                    alt={product.imageAlt}
                    className="h-32 w-32 object-cover object-center mb-4"
                  />
                </a>
                <h3 className="text-sm text-gray-700 truncate w-20 text-center mb-2">
                  <a href={product.href}>{product.name}</a>
                </h3>
                <div className="flex items-center mb-2">
                  <button
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md"
                    onClick={() => handleDecrement(product.id)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    className="w-10 text-sm text-center border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md mx-2"
                    value={quantities[product.id] || 0}
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                  />
                  <button
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md"
                    onClick={() => handleIncrement(product.id)}
                  >
                    +
                  </button>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-2">{product.price}</p>
                <a href={product.href}>
                  <button
                    className="px-4 py-2 bg-teal-300 text-grey rounded-md"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
        <MedicineBanner/>
        <div className="mx-auto max-w-7xl  ">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Offers</h2>
        </div>
        <OfferCard/>
      </div>
      );
    };
    
    export default MedicineCards;