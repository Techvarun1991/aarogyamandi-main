import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { FaEdit, FaTrash, FaMapMarkerAlt } from "react-icons/fa";
import PriceSection from "./PriceSection";
import AddressService from "../../Service/PatientService/AddressService";
import axios from "axios";
import App from "../../App";
import { createRoot } from "react-dom/client";
import OrderStepper from "../Cart/OrderStepper";
import { useLocation, useNavigate } from "react-router-dom";
import Amount from "../Cart/Amount";
import MedicineCartService from "../../Service/MedicineCart/MedicineCart";

const Deliveryaddre = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const medicineCart = location.state || {};
  console.log("Delivery", medicineCart);
  const root = createRoot(document.getElementById('root'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const revGeoCode = useRef({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState();
  const [selectedAddress, setSelectedAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    personName: "",
    lattitude: 0.0,
    longitude: 0.0,
    default: false,
    home: true
  });
  const [addresses, setAddresses] = useState([

  ]);
  useEffect(() => {
    const profileId = localStorage.getItem("profileId")
    AddressService.getAllProfiles(profileId).then((response) => {
      console.log(response.data, "----------");
      setAddresses(response.data);
    })
  }, [])

  const [newAddress, setNewAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    personName: "",
    lattitude: 0.0,
    longitude: 0.0,
    default: false,
    home: true
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = () => {
    console.log(newAddress, '------------new address------------');

    const profileId = localStorage.getItem('profileId');
    // const jsonAddress = JSON.stringify(newAddress);
    AddressService.addAddress(profileId, newAddress, isUpdate).then((response) => {
      console.log(response.data);
      if (response.status === 201) {
        setTimeout(() => {
          root.render(<App />);
        }, 1000);
        toast.success("Address added successfully");
      }
    })
    setIsModalOpen(false); // Close modal after adding
  };

  // Open delete confirmation modal
  const openDeleteModal = (index, address) => {
    setSelectedAddressIndex(index);
    setSelectedAddress(address);
    setIsDeleteModalOpen(true);
  };

  // open edit modal
  const openEditModal = (index, address) => {
    setSelectedAddressIndex(index);
    setIsUpdate(true);
    setIsModalOpen(true);

    setNewAddress({
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      personName: address.personName,
      lattitude: address.latitude,
      longitude: address.longitude,
      default: address.default,
      home: address.home
    });

    console.log(index);
  };

  // Confirm delete address
  const handleDeleteAddress = (addressId) => {
    console.log("Deleting address with ID:", addressId);
    setAddresses((prev) =>
      prev.filter((_, index) => index !== selectedAddressIndex)
    );
    AddressService.deleteAddress(addressId.id).then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        setTimeout(() => {
          root.render(<App />);
        }, 2000);
        toast.success("Address deleted successfully");

      }
    });
    setIsDeleteModalOpen(false); // Close delete modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  // Save pincode to local storage when an address is selected
  const handleAddressSelect = (index, address) => {
    console.log("Selected address:", address.id);
    setSelectedAddressId(address.id);
  };

  const detectlocation = () => {
    console.log("Getting location");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const payload = {
            latitude,
            longitude,
          };
          try {
            const response = await axios.post(
              `http://192.168.1.214:8080/map/api/revGeoCode`,
              payload
            );
            revGeoCode.current = response.data;
            localStorage.setItem(
              "revGeoCodeCurrent",
              JSON.stringify(response.data)
            );

            setNewAddress({
              city: response.data.city || "",
              pincode: response.data.postcode || "",
              state: response.data.state || "",
            });
            console.log("RevGeoCode", revGeoCode.current);
          } catch (error) {
            console.error("Error getting user's location:", error);
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    }

  }

  const handleConfirmOrder = async (paymentId) => {
    // setIsOrderProcessing(true);
   
    

    navigate('/payment', { state: { medicineCart, selectedAddressId } });


  };


  return (
    <div>
      <OrderStepper currentStep={1} />
      <div className="flex h-screen justify-center pl-12">

        {/* Left Side - Green */}
        <div className="w-1/2 ">
          <p className="text-black font-bold text-left mx-10 my-10">
            DELIVERY ADDRESS
          </p>

          <div className="space-y-6">
            {addresses.map((address, index) => (
              <div key={index} className="flex items-start mx-10 mb-4">
                {/* Radio Button */}
                <input
                  id={`radio-${index}`}
                  type="radio"
                  value={index}
                  name="address-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 mt-2"
                  onChange={() => handleAddressSelect(index, address)}
                />

                {/* Address Details */}
                <div className="text-left mx-4">
                  <p className="text-2xl">{address.personName}</p>
                  <p className="text-lg">{address.addressLine1}</p>
                  <p>{address.addressLine2}</p>
                  <p>
                    {address.city}, {address.zipCode}, {address.state}
                  </p>
                  <p>{address.mobile}</p>
                  <p className="text-rose-400">{address.addressType}</p>
                </div>

                <div className="right flex space-x-4 ml-auto mx-20">
                  <FaEdit
                    className="text-black cursor-pointer"
                    onClick={() => openEditModal(index, address)}
                  />
                  <FaTrash
                    className="text-black cursor-pointer"
                    onClick={() => openDeleteModal(index, address)}
                  />
                </div>
              </div>
            ))}
          </div>
          <p
            className="text-cyan-400 text-left text-lg mx-10 my-5 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            + Add New Address
          </p>
        </div>

        {/* Right Side - Blue */}
        <div className="w-1/2">
          {/* <PriceSection medicinePrice={medicineCart}/> */}
          <Amount medicineCart={medicineCart} />
        </div>

        {/* Modal for adding new address */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-2/5 max-h-[100vh] overflow-y-auto">
              <div className="flex">
                <h2 className="text-lg text-left font-bold mb-4 mx-5 my-5">
                  Add New Address
                </h2>
                <button
                  type="button"
                  class="text-black-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-black-600 dark:hover:text-white my-4"
                  data-modal-toggle="crud-modal"
                  onClick={handleModalClose}
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              {/* Detect my location */}
              <div className="flex items-center mb-4 cursor-pointer mx-5">
                <FaMapMarkerAlt className="text-cyan-400 " />
                <p className="text-cyan-400 font-bold ml-2" onClick={detectlocation}>Detect my location</p>
              </div>

              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-cyan-400 text-left my-1 mx-5"
                  >
                    Name
                  </label>
                  <input
                    id="personName"
                    type="text"
                    name="personName"
                    placeholder="Enter your Name"
                    className="flex w-3/4 p-2 border border-gray-300 rounded mt-1 placeholder-gray-500 mx-5"
                    value={newAddress.personName || selectedAddress.personName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="addressLine1"
                    className="block text-sm font-medium text-cyan-400 text-left my-1 mx-5"
                  >
                    Address line 1
                  </label>
                  <input
                    id="addressLine1"
                    type="text"
                    name="addressLine1"
                    placeholder="Enter Address Line 1"
                    className="flex w-3/4 p-2 border border-gray-300 rounded mt-1 placeholder-gray-500 mx-5"
                    value={newAddress.addressLine1 || selectedAddress.addressLine1}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="addressLine2"
                    className="block text-sm font-medium text-cyan-400 text-left my-1 mx-5"
                  >
                    Address line 2
                  </label>
                  <input
                    id="addressLine2"
                    type="text"
                    name="addressLine2"
                    placeholder="Enter address line 2"
                    className="flex w-3/4 p-2 border border-gray-300 rounded mt-1 placeholder-gray-500 mx-5"
                    value={newAddress.addressLine2 || selectedAddress.addressLine2}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Two Fields in a Row */}
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-cyan-400 text-left my-1 mx-5"
                    >
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      placeholder="Enter Your City"
                      className="flex w-4/5 p-2 border border-gray-300 rounded mt-1 placeholder-gray-500 mx-5"
                      value={newAddress.city}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-cyan-400 text-left my-1 mx-5"
                    >
                      State
                    </label>
                    <input
                      id="state"
                      type="text"
                      name="state"
                      placeholder="Enter Your State"
                      className="flex w-4/5 p-2 border border-gray-300 rounded mt-1 placeholder-gray-500 mx-5"
                      value={newAddress.state}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label
                      htmlFor="zipcode"
                      className="block text-sm font-medium text-cyan-400 text-left my-1 mx-5"
                    >
                      Pin code
                    </label>
                    <input
                      id="zipCode"
                      type="text"
                      name="zipCode"
                      placeholder="Enter Landmark"
                      className="flex w-4/5 p-2 border border-gray-300 rounded mt-1 placeholder-gray-500 mx-5"
                      value={newAddress.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>


                </div>



                <div className="mx-5">
                  <label
                    htmlFor="addressType"
                    className="block text-sm font-medium text-cyan-400 text-left mb-2"
                  >
                    Save Address As
                  </label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      className={`w-1/5 p-2 border rounded ${newAddress.home
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                      onClick={() =>
                        setNewAddress((prev) => ({
                          ...prev,
                          home: true,
                          addressType: "Home", // Set addressType to "Home"
                        }))
                      }
                    >
                      Home
                    </button>
                    <button
                      type="button"
                      className={`w-1/5 p-2 border rounded ${!newAddress.home
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                      onClick={() =>
                        setNewAddress((prev) => ({
                          ...prev,
                          home: false,
                          addressType: "Office", // Set addressType to "Office"
                        }))
                      }
                    >
                      Office
                    </button>
                  </div>

                </div>

                <div className=" mt-4">
                  <button
                    type="button"
                    className="w-4/5 bg-cyan-500 text-white py-2 px-4 rounded"
                    onClick={handleAddAddress}
                  >
                    Add Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
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
        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-1/4">
              <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-4">
                Are you sure you want to delete this address?
              </p>
              <div className="flex justify-between">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded"
                  onClick={() => handleDeleteAddress(selectedAddress)}
                >
                  Delete Address
                </button>
                <button
                  className="bg-gray-300 text-black py-2 px-4 rounded"
                  onClick={handleDeleteModalClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <button type="button" className=" w-[90%] py-2 text-lg bg-sky-200" onClick={() => handleConfirmOrder()}>
        Proceed
      </button>
    </div>

  );
};

export default Deliveryaddre;
