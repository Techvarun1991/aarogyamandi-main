import React, { useEffect, useState } from "react";

const ComboOffer = () => {
  const cards = [
    { id: 1, title: "Ayurveda Product", content: "Get up to 51% OFF" },
    { id: 2, title: "Tresemme", content: "Content for card 2" },
    { id: 3, title: "Card 3", content: "Content for card 3" },
    { id: 4, title: "Card 4", content: "Content for card 4" },
    { id: 5, title: "Card 5", content: "Content for card 5" },
    { id: 6, title: "Card 6", content: "Content for card 6" },
    { id: 7, title: "Card 7", content: "Content for card 7" },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (windowWidth < 768) {
      setStartIndex((prevIndex) => (prevIndex + 1) % cards.length);
    } else {
      setStartIndex((prevIndex) =>
        prevIndex + 4 < cards.length ? prevIndex + 4 : prevIndex
      );
    }
  };

  const handlePrev = () => {
    if (windowWidth < 768) {
      setStartIndex((prevIndex) =>
        prevIndex === 0 ? cards.length - 1 : prevIndex - 1
      );
    } else {
      setStartIndex((prevIndex) => Math.max(prevIndex - 4, 0));
    }
  };

  const getVisibleCards = () => {
    if (windowWidth < 768) {
      return cards.slice(startIndex, startIndex + 1);
    }
    return cards.slice(startIndex, startIndex + 4);
  };

  return (
    <div>
      <div className="flex justify-between items-center w-[90%] mx-auto my-10">
        <h1 className="text-left text-xl font-bold">Combo Offer</h1>
        <span className="text-right text-sm text-blue-500 cursor-pointer">
          View More
        </span>
      </div>

      <div className="relative w-[93%] mx-auto">
        <div className="flex overflow-hidden">
          {getVisibleCards().map((card) => (
            <div
              key={card.id}
              className={`${
                windowWidth < 768 ? "w-full" : "w-1/4"
              } p-4`}
            >
              <div className="bg-white p-4 shadow">
                <img
                  className="w-3/4 h-full mx-auto"
                  src="https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png"
                  alt="Sunset in the mountains"
                />
                <h3 className="font-bold text-lg my-4">{card.title}</h3>
                <p className="my-2">{card.content}</p>
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

export default ComboOffer;
