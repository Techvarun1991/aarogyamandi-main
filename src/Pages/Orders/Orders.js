import React from "react";
import TrackOrder from "./TrackOrder";
import Orderstatus from "./Orderstatus";
import Sidebar from "./Sidebar";

const Orders = () => {
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
      <nav className="flex" aria-label="Breadcrumb " display="flex">
        <div className="w-1/4">
          <ol className="inline-flex space-x-1 md:space-x-2 rtl:space-x-reverse my-10">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                Account
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  className="ms-1 text-cyan-400 text-sm font-medium  hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Your Orders
                </a>
              </div>
            </li>
            {/* <li aria-current="page">
      <div className="flex items-center">
        <svg
          className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
          Flowbite
        </span>
      </div>
    </li> */}
          </ol>
        </div>
        <div>
          <form className="flex items-center max-w-sm my-8 mx-10">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
              <input
                type="text"
                id="simple-search"
                className=" border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for Product"
                required=""
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white text-cyan-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <p className="text-cyan-500 text-lg font-bold">Search</p>
            </button>
          </form>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <div>
          <div className="flex">
            {/* Sidebar */}
            
            <Sidebar />

            {/* Products Grid */}
            <div className="w-3/4">
              <div className="">
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    className={`w-11/12 p-4 ${index > 2 ? "h-1/2" : "h-auto"} `}
                  >
                    <div className="">
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
                          className="w-28 h-36 rounded"
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

                        <div className="flex justify-start mt-2">
                          <button className="bg-red-600 text-sm text-white w-auto px-5 py-2">
                            Cancel Order
                          </button>
                          <button className="text-sm mx-10 bg-cyan-400 text-white px-5 py-2">
                            Track Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
