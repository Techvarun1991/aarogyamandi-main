import React, { useState } from "react";
import Carousel from "../../Layout/Navbar/Carousel";

export default function Main() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    {
      title: "Ayurveda product1",
      description: "Get up to 51% OFF",
      buttonText: "Shop Now",
      terms: "T&C Apply",
    },
    {
      title: "Ayurveda product2",
      description: "Get up to 51% OFF",
      buttonText: "Shop Now",
      terms: "T&C Apply",
    },
    {
      title: "Ayurveda product3",
      description: "Get up to 51% OFF",
      buttonText: "Shop Now",
      terms: "T&C Apply",
    },
    {
      title: "Ayurveda product4",
      description: "Get up to 51% OFF",
      buttonText: "Shop Now",
      terms: "T&C Apply",
    },
    {
      title: "Ayurveda product5",
      description: "Get up to 51% OFF",
      buttonText: "Shop Now",
      terms: "T&C Apply",
    },
    {
      title: "Ayurveda product6",
      description: "Get up to 51% OFF",
      buttonText: "Shop Now",
      terms: "T&C Apply",
    },
  ];
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Carousel />

      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Special Offers</h2>
          <a href="#" className="text-pink-500">
            View All
          </a>
        </div>
        <div className="relative">
          <div className="flex overflow-hidden relative">
            {items.slice(currentIndex, currentIndex + 4).map((item, index) => (
              <div
                key={index}
                className="w-1/4 flex-shrink-0 flex items-center justify-center transition-transform duration-500"
              >
                <div className="bg-white p-6 rounded-lg shadow-lg text-center m-2">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-teal-500 text-lg mb-4">
                    {item.description}
                  </p>
                  <button className="bg-teal-500 text-white px-4 py-2 rounded-full mb-2">
                    {item.buttonText}
                  </button>
                  <small className="text-gray-500">{item.terms}</small>
                </div>
              </div>
            ))}
          </div>
          <button
            className="absolute top-1/2 left-0 ml-2 -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-full focus:outline-none"
            onClick={prevSlide}
          >
            &#9664; {/* Left arrow */}
          </button>
          <button
            className="absolute top-1/2 right-0 mr-2 -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-full focus:outline-none"
            onClick={nextSlide}
          >
            &#9654; {/* Right arrow */}
          </button>
        </div>
      </div>
    </>
  );
}
