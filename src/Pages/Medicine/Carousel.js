import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Product 1',
    imageSrc: 'https://media.sciencephoto.com/image/m6400169/800wm/M6400169.jpg',
    imageAlt: 'Product 1',
  },
  {
    id: 2,
    name: 'Product 2',
    imageSrc: 'https://media.sciencephoto.com/image/m6400169/800wm/M6400169.jpg',
    imageAlt: 'Product 2',
  },
  {
    id: 3,
    name: 'Product 3',
    imageSrc: 'https://media.sciencephoto.com/image/m6400169/800wm/M6400169.jpg',
    imageAlt: 'Product 3',
  },
  {
    id: 4,
    name: 'Product 4',
    imageSrc: 'https://via.placeholder.com/300',
    imageAlt: 'Product 4',
  },
  {
    id: 5,
    name: 'Product 5',
    imageSrc: 'https://via.placeholder.com/300',
    imageAlt: 'Product 5',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <div className="w-full flex">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-500 absolute inset-0`}
            >
              <img src={product.imageSrc} alt={product.imageAlt} className="w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <button
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 py-2 px-4 rounded-l"
          onClick={prevSlide}
        >
          Prev
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <button
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 py-2 px-4 rounded-r"
          onClick={nextSlide}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
