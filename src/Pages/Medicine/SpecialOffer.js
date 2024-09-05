import React, { useState, useEffect } from "react";

const SpecialOffer = () => {
  const cards = [
    { id: 1, title: "Ayurveda Product", content: "Get up to 51% OFF" },
    { id: 2, title: "Card 2", content: "Content for card 2" },
    { id: 3, title: "Card 3", content: "Content for card 3" },
    { id: 4, title: "Card 4", content: "Content for card 4" },
    { id: 5, title: "Card 5", content: "Content for card 5" },
    { id: 6, title: "Card 6", content: "Content for card 6" },
    { id: 7, title: "Card 7", content: "Content for card 7" },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerRow, setCardsPerRow] = useState(getCardsPerRow());

  function getCardsPerRow() {
    if (window.innerWidth < 640) return 1; // xs
    if (window.innerWidth < 768) return 1; // sm
    return 3; // md, lg, xl
  }

  useEffect(() => {
    function handleResize() {
      setCardsPerRow(getCardsPerRow());
      // Reset the startIndex to 0 when changing the number of cards per row
      setStartIndex(0);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + cardsPerRow, cards.length - cardsPerRow)
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - cardsPerRow, 0));
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
          {cards.slice(startIndex, startIndex + cardsPerRow).map((card) => (
            <div
              key={card.id}
              className={`w-full sm:w-full md:w-1/2 lg:w-1/3 p-4`}
            >
              <div className="bg-white p-4 border">
                <h3 className="font-bold text-lg text-left">{card.title}</h3>
                <p className="text-left">{card.content}</p>
                <button className="bg-cyan-400 text-white p-1 rounded-3xl w-1/2 my-4 flex justify-start">
                  <span className="w-full">Shop Now</span>
                </button>
                <p className="text-gray-500 text-xs text-left">T&C Apply</p>
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
        {startIndex + cardsPerRow < cards.length && (
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
