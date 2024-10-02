import React from 'react'
import Orderstatus from './Orderstatus';
import Sidebar from './Sidebar';

const TrackOrder = () => {
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
      ];
    
      return (
        <div>   
    
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
    
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Orderstatus />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default TrackOrder