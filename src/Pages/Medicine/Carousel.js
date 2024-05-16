import React, { useState, useEffect } from "react";

const App = () => {
  const images = [
    "https://www.thecable.ng/wp-content/uploads/2015/01/pharmacy.jpg",
    "https://www.thecable.ng/wp-content/uploads/2015/01/pharmacy.jpg",
    "https://www.thecable.ng/wp-content/uploads/2015/01/pharmacy.jpg",
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
    <div className="container mx-auto mt-8">
      <div className="relative">
        <div className="overflow-hidden relative w-full h-48 md:h-36 lg:h-48">
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
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
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
    </div>
  );
};

export default App;
