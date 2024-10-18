import React, { useState } from "react";

const Festiveoffers = () => {
  const cards = [
    {
      id: 1,
      title: "Get upto Rs 500 cashback* + Earn up to 6X rewards",
      content:
        "ALL users get Cashback between max. Rs 500 & min Rs.50 ONLY one transaction of min. Rs 799,",
    },
    { id: 2, title: "Card 2", content: "Content for card 2" },
    { id: 3, title: "Card 3", content: "Content for card 3" },
    { id: 4, title: "Card 4", content: "Content for card 4" },
    { id: 5, title: "Card 5", content: "Content for card 5" },
    { id: 6, title: "Card 6", content: "Content for card 6" },
    { id: 7, title: "Card 7", content: "Content for card 7" },
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex(startIndex + 3);
  };

  const handlePrev = () => {
    setStartIndex(startIndex - 3);
  };

  return (
    <div>
      <div className="flex justify-between items-center w-[90%] mx-auto my-10">
        <h1 className="text-left text-xl font-bold">Festive Offers</h1>
        <span className="text-right text-sm text-blue-500 cursor-pointer">
          View More
        </span>
      </div>

      <div className="relative w-[93%] mx-auto">
        <div className="flex flex-wrap overflow-hidden">
          {cards
            .slice(
              startIndex,
              startIndex +
                (window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3)
            )
            .map((card) => (
              <div
                key={card.id}
                className="w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 p-4"
              >
                <div className="bg-white p-4 border rounded-lg shadow flex">
                  <div className="flex-none">
                    <img
                      src="https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/h-c-4.5e130b77.png"
                      alt={card.title}
                      className="w-20 h-24 rounded"
                    />
                  </div>
                  <div className="flex-grow pl-4">
                    <h5 className="text-md text-left">{card.title}</h5>
                    <p className="text-sm text-gray-500 text-left">
                      {card.content.length > 60
                        ? `${card.content.substring(0, 60)}...`
                        : card.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Previous Button */}
        {startIndex > 0 && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-cyan-400 text-white p-2 rounded-full"
            onClick={handlePrev}
          >
            &lt;
          </button>
        )}

        {/* Next Button */}
        {startIndex +
          (window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3) <
          cards.length && (
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

export default Festiveoffers;
