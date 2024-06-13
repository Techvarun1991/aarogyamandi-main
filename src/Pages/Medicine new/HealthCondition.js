import React from "react";

const HealthCondition = () => {
  const cards = [
    { id: 1, title: "Covid-19", content: "Get up to 51% OFF" },
    { id: 2, title: "Diabetic Care", content: "Content for card 2" },
    { id: 3, title: "Cardiac", content: "Content for card 3" },
    { id: 4, title: "Stomach Care", content: "Content for card 4" },
    { id: 5, title: "Card 5", content: "Content for card 5" },
    { id: 6, title: "Card 6", content: "Content for card 6" },
    { id: 7, title: "Card 7", content: "Content for card 7" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center w-[90%] mx-auto my-10">
        <h1 className="text-left text-xl font-bold">
          Shop By Health Condition
        </h1>
        <span className="text-right text-sm text-blue-500 cursor-pointer">
          View More
        </span>
      </div>

      <div className="relative w-[93%] mx-auto overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4">
          {cards.map((card) => (
            <div key={card.id} className="min-w-[250px] p-4">
              <div className="bg-white p-4 border rounded-lg shadow flex">
                <div className="flex-none">
                  <img
                    src="https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/h-c-4.5e130b77.png"
                    alt={card.title}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <div className="flex-grow pl-4">
                  <h5 className="font-bold text-md text-center my-5">
                    {card.title}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthCondition;
