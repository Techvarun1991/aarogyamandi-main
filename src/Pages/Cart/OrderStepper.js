import React from "react";
import { useNavigate } from "react-router-dom";
import Deliveryaddre from "../DeliveryAddress/Deliveryaddre";
import Payment from "../Orders/Payment";

const OrderStepper = ({ currentStep }) => {
  const steps = ["Bag", "Address", "Payment"];
  const navigate = useNavigate();

 

  return (
    <div className="my-6 w-fit mx-auto">
      <ol className="flex justify-between">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`flex w-full items-center ${
              index <= currentStep
                ? "text-blue-600 dark:text-blue-500"
                : "text-gray-400 dark:text-gray-500"
            } ${
              index < steps.length - 1
                ? "after:content-[''] after:w-24 after:h-1 after:border-b-2 after:border-red-400 after:border-dashed after:inline-block"
                : ""
            } ${
              index <= currentStep
                ? "dark:after:border-blue-800"
                : "dark:after:border-gray-700"
            }`}
          
            style={{ cursor: "pointer" }}
          >
            <span
              className={`flex rounded-xl font-mono text-xl font-extrabold items-center justify-center lg:py-4 lg:px-8 shrink-0 ${
                index === currentStep
                  ? "bg-blue-500  text-white dark:bg-blue-800 "
                  : "dark:bg-gray-700"
              }`}
            >
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default OrderStepper;
