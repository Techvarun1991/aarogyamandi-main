import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const InputWithValidation = () => {
  const [pincode, setPincode] = useState("");
  const [isPincodeValid, setIsPincodeValid] = useState(null); // null means no validation yet
  const [showMessage, setShowMessage] = useState(false);

  const validPincodes = ["12345", "23456", "34567", "45678", "56789"];

  const handleCheckPincode = () => {
    if (validPincodes.includes(pincode)) {
      setIsPincodeValid(true);
    } else {
      setIsPincodeValid(false);
    }
    setShowMessage(true);
  };

  return (
    <div className="sm:flex-row">
      <p className="text-left text-gray-300 text-md sm:text-md">Delivery Options</p>
      <div className="relative w-full sm:w-3/5 mt-2 sm:mt-0">
        <div className="relative">
          <label
            htmlFor="first_name"
            className="block mt-2 text-sm font-medium text-gray-900 dark:text-white"
          ></label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter pincode"
            required
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
              setShowMessage(false);
            }}
          />
          <button
            type="button"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 px-4 text-pink-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleCheckPincode}
          >
            Check
          </button>
          {showMessage && (
            <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
              {isPincodeValid ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaTimesCircle className="text-red-500" />
              )}
            </div>
          )}
        </div>
      </div>
      {showMessage && (
        <div className="text-left text-gray-400 text-sm sm:text-sm my-2">
          {isPincodeValid ? (
            <ul>
              <li>Delivery available within 3-5 days</li>
              <li>Pay on delivery available</li>
              <li>Easy returns within 30 days</li>
            </ul>
          ) : (
            <p>Not deliverable to your address</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InputWithValidation;
