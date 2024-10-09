import React, { useState, useEffect } from "react";
import DiscountService from "../../Service/Medicines/DiscountService";

const Halfpricestore = () => {
  const [cards, setCards] = useState([]); // Holds the discounts from the API
  const [page, setPage] = useState(0); // Track the current page
  const [totalPages, setTotalPages] = useState(0); // Track total pages from the API response
  const pageSize = 5; 
  const [startIndex, setStartIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const fetchHalfPriceProducts = async (page) => {
    try {
      const response = await DiscountService.getHalfPriceProductFromDiscount(page,pageSize);
      console.log("firstHalfPriceProduct", response.data);
      setCards(response.data.pharmacyMedicineStock); // Update the discounts list
      setTotalPages(response.data.totalPages); // Update the total pages
    } catch (error) {
      console.error("Error fetching special offers:", error);
    }
  };

  useEffect(() => {
    fetchHalfPriceProducts(page);
  }, [page]);



  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const handleNext = () => {
  //   if (windowWidth < 768) {
  //     setStartIndex((prevIndex) => (prevIndex + 1) % cards.length);
  //   } else {
  //     setStartIndex((prevIndex) =>
  //       prevIndex + 4 < cards.length ? prevIndex + 4 : prevIndex
  //     );
  //   }
  // };

  // const handlePrev = () => {
  //   if (windowWidth < 768) {
  //     setStartIndex((prevIndex) =>
  //       prevIndex === 0 ? cards.length - 1 : prevIndex - 1
  //     );
  //   } else {
  //     setStartIndex((prevIndex) => Math.max(prevIndex - 4, 0));
  //   }
  // };
  const handleNext = () => {
    if (page + 1 < totalPages) {
      // Move to the next page if not at the last page
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      // Move to the previous page if not at the first page
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center w-[90%] mx-auto my-10">
        <h1 className="text-left text-xl font-bold">Half Price Store</h1>
        <span className="text-right text-sm text-blue-500 cursor-pointer">
          View More
        </span>
      </div>

      <div className="relative w-[93%] mx-auto">
        <div className="flex overflow-hidden">
          {cards
            // .slice(0, windowWidth < 768 ? 1 : pageSize)
            .map((card) => (
              <div
                key={card.pharmacyMedicineStockId}
                className="w-full sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/4 p-4 relative"
              >
                <div className="bg-white p-4 shadow relative">
                  <img
                    className="w-3/4 h-full mx-auto mt-10"
                    src="https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png"
                    alt="Sunset in the mountains"
                  />
                  <span className="absolute top-3 left-0 bg-rose-400 text-white px-2 py-1 rounded-r-md">
                    {card.medicine.medicineName}
                  </span>
                  <div className="px-2 py-4">
                    <div className="font-bold text-md mb-2 text-left">
                      {card.medicine.medicineIngredients}
                    </div>
                    <p className="text-sm text-gray-400 text-left">
                      {card.medicine.manufacturer}
                    </p>
                    <p className="text-sm text-gray-400 text-left">
                      Best Price{" "}
                      <span className="text-blue-500">{card.sellingPrice}</span>
                    </p>
                    <p className="text-sm text-gray-400 text-left">
                      MRP <span className={`line-through`}>{card.originalPrice}</span>
                    </p>
                    <button className="font-bold text-sky-400 w-full mt-2">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {startIndex > 0 && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-cyan-400 text-white p-2 rounded-full"
            onClick={handlePrev}
          >
            &lt;
          </button>
        )}
        {(windowWidth < 768 && startIndex + 1 < cards.length) ||
        (windowWidth >= 768 && startIndex + 4 < cards.length) ? (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-cyan-400 text-white p-2 rounded-full"
            onClick={handleNext}
          >
            &gt;
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Halfpricestore;
