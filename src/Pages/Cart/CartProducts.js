import React, { useEffect, useRef, useState } from "react";
import ApplyPromocode from "./ApplyPromocode";
import Amount from "./Amount";
import OrderStepper from "./OrderStepper";
import MedicineCartService from "../../Service/MedicineCart/MedicineCart";
import { createRoot } from "react-dom/client";
import App from "../../App";
import { toast, ToastContainer } from "react-toastify";
import BASE_REST_API_URL from "../../Service/BaseUrl";
import MedicineOrderService from "../../Service/MedicineOrder/MedicineOrder";
import { Navigate, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS for proper styling
import CartService from "../../Service/PharmcyService/CartService";

const CartProducts = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [medicineCart, setMedicineCart] = useState(null);
  const [selectedPromocode, setSelectedPromocode] = useState(null);
  const [promocodeOptions, setPromoCodeOptions] = useState([]);
  const [checkMedicine, setCheckMedicine] = useState([]);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const nextStep = () =>
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 2));
  const prevStep = () =>
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));

  useEffect(() => {
    // Fetch the patientId from localStorage
    const patientId = localStorage.getItem("profileId");

    if (patientId) {
      const fetchMedicineCart = async () => {
        try {
          const response = await MedicineCartService.fetchByPatientId(
            patientId
          ); // Use patientId from localStorage
          console.log("MedicineData", response.data);
          setMedicineCart(response.data); // Store the API response data
          // cartItems.current = response.data.medicine_cart_items;
          setCartItems(response.data.medicine_cart_items);
          // console.log("CartItems", cartItems.current);
        } catch (error) {
          console.error("Error fetching medicine cart:", error);
        }
      };
      fetchMedicineCart();
    } else {
      console.error("No patientId found in localStorage");
    }
  }, []); // Empty dependency array ensures it runs only once after component mounts

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex(startIndex + 3);
  };

  const updateCartQuantity = async (cartItemId, newQuantity, pharmaStockId) => {
    try {
      const payload = {
        cartId: medicineCart.cartId,
        cartItemId: cartItemId, // Replace with the actual card ID
        quantity: newQuantity, // Replace with the new quantity
        pharmaStockId: pharmaStockId,
      };
      const response = await MedicineCartService.updateCartItemQuantity(
        payload
      );
      console.log("Cart item updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating cart item:", error);
    } finally {
      root.render(<App />);
    }
  };

  const handleQuantityChange = (e, cardId, pharmaStockId) => {
    const newQuantity = e.target.value;
    console.log("first quantity", newQuantity);
    // Update the state or perform any other logic to update the quantity for the selected card
    updateCartQuantity(cardId, newQuantity, pharmaStockId); // Replace this with your actual logic
  };

  const handlePrev = () => {
    setStartIndex(startIndex - 3);
  };

  const handleApplyClick = async () => {
    try {
      if (!selectedPromocode) {
        toast.error("Please Select a Promo Code.");
        return;
      }
      const matchedPromoCode = promocodeOptions.find(
        (option) => option.promoCode === selectedPromocode.promoCode
      );
      if (!matchedPromoCode) {
        toast.error(
          `Invalid or expired promo code: "${selectedPromocode.promoCode}"`
        );
        return;
      }

      const response = await fetch(
        `${BASE_REST_API_URL}/api/medicineCart/cart/${medicineCart.cartId}/promo/${matchedPromoCode.promocodeId}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("first Promo Code", data);
        setSelectedPromocode(matchedPromoCode);
        setMedicineCart(data.medicineCart);
        setCartItems(data.medicineCart.medicine_cart_items);

        if (data.medicineCart.promocodeApplied === true && data.reason === "") {
          toast.success(
            `Promo code "${selectedPromocode.promoCode}" applied successfully!`
          );
        }

        if (data.reason) {
          // setReason(data.reason);
          toast.error(data.reason);
          // setSelectedPromoCode('');
        }

        if (data.applicableProductIds) {
          console.log("Applicable Product", data.applicableProductIds);
          // setApplicableProductIds(data.applicableProductIds);
        }
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(error);
      // setSelectedPromoCode('');
    }
  };

  const handleCheckboxChange = (promoCode) => {
    // Toggle promo code selection
    if (
      selectedPromocode &&
      selectedPromocode.promocodeId === promoCode.promocodeId
    ) {
      setSelectedPromocode(null); // Deselect if already selected
      const updatedCartItems = cartItems.map((item) => ({
        ...item,
        promocodeApplied: false,
      }));
      setCartItems(updatedCartItems);
    } else {
      setSelectedPromocode(promoCode); // Select the new promo code
    }
  };

  const handleClearClick = () => {
    setSelectedPromocode(null); // Clear the selected promo code
  };

  //use
  useEffect(() => {
    const fetchPromoCodeOptions = async () => {
      try {
        const promoCodes = new Map(); // Use a Map to store unique promo codes based on promoCodeId
        await Promise.all(
          medicineCart.medicine_cart_items.map(async (item) => {
            const medPromoCodes = await MedicineCartService.fetchMedicineOffers(
              item.pharmaId,
              item.medicineId
            );
            medPromoCodes.forEach((promoCode) => {
              // Check if the promo code id is already present in the Map
              if (!promoCodes.has(promoCode.promocodeId)) {
                promoCodes.set(promoCode.promocodeId, promoCode);
              }
            });
          })
        );
        // Convert the Map values back to an array of promo code options
        const uniquePromoCodeOptions = Array.from(promoCodes.values());
        // console.log("Promo Code Options: ", uniquePromoCodeOptions);
        setPromoCodeOptions(uniquePromoCodeOptions);
      } catch (error) {
        console.error("Error fetching promo codes:", error);
      }
    };
    fetchPromoCodeOptions();
  }, [medicineCart]);

  const checkAvailability = async (cartData) => {
    try {
      // Check if cartData is an array
      if (!Array.isArray(cartData)) {
        throw new Error("cartData is not an array.");
      }

      const payload = {};

      // Iterate over cartData to construct the payload
      cartData.forEach((item, index) => {
        const pharmaStockId = item.pharmaStockId;
        const quantity = item.quantity;
        // Add pharmaStockId and quantity to the payload
        payload[pharmaStockId] = quantity;
      });

      // // Call the service with the constructed payload
      const checkedMed = await MedicineOrderService.checkMedicineAvailabilty(
        payload
      );
      setCheckMedicine(checkedMed);

      // Check if all products are available
      if (checkedMed.allProductsAvailable) {
        // Call handlePlaceOrder if all products are available
        // handlePlaceOrder();

        navigate("/address", { state: { medicineCart } });
      }
    } catch (error) {
      console.error("Error fetching medicine availability", error);
    }
  };
  const root = createRoot(document.getElementById("root"));

  const handleDeleteItem = (cartItemId) => {
    // Filter out the item with the given cartItemId
    CartService.deleteCartItems(medicineCart.cartId, cartItemId)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Item removed successfully");
        }
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        root.render(<App />);
      });
  };

  return (
    <>
      <OrderStepper currentStep={currentStep} />
      <div>
        {cartItems.length !== 0 ? (
          <div className="flex">
            <div className="w-full md:w-3/5 p-2 sm:p-4 mx-2 sm:mx-5">
              <div className="text-left mx-2 sm:mx-4">Cart Product</div>

              <div className="relative w-full sm:w-[90%] h-[400px] sm:h-[550px] overflow-y-scroll">
                {cartItems.map((card, index) => (
                  <div
                    key={card.cartItemId}
                    className={`w-full p-2 sm:p-4 ${
                      index > 2 ? "h-1/2" : "h-auto"
                    } `}
                  >
                    <div className="bg-white p-2 sm:p-4 border rounded-lg shadow flex flex-col md:flex-row">
                      <div className="flex-none">
                        <img
                          src="https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/h-c-4.5e130b77.png"
                          alt={card.medicineName}
                          // className="w-20 h-28 sm:w-24 sm:h-32 rounded"
                          className="w-[60%] md:w-24 h-28 sm:h-32 rounded"
                        />
                      </div>
                      <div className="flex-grow pl-2 sm:pl-4">
                        <div className="flex justify-between items-center">
                          <h5 className="text-sm sm:text-md text-left">
                            {card.medicineName}
                          </h5>
                          {/* Delete Icon */}
                          <button
                            className="text-red-500"
                            onClick={() => handleDeleteItem(card.cartItemId)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="black"
                              className="w-5 h-5 sm:w-6 sm:h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 6h18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m2 0v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6h12z"
                              />
                            </svg>
                          </button>
                        </div>
                        <h5 className="text-sm text-left text-gray-500">
                          {card.pharmaName}
                        </h5>
                        {card.promocodeApplied && (
                          <h5 className="text-md text-left text-rose-500">
                            ₹ {card.discountedPrice}
                          </h5>
                        )}
                        <h5
                          className={`text-sm text-left text-gray-500 ${
                            card.promocodeApplied ? "line-through" : ""
                          }`}
                        >
                          ₹ {card.originalPrice}
                        </h5>

                        <div className="flex justify-start mt-2">
                          <button className="text-sm text-sky-400 w-auto">
                            Save for later
                          </button>
                          <button className="text-sm mx-5 sm:mx-10 text-sky-400 w-auto">
                            Move to WishList
                          </button>
                          <select
                            className="text-sm p-0.5 text-pink-400 w-auto ml-auto border-2 rounded-lg border-pink-400"
                            value={card.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                e,
                                card.cartItemId,
                                card.pharmaStockId
                              )
                            }
                          >
                            {[...Array(10).keys()].map((num) => (
                              <option key={num + 1} value={num + 1}>
                                Qty: {num + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-2/5 p-4">
              {/* Promo Codes Section */}
              <div>
                <div className="text-left">Apply Promo Codes/NMS Supercash</div>

                <div className="text-left text-blue-400">Promocode</div>

                <div className="flex relative w-full my-5">
                  <label
                    htmlFor="promo_code"
                    className="block mt-2 text-sm font-medium text-gray-900 dark:text-white"
                  ></label>
                  <input
                    type="text"
                    id="promo_code"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[70%] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Promo code"
                    required
                    value={selectedPromocode ? selectedPromocode.promoCode : ""}
                    readOnly // Make the input read-only
                  />
                  

                  <button
                    type="button"
                    className="ml-2 px-4 py-2 text-blue-400 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={handleApplyClick}
                  >
                    Apply
                  </button>
                </div>

                <div>
                  {promocodeOptions.map((coupon) => (
                    <div
                      key={coupon.id}
                      className="bg-white p-4 border-2 border-slate-900 border-dashed rounded-lg my-5 w-full md:w-[80%]"
                    >
                      <div className="flex items-center rounded dark:border-gray-700">
                        <input
                          type="checkbox"
                          id={coupon.promocodeId}
                          checked={
                            selectedPromocode &&
                            selectedPromocode.promocodeId === coupon.promocodeId
                          }
                          onChange={() => handleCheckboxChange(coupon)}
                          className="mr-2"
                        />
                        <h5 className="text-md text-left font-semibold mx-5">
                          {coupon.promoCode}
                        </h5>
                      </div>
                      <h5 className="text-xs text-left mx-9">
                        {coupon.description}
                      </h5>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amount Section */}
              <div>
                <div className="w-full md:w-[80%]">
                  <div className="my-6 text-left text-lg">Amount Payable</div>

                  <div className="flex flex-row w-full">
                    <div className="w-full sm:w-3/5 text-left ">
                      <div className="my-3 text-md">MRP Total:</div>
                      <div className="my-3 text-md">Additional Discount:</div>
                      <div className="my-3 text-md">Total Amount:</div>
                      <div className="my-3 text-md">
                        Shipping/Delivery Charges:
                      </div>
                      <div className="my-3 text-md">Total Payable:</div>
                      <div className="my-3 text-cyan-400 text-md">
                        Total Savings:
                      </div>
                      <div className="my-3 text-md">Total Payable:</div>
                    </div>
                    <div className="w-full sm:w-2/5 ">
                      <div className="my-3">
                        ₹ {medicineCart.originalCartPrice}
                      </div>
                      <div className="my-3">
                        ₹ {medicineCart.discountAmount}
                      </div>
                      <div className="my-3">
                        ₹ {medicineCart.discountedCartPrice}
                      </div>
                      <div className="my-3">₹ 0</div>
                      <div className="my-3">
                        ₹ {medicineCart.discountedCartPrice}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full md:w-[90%] py-2 text-lg bg-cyan-400 my-5 mr-11"
                    onClick={() => {
                      checkAvailability(cartItems);
                    }}
                  >
                    Proceed
                  </button>

                  <p className="text-gray-500 text-sm text-left w-full md:w-[94%]">
                    Allmeds is a technology platform to facilitate transaction
                    of business. The products and services are offered for sale
                    by the sellers. The user authorizes the delivery personnel
                    to be his agent for delivery of the goods. For details read{" "}
                    <a href="#" className="text-sky-400">
                      Terms & Conditions
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex justify-center mx-auto h-56 w-96 border"
            onClick={() => navigate("/")}
          >
            <div className="mx-10 text-left">
              <h1 className="text-left">Hey, it feels so light!</h1>
              <h4>There is nothing in your cart. Let's add some items.</h4>
            </div>
          </div>
        )}
        {currentStep === 1 && <div>Address Step</div>}
        {currentStep === 2 && <div>Payment Step</div>}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default CartProducts;
