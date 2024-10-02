import React from "react";
import ApplyPromocode from "../Cart/ApplyPromocode";
import Amount from "../Cart/Amount";
import PriceSection from "./PriceSection";

const Checkoutpage = () => {
  const cards = [
    {
      id: 1,
      title: "LuxeGlow Anti-Aging Serum",
      quantity: "1",
      Mkt: "Hosona Consumer Pvt Ltd",
      Price: "290",
      ActualPrice: "300",
      Delivery: "1 Jan 2025",
      ExpiryDate: "1 Jan 2026",
    },
    {
      id: 2,
      title: "AquaBurst Hydrating Moisturizer",
      quantity: "1",
      Mkt: "Market 2",
      Price: "250",
      ActualPrice: "260",
      Delivery: "1 Jan 2025",
      ExpiryDate: "1 Jan 2026",
    },
    {
      id: 3,
      title: "FlexiFit Sports Headphones",
      quantity: "1",
      Mkt: "Market 3",
      Price: "210",
      ActualPrice: "220",
      Delivery: "1 Jan 2025",
      ExpiryDate: "1 Jan 2026",
    },
    {
      id: 4,
      title: "PuraFresh Air Purifier",
      quantity: "1  ",
      Mkt: "Market 4",
      Price: "180",
      ActualPrice: "190",
      Delivery: "1 Jan 2025",
      ExpiryDate: "1 Jan 2026",
    },
    

    // Add more products here
  ];

  return (
    <div>
      <div className="flex">
        <div className="w-3/5 p-4 mx-5">
          <div className="text-left mx-4 text-2xl">Cart Product</div>

          <div className="relative  ">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`w-full p-4 ${index > 2 ? "h-1/2" : "h-auto"} `}
              >
                <div className="my-2">
                  <h5 className="text-sm text-left font-bold text-slate-900">
                    Delivery Estimated
                  </h5>
                  <h5 className="text-sm text-left text-slate-900 my-2">
                    {card.Delivery}
                  </h5>
                </div>

                <div className="bg-white p-4 border rounded-lg shadow flex">
                  <div className="flex-none">
                    <img
                      src="https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/h-c-4.5e130b77.png"
                      alt={card.title}
                      className="w-24 h-28 rounded"
                    />
                  </div>
                  <div className="flex-grow pl-4">
                    {/* Title and Price side by side */}
                    <div className="flex justify-between items-center">
                      <h5 className="text-md text-left">{card.title}</h5>
                      <h5 className="text-md text-left text-rose-500">
                        MRP ₹ {card.Price}
                      </h5>
                    </div>

                    <div className="flex justify-between items-center">
                      {/* Rest of the quantity */}
                      <p className="text-sm text-gray-500 text-left">
                        Qty:{" "}
                        {card.quantity.length > 60
                          ? `${card.quantity.substring(0, 60)}...`
                          : card.quantity}
                      </p>
                      <h5 className="text-sm text-left text-gray-500 line-through">
                        ₹ {card.ActualPrice}
                      </h5>
                    </div>
                    <h5 className="text-sm text-left text-gray-500">
                      Mfr: {card.Mkt}
                    </h5>

                    <h5 className="text-sm text-left text-gray-500">
                      Seller: {card.Mkt}
                    </h5>

                    <h5 className="text-sm text-left text-black-500 font-bold">
                      Expiry: {card.ExpiryDate}
                    </h5>

                    {/* <div className="flex justify-start mt-2">
                      <button className="text-sm text-sky-400 w-auto">
                        Save for later
                      </button>
                      <button className="text-sm mx-10 text-sky-400 w-auto">
                        Move to WishList
                      </button>
                      <button className="text-sm p-0.5 text-pink-400 w-auto ml-auto border-2 rounded-lg border-pink-400">
                        Qty 1
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full">
          <div className="flex justify-between items-center">
    <p className="text-left text-lg mx-5">Delivery Address</p>
    <button className="text-rose-500 px-4 py-2 rounded-md mx-5 text-lg">
      Select Address
    </button>
  </div>
            <p className="text-left mx-5">Brock Lesner</p>
            <p className="text-left mx-5">Hebbal</p>
            <p className="text-left mx-5">+91 1234567890</p>
          </div>
        </div>

        <div className="w-2/5 p-4">
          <PriceSection />
         
        </div>
      </div>
    </div>
  );
};

export default Checkoutpage;
