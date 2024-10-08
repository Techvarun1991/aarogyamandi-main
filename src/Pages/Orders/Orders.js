import React, { useEffect, useState } from "react";
import TrackOrder from "./TrackOrder";
import Orderstatus from "./Orderstatus";
import Sidebar from "./Sidebar";
import OrderService from "../../Service/PharmcyService/OrderService";
import { useNavigate } from "react-router-dom";

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
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const profileId = localStorage.getItem("profileId");
    OrderService.getByProfileId(profileId)
      .then((response) => {
        if (response.status === 200) {
          console.log(
            response.data,
            "-----------------------response.data----------"
          );
          setOrder(response.data);
          // setOrderDetails(response.data.orderDetailsList)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleTrackOrder = (orderId, orderItemId) => {
    // Navigate to the trackOrder page with state
    navigate('/trackOrder', {
      state: {
        orderId,
        orderItemId,
      },
    });
  };
  return (
    <div>
      <nav className="flex" aria-label="Breadcrumb " display="flex">
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
              className="p-2.5 ms-2 text-sm font-medium text-cyan-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <p className="text-cyan-500 text-lg font-bold">Search</p>
            </button>
          </form>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <div>
          <div className="flex">
            <Sidebar />
            <div className="w-3/4">
              <div className="">
                {order.length > 0 ? (
                  order.map((order) => (
                    <div key={order.orderId} className="mb-8">
                      <h3 className="text-lg font-semibold">
                        Order ID: {order.orderId}
                      </h3>
                      <p>Ordered Time: {order.orderedTime}</p>
                      <div className="mt-4">
                        {order.orderDetailsList &&
                        order.orderDetailsList.length > 0 ? (
                          order.orderDetailsList.map((orderItem) => (
                            <div
                              key={`${order.orderId}-${orderItem.orderDetailsId}`} // Unique key
                              className="w-11/12 p-4 h-auto mb-4 bg-white border rounded-lg shadow flex"
                            >
                              <div className="flex-none">
                                <img
                                  src="https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/h-c-4.5e130b77.png"
                                  alt={orderItem.medicineName}
                                  className="w-28 h-36 rounded"
                                />
                              </div>
                              <div className="flex-grow pl-4">
                                {/* Title and Price side by side */}
                                <div className="flex justify-between items-center">
                                  <h5 className="text-md text-left">
                                    {orderItem.medicineName}
                                  </h5>
                                  <h5 className="text-md text-left text-rose-500">
                                    ₹ {orderItem.discountedPrice}
                                  </h5>
                                </div>

                                <div className="flex justify-between items-center">
                                  <p className="text-sm text-gray-500 text-left">
                                    Qty: {orderItem.quantity}
                                  </p>
                                  <h5
                                    className={`text-sm text-left text-gray-500 ${
                                      orderItem.promocodeApplied
                                        ? "line-through"
                                        : ""
                                    }`}
                                  >
                                    MRP ₹ {orderItem.originalPrice}
                                  </h5>
                                </div>
                                {orderItem.promocodeApplied && (
                                  <h5 className="text-sm text-left text-gray-500">
                                    Promo Code: {orderItem.promocodeName}
                                  </h5>
                                )}

                                <h5 className="text-sm text-left text-gray-500">
                                  Payment Mode: {orderItem.paymentMode}
                                </h5>

                                <h5 className="text-sm text-left text-black-500 font-bold">
                                  Payment Status: {orderItem.paymentStatus}
                                </h5>

                                <div className="flex justify-start mt-2">
                                  <button className="bg-red-600 text-sm text-white w-auto px-5 py-2">
                                    Cancel Order
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleTrackOrder(
                                        order.orderId,
                                        orderItem.orderDetailsId
                                      )
                                    } // Call the function with parameters
                                    className="text-sm mx-10 bg-cyan-400 text-white px-5 py-2"
                                  >
                                    Track Order
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No order details available.</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No orders found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
