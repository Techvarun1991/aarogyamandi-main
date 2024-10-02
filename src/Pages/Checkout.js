import React, { useState } from "react";
import Deliveryaddre from "./DeliveryAddress/Deliveryaddre";
import Cart from "./Cart/Cart";

// Individual component for Bag
const Bag = () => {
  return <div>Bag Component</div>;
};

// Individual component for Address
const Address = () => {
  return <div>Address Component</div>;
};

// Individual component for Payment
const Payment = () => {
  return <div>Payment Component</div>;
};

const Checkout = () => {
  // State to keep track of the current step
  const [activeStep, setActiveStep] = useState("bag"); // default step

  return (
    <div>
      {/* Navigation Buttons */}
      <div>
        <button onClick={() => setActiveStep("bag")}>Bag</button>
        <button onClick={() => setActiveStep("address")}>Address</button>
        <button onClick={() => setActiveStep("payment")}>Payment</button>
      </div>

      {/* Conditionally render components based on activeStep */}
      <div>
        {activeStep === "bag" && <Cart />}
        {activeStep === "address" && <Deliveryaddre />}
        {activeStep === "payment" && <Payment />}
      </div>
    </div>
  );
};

export default Checkout;
