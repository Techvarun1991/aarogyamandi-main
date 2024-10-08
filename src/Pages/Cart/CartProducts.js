import React, { useState } from "react";
import ApplyPromocode from "./ApplyPromocode";
import Amount from "./Amount";
import OrderStepper from "./OrderStepper";

const CartProducts = () => {

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prevStep) => Math.min(prevStep + 1, 2));
  const prevStep = () => setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));


  const cartItems = [
    {
      id: 1,
      title: "LuxeGlow Anti-Aging Serum",
      content: "Only 2 Left in stocks",
      Mkt: "Hosona Consumer Pvt Ltd",
      Price: "290",
      ActualPrice: "300",
      Delivery: "Delivery Between 11 May To 15 May",
    },
    {
      id: 2,
      title: "AquaBurst Hydrating Moisturizer",
      content: "Only 3 Left in stocks",
      Mkt: "Market 2",
      Price: "250",
      ActualPrice: "260",
      Delivery: "Delivery Between 12 May To 16 May",
    },
    {
      id: 3,
      title: "FlexiFit Sports Headphones",
      content: "Only 4 Left in stocks",
      Mkt: "Market 3",
      Price: "210",
      ActualPrice: "220",
      Delivery: "Delivery Between 13 May To 17 May",
    },
    {
      id: 4,
      title: "PuraFresh Air Purifier",
      content: "Only 5 Left in stocks",
      Mkt: "Market 4",
      Price: "180",
      ActualPrice: "190",
      Delivery: "Delivery Between 14 May To 18 May",
    },
    {
      id: 4,
      title: "PuraFresh Air Purifier",
      content: "Only 5 Left in stocks",
      Mkt: "Market 4",
      Price: "180",
      ActualPrice: "190",
      Delivery: "Delivery Between 14 May To 18 May",
    },
    {
      id: 5,
      title: "PuraFresh Air Purifier",
      content: "Only 5 Left in stocks",
      Mkt: "Market 4",
      Price: "180",
      ActualPrice: "190",
      Delivery: "Delivery Between 14 May To 18 May",
    },
    {
      id: 6,
      title: "PuraFresh Air Purifier",
      content: "Only 5 Left in stocks",
      Mkt: "Market 4",
      Price: "180",
      ActualPrice: "190",
      Delivery: "Delivery Between 14 May To 18 May",
    },
    // Add more products here
  ];
  // const cartItems = [];
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex(startIndex + 3);
  };

  const handlePrev = () => {
    setStartIndex(startIndex - 3);
  };

  return (
    <>

      <OrderStepper currentStep={currentStep} />
      <div>
      {cartItems.length !== 0 ? (
        <div className="flex">
          <div className="w-3/5 p-4 mx-5">
            <div className="text-left mx-4">Cart Product</div>

            <div className="relative w-[90%] h-[550px] overflow-y-scroll">
              {cartItems.map((card, index) => (
                <div
                  key={card.id}
                  className={`w-full p-4 ${index > 2 ? "h-1/2" : "h-auto"} `}
                >
                  <div className="bg-white p-4 border rounded-lg shadow flex">
                    <div className="flex-none">
                      <img
                        src="https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/h-c-4.5e130b77.png"
                        alt={card.title}
                        className="w-24 h-32 rounded"
                      />
                    </div>
                    <div className="flex-grow pl-4">
                      <h5 className="text-md text-left">{card.title}</h5>
                      <p className="text-sm text-gray-500 text-left">
                        {card.content.length > 60
                          ? `${card.content.substring(0, 60)}...`
                          : card.content}
                      </p>
                      <h5 className="text-sm text-left text-gray-500">
                        {card.Mkt}
                      </h5>
                      <h5 className="text-md text-left text-rose-500">
                        ₹ {card.Price}
                      </h5>
                      <h5 className="text-sm text-left text-gray-500 line-through">
                        ₹ {card.ActualPrice}
                      </h5>
                      <h5 className="text-sm text-left text-slate-900">
                        {card.Delivery}
                      </h5>
                      <div className="flex justify-start mt-2">
                        <button className="text-sm text-sky-400 w-auto">
                          Save for later
                        </button>
                        <button className="text-sm mx-10 text-sky-400 w-auto">
                          Move to WishList
                        </button>
                        <button className="text-sm p-0.5 text-pink-400 w-auto ml-auto border-2 rounded-lg border-pink-400">
                          Qty 1
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-2/5 p-4">
            <ApplyPromocode />

            <Amount />
          </div>
        </div>
      ) : (
        <div className="flex justify-center my-32 mx-auto h-56 w-96 border">
          <div className="mt-24">
            <h1>Hey, it feels so light!</h1>
            <h4>There is nothing in your cart. Let's add some items.</h4>
          </div>
        </div>
      )}
      {currentStep === 1 && <div>Address Step</div>}
      {currentStep === 2 && <div>Payment Step</div>}
      </div>
      
    </>
  );
};

export default CartProducts;
