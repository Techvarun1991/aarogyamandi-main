import axios from "axios";
import {useState } from "react";
import App from "../../App";
import { createRoot } from "react-dom/client";

export default function UpdatePincodeForm({ onClose }) {
  const [pincode, setPincode] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handlePincodeSave = async() => {
    try {   
      const response = await axios.post(
        `http://192.168.1.6:8080/map/api/geoCode?address=${pincode}`,
       
      );
      localStorage.removeItem("revGeoCode"); 
    // Save merge to sessionStorage
    localStorage.setItem("revGeoCode",JSON.stringify(response.data));
    } catch (error) {
      console.error("Error calling API:", error);
      // Handle error
    }finally{
      
        const root = createRoot(document.getElementById('root'));
        root.render(<App />);
    }
    onClose();
  };
  

  const handlePincodeChange = (event) => {
    event.preventDefault();
    const inputPincode = event.target.value;
    setPincode(inputPincode);
    if (/^\d{6}$/.test(inputPincode)) {
      setPincode(inputPincode);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  return (
    <>
      <div className="h-full">
        <div className="pb-6">
          <span className="font-semibold">
            Enhancing Your Experience, One Input at a Time!
          </span>
        </div>
        <hr className="border-gray-300" />
        <div className="mb-4">
          <img
            src="http://192.168.1.6:8080/api/documentation/main-documents/662205cd766bbc78001564b0/download"
            className=""
            alt="Pincode"
          />
        </div>
        <span className="py-2">
          Please provide us your delivery location pincode for faster and
          seamless deliveries.
        </span>
        <div>
          <div className="mt-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Pincode
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                type="tel"
                name="price"
                id="price"
                value={pincode}
                onChange={handlePincodeChange}
                pattern="[0-9]{6}"
                className="block w-56 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="123456"
                required
              />
            </div>
            <span className="">* Enter your 6 digit pincode to proceed</span>
          </div>
          <hr className="border-gray-300 mt-2" />
          <div className="mt-2 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={handlePincodeSave}
              disabled={!isValid}
              className={`rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus:outline-none ${
                isValid
                  ? "bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500 focus:ring-offset-indigo-200"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
