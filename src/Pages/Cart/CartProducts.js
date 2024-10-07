import React, { useEffect, useRef, useState } from "react";
import ApplyPromocode from "./ApplyPromocode";
import Amount from "./Amount";
import OrderStepper from "./OrderStepper";
import MedicineCartService from "../../Service/MedicineCart/MedicineCart";
import { createRoot } from "react-dom/client";
import App from "../../App";
import { toast,ToastContainer } from "react-toastify";
import BASE_REST_API_URL from "../../Service/BaseUrl";
import MedicineOrderService from "../../Service/MedicineOrder/MedicineOrder";
import { Navigate, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'; // Ensure you import the CSS for proper styling

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
    console.log("----------------------",cartData);
    try {
      // Check if cartData is an array
      if (!Array.isArray(cartData)) {
        throw new Error('cartData is not an array.');
      }
 
      const payload = {};
 
      // Iterate over cartData to construct the payload
      cartData.forEach((item, index) => {
        const pharmaStockId = item.pharmaStockId;
        const quantity = item.quantity;
        // Add pharmaStockId and quantity to the payload
        payload[pharmaStockId] = quantity;
      });
 
      // Call the service with the constructed payload
      const checkedMed = await MedicineOrderService.checkMedicineAvailabilty(payload);
      setCheckMedicine(checkedMed);
 
      // Check if all products are available
      if (checkedMed.allProductsAvailable) {
        // Call handlePlaceOrder if all products are available
        // handlePlaceOrder();
        navigate('/address', {state: {medicineCart}});
      }
    } catch (error) {
      console.error('Error fetching medicine availability', error);
    }
  };
  const root = createRoot(document.getElementById("root"));



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
                    key={card.cartItemId}
                    className={`w-full p-4 ${index > 2 ? "h-1/2" : "h-auto"} `}
                  >
                    <div className="bg-white p-4 border rounded-lg shadow flex">
                      <div className="flex-none">
                        <img
                          src="https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/h-c-4.5e130b77.png"
                          alt={card.medicineName}
                          className="w-24 h-32 rounded"
                        />
                      </div>
                      <div className="flex-grow pl-4">
                        <h5 className="text-md text-left">
                          {card.medicineName}
                        </h5>
                        {/* <p className="text-sm text-gray-500 text-left">
                        {card.content.length > 60
                          ? `${card.content.substring(0, 60)}...`
                          : card.content}
                      </p> */}
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

                        <h5 className="text-sm text-left text-slate-900">
                          {/* {card.Delivery} */}
                        </h5>
                        <div className="flex justify-start mt-2">
                          <button className="text-sm text-sky-400 w-auto">
                            Save for later
                          </button>
                          <button className="text-sm mx-10 text-sky-400 w-auto">
                            Move to WishList
                          </button>
                          {/* <button className="text-sm p-0.5 text-pink-400 w-auto ml-auto border-2 rounded-lg border-pink-400">
                          Qty {card.quantity}
                        </button> */}
                          <select
                            className="text-sm p-0.5 text-pink-400 w-auto ml-auto border-2 rounded-lg border-pink-400"
                            value={card.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                e,
                                card.cartItemId,
                                card.pharmaStockId
                              )
                            } // handle the quantity change
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

            <div className="w-2/5 p-4">
              {/* <ApplyPromocode medicineCartData={medicineCart}/> */}
              <div>
                <div className="text-left">Apply Promo Codes/NMS Supercash</div>

                <div className="text-left text-blue-400">Promocode</div>

                <div className="flex relative w-[80%] my-5">
                  <label
                    htmlFor="promo_code"
                    className="block mt-2 text-sm font-medium text-gray-900 dark:text-white"
                  ></label>
                  <input
                    type="text"
                    id="promo_code"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                      className="bg-white p-4 border-2 border-slate-900 border-dashed rounded-lg my-5 w-[80%]"
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
              {/* <Amount cartData = {medicineCart}/> */}
              <div>
                <div className="w-[80%]">
                  <div className="mt-8 text-left text-lg">Amount Payable</div>

                  <div className="flex w-[90%]">
                    <div className="w-3/5 text-left ">
                      <div className="my-1">MRP Total:</div>
                      <div className="my-1">Additional Discount:</div>
                      <div className="my-1">Total Amount:</div>
                      <div className="my-1">Shipping/Delivery Charges:</div>
                      <div className="my-1">Total Payable:</div>
                    </div>
                    <div className="w-2/5 ">
                      <div className="my-1">
                        ₹ {medicineCart.originalCartPrice}
                      </div>
                      <div className="my-1">
                        ₹ {medicineCart.discountAmount}
                      </div>
                      <div className="my-1">
                        ₹ {medicineCart.discountedCartPrice}
                      </div>
                      <div className="my-1">₹ 0</div>
                      <div className="my-1">
                        ₹ {medicineCart.discountedCartPrice}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className=" w-[90%] py-2 text-lg bg-sky-200"
                  onClick={()=>{checkAvailability(cartItems)}}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mx-auto h-56 w-96 border"  onClick={() => navigate("/")}>
            <div className="mt-24">
              <h1>Hey, it feels so light!</h1>
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
