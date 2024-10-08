import React from "react";


const Amount = () => {
  return (
    <>
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
          <div className="my-1">₹ 1000</div>
          <div className="my-1">₹ 100</div>
          <div className="my-1">₹ 900</div>
          <div className="my-1">₹ 50</div>
          <div className="my-1">₹ 950</div>
        </div>
      </div>
        <div className="w-2/5 ">
          <div className="my-1">₹ 1000</div>
          <div className="my-1">₹ 100</div>
          <div className="my-1">₹ 900</div>
          <div className="my-1">₹ 50</div>
          <div className="my-1">₹ 950</div>
        </div>
      </div>

      <button type="button" className=" w-[90%] py-2 text-lg bg-sky-200">
        Proceed
      </button>
    
    </>
  );
};

export default Amount;


