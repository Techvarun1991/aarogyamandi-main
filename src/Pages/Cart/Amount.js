import React from "react";

const Amount = ({medicineCart}) => {
  return (
    <>
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
            <div className="my-1">₹ {medicineCart.medicineCart.originalCartPrice}</div>
            <div className="my-1">₹ {medicineCart.medicineCart.discountAmount}</div>
            <div className="my-1">₹ {medicineCart.medicineCart.discountedCartPrice}</div>
            <div className="my-1">₹ 0</div>
            <div className="my-1">₹ {medicineCart.medicineCart.discountedCartPrice}</div>
          </div>
        </div>
      </div>

     
      </div>
    </>
  );
};

export default Amount;
