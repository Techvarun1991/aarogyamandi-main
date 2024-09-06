import React, { useState } from "react";

const BrowsingHistory = () => {
  const cards = [
    {
      id: 1,
      imageSrc:
        "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png",
      label: "40% OFF",
      title: "The Coldest Sunset",
      market: "Mkt: Inlife Pharma Private Limited",
      bestPrice: "Rs. 400",
      mrp: "Rs. 499.00",
    },
    {
      id: 2,
      imageSrc:
        "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png",
      label: "40% OFF",
      title: "The Coldest Sunset",
      market: "Mkt: Inlife Pharma Private Limited",
      bestPrice: "Rs. 400",
      mrp: "Rs. 499.00",
    },
    {
      id: 3,
      imageSrc:
        "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png",
      label: "40% OFF",
      title: "The Coldest Sunset",
      market: "Mkt: Inlife Pharma Private Limited",
      bestPrice: "Rs. 400",
      mrp: "Rs. 499.00",
    },
    {
      id: 4,
      imageSrc:
        "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png",
      label: "40% OFF",
      title: "The Coldest Sunset",
      market: "Mkt: Inlife Pharma Private Limited",
      bestPrice: "Rs. 400",
      mrp: "Rs. 499.00",
    },
    {
      id: 5,
      imageSrc:
        "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png",
      label: "40% OFF",
      title: "The Coldest Sunset",
      market: "Mkt: Inlife Pharma Private Limited",
      bestPrice: "Rs. 400",
      mrp: "Rs. 499.00",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex(startIndex + 4);
  };

  const handlePrev = () => {
    setStartIndex(startIndex - 4);
  };

  return (
<div className="relative w-[90%] mx-auto my-6 sm:my-10">
  {/* Sky color overlay */}
  <div className="absolute top-0 left-0 w-full h-[30%] sm:h-[40%] bg-sky-200">
    <p className="text-slate-50 text-left mx-4 sm:mx-10 mt-4 sm:mt-7 font-bold text-xl sm:text-2xl">Similar Product</p>
  </div>
  {/* Gray color overlay */}
  <div className="absolute bottom-6 sm:bottom-10 left-0 w-full h-[70%] sm:h-[60%] bg-gray-100"></div>

  <div className="flex overflow-visible relative z-10 flex-wrap justify-center sm:justify-start">
    {cards.slice(startIndex, startIndex + 4).map((card) => (
      <div key={card.id} className="w-full ml-12 sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 sm:p-4 relative mt-16 sm:mt-20">
        <div className="bg-white p-2 sm:p-4 shadow relative z-20">
          <img
            className="w-3/4 h-full mx-auto mt-6 sm:mt-10"
            src={card.imageSrc}
            alt="Sunset in the mountains"
          />
          <span className="absolute top-2 sm:top-3 right-3 bg-sky-400 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-md">
            {card.label}
          </span>
          <div className="px-1 sm:px-2 py-2 sm:py-4">
            <div className="font-bold text-sm sm:text-md mb-1 sm:mb-2 text-left">
              {card.title}
            </div>
            <p className="text-xs sm:text-sm text-gray-400 text-left">{card.market}</p>
            <p className="text-xs sm:text-sm text-gray-400 text-left">
              Best Price{" "}
              <span className="text-blue-500">{card.bestPrice}</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-400 text-left">
              MRP <span className="line-through">{card.mrp}</span>
            </p>
            <button className="font-bold text-sky-400 w-full mt-1 sm:mt-2 text-xs sm:text-sm">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default BrowsingHistory;
