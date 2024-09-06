import React, { useState } from "react";

const ApplyPromocode = () => {
  const [pincode, setPincode] = useState("");

  const handleApplyClick = () => {
    // Handle the apply button click event here
    console.log("Pincode applied:", pincode);
  };

  const coupons = [
    {
      id: 1,
      title: "NMSNEW",
      description:
        "Flat 25% Off on your 1st netmeds order +25% cashback. Minimum order value is Rs 1245",
    },
    {
      id: 2,
      title: "SAVE20",
      description:
        "Get 20% off on all orders above Rs 1000. Use code SAVE20 at checkout.",
    },
    {
      id: 3,
      title: "FREESHIP",
      description: "Free shipping on orders over Rs 500. No code required.",
    },
    {
      id: 4,
      title: "CASHBACK50",
      description:
        "Get 50% cashback on your first order up to Rs 500. Use code CASHBACK50.",
    },
  ];

  return (
    <>
      <div className="text-left">Apply Promo Codes/NMS Supercash</div>

      <div className="text-left text-blue-400">Promocode</div>

      <div className="flex relative w-[80%] my-5">
        <label
          htmlFor="first_name"
          className="block mt-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Promo code"
          required
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <button
          type="button"
          className="ml-2 px-4 py-2 text-blue-400 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleApplyClick}
        >
          Apply
        </button>
      </div>

      {/* <div>
        <div className="bg-white p-4 border-2 border-slate-900 border-dashed rounded-lg my-5 w-[80%]">
          <div class="flex items-center rounded dark:border-gray-700">
            <input
              id="bordered-radio-1"
              type="radio"
              value=""
              name="bordered-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
             <h5 className="text-md text-left font-semibold mx-5">NMSNEW</h5>
          </div>
          <h5 className="text-xs text-left mx-9">Flat 25% Off on your 1st netmeds order +25% cashback. Minimum order value is Rs 1245</h5>
         
          
        </div>
        

        <div className="flex bg-white p-4 border-2 border-slate-400 border-dashed rounded-lg my-5 w-[70%]">
        <div class="flex items-center rounded dark:border-gray-700">
            <input
              id="bordered-radio-1"
              type="radio"
              value=""
              name="bordered-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <h5 className="text-md text-left font-semibold mx-2">hii</h5>
        </div>

        <div className="flex bg-white p-4 border-2 border-slate-400 border-dashed rounded-lg my-5 w-[70%]">
        <div class="flex items-center rounded dark:border-gray-700">
            <input
              id="bordered-radio-1"
              type="radio"
              value=""
              name="bordered-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <h5 className="text-md text-left font-semibold mx-2">hii</h5>
        </div>

        <div className="flex bg-white p-4 border-2 border-slate-400 border-dashed rounded-lg my-5 w-[70%]">
        <div class="flex items-center rounded dark:border-gray-700">
            <input
              id="bordered-radio-1"
              type="radio"
              value=""
              name="bordered-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <h5 className="text-md text-left font-semibold mx-2">hii</h5> 
        </div>
      </div> */}

      <div>
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white p-4 border-2 border-slate-900 border-dashed rounded-lg my-5 w-[80%]"
          >
            <div className="flex items-center rounded dark:border-gray-700">
              <input
                id={`bordered-radio-${coupon.id}`}
                type="radio"
                value=""
                name="bordered-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <h5 className="text-md text-left font-semibold mx-5">
                {coupon.title}
              </h5>
            </div>
            <h5 className="text-xs text-left mx-9">{coupon.description}</h5>
          </div>
        ))}
      </div>
    </>
  );
};

export default ApplyPromocode;
