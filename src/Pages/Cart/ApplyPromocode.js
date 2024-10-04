import React, { useEffect, useState } from "react";
import MedicineCartService from "../../Service/MedicineCart/MedicineCart";
import { toast } from "react-toastify";
import BASE_REST_API_URL from "../../Service/BaseUrl";

const ApplyPromocode = ({ medicineCartData }) => {
  const [selectedPromocode, setSelectedPromocode] = useState(null);
  const [promocodeOptions, setPromoCodeOptions] = useState([]);
  const [medicineCart, setMedicineCart] = useState(medicineCartData);


  const handleApplyClick = async () => {
    try {
      if (!selectedPromocode) {
        toast.error('Please Select a Promo Code.');
        return;
      }
      const matchedPromoCode = promocodeOptions.find((option) => option.promoCode === selectedPromocode.promoCode);
      if (!matchedPromoCode) {
        toast.error(`Invalid or expired promo code: "${selectedPromocode.promoCode}"`);
        return;
      }
 
      const response = await fetch(
        `${BASE_REST_API_URL}/api/medicineCart/cart/${medicineCart.cartId}/promo/${matchedPromoCode.promocodeId}`,
        {
          method: 'GET',
        }
      );
 
      if (response.ok) {
        const data = await response.json();
        console.log("first Promo Code",data)
        setSelectedPromocode(matchedPromoCode);
        setMedicineCart(data.medicineCart);
 
        if (data.medicineCart.promocodeApplied === true && data.reason === '') {
          toast.success(`Promo code "${selectedPromocode.promoCode}" applied successfully!`);
        }
 
        if (data.reason) {
          // setReason(data.reason);
          toast.error(data.reason);
          // setSelectedPromoCode('');
        }
 
        if (data.applicableProductIds) {
          console.log("Applicable Product", data.applicableProductIds)
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
    if (selectedPromocode && selectedPromocode.promocodeId === promoCode.promocodeId) {
      setSelectedPromocode(null); // Deselect if already selected
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
            const medPromoCodes = await MedicineCartService.fetchMedicineOffers(item.pharmaId, item.medicineId);
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
        console.error('Error fetching promo codes:', error);
      }
    };
    fetchPromoCodeOptions();
  }, [medicineCart]);

  return (

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
          value={selectedPromocode ? selectedPromocode.promoCode : ''}
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
                checked={selectedPromocode && selectedPromocode.promocodeId === coupon.promocodeId}
                onChange={() => handleCheckboxChange(coupon)}
                className="mr-2"
              />
              <h5 className="text-md text-left font-semibold mx-5">
                {coupon.promoCode}
              </h5>
            </div>
            <h5 className="text-xs text-left mx-9">{coupon.description}</h5>
          </div>
        ))}
      </div>
      </div>

  );
};

export default ApplyPromocode;

