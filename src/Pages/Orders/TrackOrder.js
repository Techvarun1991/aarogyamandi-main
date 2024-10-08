import React, { useEffect, useState } from "react";
import Orderstatus from "./Orderstatus";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import OrderService from "../../Service/PharmcyService/OrderService";
import MedicineOrderService from "../../Service/MedicineOrder/MedicineOrder";
import { MoonLoader } from "react-spinners";

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
  const location = useLocation();
  const { orderId, orderItemId } = location.state || {};
  const patientId = localStorage.getItem("profileId");
  const [orderItemDetails, setOrderItemDetails] = useState();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrderItemDetails = async () => {
      setLoading(true); // Set loading to true before fetching
      // setError(null); // Reset error state

      try {
        const data = await MedicineOrderService.getOrderItemDetails(
          orderId,
          orderItemId,
          patientId
        );
        console.log("first order item details", data);
        setOrderItemDetails(data); // Set the fetched data in state
      } catch (error) {
        // setError("Failed to fetch order item details."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchOrderItemDetails(); // Call the function
  }, [orderId, orderItemId, patientId]); // Dependency array

  return (
    <div>
      <div className="container mx-auto p-4">
        <div>
          <div className="flex">
            {/* Sidebar */}

            <Sidebar />

            {/* Products Grid */}
            <div className="w-3/4">
              <div className="flex justify-between mx-4">
                <h1 className="">Order Tracking</h1>
                <h1 className="text-[#33BBC5]">ORDER ID:{orderId}</h1>
              </div>
              {isLoading ? (
                <div className="flex justify-center items-center h-48">
                  <MoonLoader size={30} color="#33BBC5" />
                </div>  
              ) : (
                <>
                  <div className="">
                    <div
                      key={orderItemDetails.orderDetailsId}
                      className={`w-11/12 p-4 "h-1/2" `}
                    >
                      <div className="">
                        <h5 className="text-sm text-left font-bold text-slate-900">
                          Delivery Estimated
                        </h5>
                        <h5 className="text-sm text-left text-slate-900 my-2">
                          {/* {orderItemDetails.} */}
                        </h5>
                      </div>

                      <div className="bg-white p-4 border rounded-lg shadow flex">
                        <div className="flex-none">
                          <img
                            src="https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/h-c-4.5e130b77.png"
                            alt={orderItemDetails.medicineName}
                            className="w-24 h-28 rounded"
                          />
                        </div>
                        <div className="flex-grow pl-4">
                          {/* Title and Price side by side */}
                          <div className="flex justify-between items-center">
                            <h5 className="text-md text-left">
                              {orderItemDetails.medicineName}
                            </h5>
                            <h5 className="text-md text-left text-rose-500">
                              MRP ₹ {orderItemDetails.discountedPrice}
                            </h5>
                          </div>

                          <div className="flex justify-between items-center">
                            {/* Rest of the quantity */}
                            <p className="text-sm text-gray-500 text-left">
                              Qty: {orderItemDetails.quantity}
                            </p>
                            <h5 className="text-sm text-left text-gray-500 line-through">
                              ₹ {orderItemDetails.originalPrice}
                            </h5>
                          </div>
                          <h5 className="text-sm text-left text-gray-500">
                            {/* Mfr: {orderItemDetails.Mkt} */}
                          </h5>

                          <h5 className="text-sm text-left text-gray-500">
                            {/* Seller: {orderItemDetails.Mkt} */}
                          </h5>

                          <h5 className="text-sm text-left text-black-500 font-bold">
                            {/* Expiry: {orderItemDetails.ExpiryDate} */}
                          </h5>
                        </div>
                      </div>
                    </div>
                    {/* ))} */}
                  </div>
                  <Orderstatus />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
