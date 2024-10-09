import React, { useState, useEffect } from "react";
import DiscountService from "../../Service/Medicines/DiscountService";

const SpecialOffer = () => {
  const [cards, setCards] = useState([]); // Holds the discounts from the API
  const [page, setPage] = useState(0); // Track the current page
  const [totalPages, setTotalPages] = useState(0); // Track total pages from the API response
  const pageSize = 3; // Number of cards per page

  const [cardsPerRow, setCardsPerRow] = useState(getCardsPerRow());

  function getCardsPerRow() {
    if (window.innerWidth < 640) return 1; // xs
    if (window.innerWidth < 768) return 1; // sm
    return 3; // md, lg, xl
  }

  // Fetch special offers from the API
  const fetchSpecialOffers = async (page) => {
    console.log("Page " + page);
    try {
      const data = await DiscountService.getSpecialOffers(page, pageSize);
      setCards(data.discounts); // Update the discounts list
      console.log(data); //
      setTotalPages(data.totalPages); // Update the total pages
    } catch (error) {
      console.error("Error fetching special offers:", error);
    }
  };

  // Fetch data when the component mounts and whenever `page` changes
  useEffect(() => {
    fetchSpecialOffers(page);
  }, [page]);

  useEffect(() => {
    function handleResize() {
      setCardsPerRow(getCardsPerRow());
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1); // Increment the page number
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1); // Decrement the page number
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center w-[90%] mx-auto my-10">
        <h1 className="text-left text-xl font-bold">Special Offers</h1>
        <span className="text-right text-sm text-blue-500 cursor-pointer">
          View More
        </span>
      </div>
      <div className="relative w-[93%] mx-auto">
        <div className="flex flex-wrap overflow-hidden">
          {cards.map((card) => (
            <div
              key={card.discountId}
              className={`w-full sm:w-full md:w-1/2 lg:w-1/3 p-4`}
            >
              <div className="bg-white p-4 border">
                <h3 className="font-bold text-lg text-left">{card.title}</h3>
                <p className="text-left">{card.pharmacy.name}</p>
                {card.discountType === "PERCENTAGE" && (
                  <span className="text-sky-400 text-sm">
                    Get {`${card?.discountValue}%`} OFF
                  </span>
                )}
                {card.discountType === "BUY_ONE_GET_ONE" && (
                  <span className="text-sky-400 text-sm">
                    Buy One Get One Offer
                  </span>
                )}
                {card.discountType === "FLAT" && (
                  <span className="text-sky-400 text-sm">
                    Get Rs.{`${card?.discountValue.toFixed(2)}`} OFF
                  </span>
                )}

                <button className="bg-cyan-400 text-white p-1 rounded-3xl w-1/2 my-4 flex justify-start">
                  <span className="w-full">Shop Now</span>
                </button>
                <p className="text-gray-500 text-xs text-left">T&C Apply</p>
              </div>
            </div>
          ))}
        </div>
        {page > 0 && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-cyan-400 text-white p-2 rounded-full"
            onClick={handlePrev}
          >
            &lt;
          </button>
        )}
        {page < totalPages - 1 && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-cyan-400 text-white p-2 rounded-full"
            onClick={handleNext}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default SpecialOffer;
