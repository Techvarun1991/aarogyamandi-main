import React, { useState } from 'react';


const products = [
  {
    id: 1,
    name: 'Paracetamol',
    imageSrc: 'https://images.apollo247.in/pub/media/catalog/product/3/_/3_7_3.png',
    imageAlt: "Paracetamol",
  },
  {
    id: 2,
    name: 'Ibuprofen',
    imageSrc: 'https://img.freepik.com/free-photo/medical-treatment_23-2148108928.jpg?t=st=1713417269~exp=1713420869~hmac=9bf752ac200761ef717c6d7ce9f51f9f96a4bbc86c52b2adc522a1179cfa1b9d&w=1380',
    imageAlt: "Ibuprofen",
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
  {
    id: 1,
    name: 'Paracetamol',
    imageSrc: 'https://images.apollo247.in/pub/media/catalog/product/3/_/3_7_3.png',
    imageAlt: "Paracetamol",
  },
  {
    id: 2,
    name: 'Ibuprofen',
    imageSrc: 'https://img.freepik.com/free-photo/medical-treatment_23-2148108928.jpg?t=st=1713417269~exp=1713420869~hmac=9bf752ac200761ef717c6d7ce9f51f9f96a4bbc86c52b2adc522a1179cfa1b9d&w=1380',
    imageAlt: "Ibuprofen",
  },
  // Add more products as needed
];

const MedicineCards = () => {
  const [quantities, setQuantities] = useState({});

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

  return (
    
    <div className="bg-white relative  ">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Medicine By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center">
              <img
                src={product.imageSrc} 
                alt={product.imageAlt}
                className="h-32 w-32 object-cover object-center mb-2"
              />
              <h3 className="text-sm text-gray-700 truncate w-32 text-center mt-0 mb-2">{product.name}</h3>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
  
export default MedicineCards;