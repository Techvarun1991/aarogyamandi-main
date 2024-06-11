import React, { useState } from 'react'

const RelatedPost = () => {
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
    
      const handleNext = () => {
        setStartIndex((prevIndex) =>
          Math.min(prevIndex + cardsPerRow, cards.length - cardsPerRow)
        );
      };
    
      const handlePrev = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - cardsPerRow, 0));
      };
    
      const getCardsPerRow = () => {
        if (window.innerWidth < 640) return 1; // xs
        if (window.innerWidth < 768) return 1; // sm
        if (window.innerWidth < 1024) return 2; // md
        return 3; // lg and xl
      };
    
      const cardsPerRow = getCardsPerRow();
    
      return (
        <div>
            <div className="bg-white p-4 w-[90%] mx-1 h-[50%] mx-14 border -shadow">
                <p className='text-lg text-left mx-3 font-arai'>Related Post</p>
                <div className="bg-white p-4 flex w-[90%] mx-1 h-[50%]">
                <div className="flex-none w-1/5 mx-auto">
                  <img
                    src="https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/h-c-4.5e130b77.png"
                    alt="hii"
                    className=""
                  />
                </div>
                <div className="flex-grow pl-4">
                  <h5 className="font-bold text-md text-left">
                    hii
                  </h5>
                </div>
                </div>
              </div>
            </div>
      );
    };

export default RelatedPost