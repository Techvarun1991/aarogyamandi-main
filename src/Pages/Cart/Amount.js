import React from "react";

const Amount = () => {
  return (
    <div className="w-[80%] flex">
      <div className="w-full"> 
      <div className="flex w-[90%] text-2xl mx-auto">Amount Payable</div>
      
      <div className="flex w-[90%] mx-auto my-2">
        <div className="w-3/5 text-left ">
          <div className="my-1">MRP Total:</div>
          <div className="my-1">Additional Discount:</div>
          <div className="my-1">Total Amount:</div>
          <div className="my-1">Shipping/Delivery Charges:</div>
          <div className="my-1">Total Payable:</div>
        </div>
        <div className="w-2/5 ">
          <div className="my-1">₹ 1000</div>
          <div className="my-1">₹ 100</div>
          <div className="my-1">₹ 900</div>
          <div className="my-1">₹ 50</div>
          <div className="my-1">₹ 950</div>
        </div>
      </div>

      <button type="button" className=" w-[90%] py-2 my-2 text-lg bg-sky-500">
        Proceed
      </button>
      </div>
      
    </div>
  );
};

export default Amount;
