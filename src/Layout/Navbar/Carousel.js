import React, { useState, useEffect } from "react";
import Carousel1 from '../../Images/carousel1.png';

const Carousel = () => {
  const images = [
    Carousel1,
    "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/full-width-1.48172107.png",
    "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/full-width-3.8c8ab982.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000); // Change slide every 3 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]); // Restart the timer whenever currentIndex changes

  return (
    <div className="container mx-auto py-2">
    <div className="relative">
      <div className="overflow-hidden relative w-full md:h-36 lg:h-72">
        <div className="flex">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-full flex-shrink-0 flex items-center justify-center ${
                index === currentIndex ? "block" : "hidden"
              }`}
            >
              <img
                src={image}
                alt={`Slide ${index}`}
                className="object-cover rounded-lg shadow-lg"
                // style={{ height: "250px",width:'100%' }}
              />
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-0 ml-2 -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-full focus:outline-none"
          onClick={prevSlide}
        >
          &#9664; 
        </button>
        <button
          className="absolute top-1/2 right-0 mr-2 -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-full focus:outline-none"
          onClick={nextSlide}
        >
          &#9654; 
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default Carousel;
