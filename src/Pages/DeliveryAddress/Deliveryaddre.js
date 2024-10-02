import React, { useState } from "react";
import { FaEdit, FaTrash, FaMapMarkerAlt } from "react-icons/fa";
import PriceSection from "./PriceSection";

const Deliveryaddre = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState({
    name: "",
    house: "",
    city: "",
    pincode: "",
    state: "",
    mobile: "",
    addressType: "Home Address",
  });
  const [addresses, setAddresses] = useState([
    {
      name: "John Doe",
      house: "123, Elm Street",
      city: "New York",
      pincode: "10001",
      state: "NY",
      mobile: "+1 234 567 8901",
      addressType: "Home Address",
    },
    {
      name: "Jane Smith",
      house: "456, Maple Avenue",
      city: "Los Angeles",
      pincode: "90001",
      state: "CA",
      mobile: "+1 987 654 3210",
      addressType: "Office Address",
    },
    {
      name: "Michael Johnson",
      house: "789, Pine Road",
      city: "Chicago",
      pincode: "60601",
      state: "IL",
      mobile: "+1 555 123 4567",
      addressType: "Home Address",
    },
  ]);
  console.log(selectedAddress);
  const [newAddress, setNewAddress] = useState({
    name: "",
    house: "",
    city: "",
    pincode: "",
    state: "",
    mobile: "",
    addressType: "Home Address",
  });
  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Add new address to list
  const handleAddAddress = () => {
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddress({
      name: "",
      house: "",
      city: "",
      pincode: "",
      state: "",
      mobile: "",
      addressType: "Home Address",
    });
    setIsModalOpen(false); // Close modal after adding
  };

  // Open delete confirmation modal
  const openDeleteModal = (index) => {
    setSelectedAddressIndex(index);
    setIsDeleteModalOpen(true);
  };

  // open edit modal
  const openEditModal = (index, address) => {
    setSelectedAddressIndex(index);
    setIsModalOpen(true);

    // Set the new address with the selected address values
    setNewAddress({
      name: address.name || "",
      house: address.house || "",
      city: address.city || "",
      pincode: address.pincode || "",
      state: address.state || "",
      mobile: address.mobile || "",
      addressType: address.addressType || "Home Address",
    });

    console.log(index);
  };

  // Confirm delete address
  const handleDeleteAddress = () => {
    setAddresses((prev) =>
      prev.filter((_, index) => index !== selectedAddressIndex)
    );
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
    console.log("Selected address:", address);
    const selectedAddress = addresses[index];
    setSelectedAddressIndex(index);
    localStorage.setItem("selectedPincode", selectedAddress.pincode); // Save pincode to local storage
  };

  const detectlocation = () =>{
    
  }

  return (
    <div className="flex h-screen">
      {/* Left Side - Green */}
      <div className="w-1/2">
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
                <p className="text-lg">{address.name}</p>
                <p>{address.house}</p>
                <p>
                  {address.city}, {address.pincode}, {address.state}
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
                  onClick={() => openDeleteModal(index)}
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
        <PriceSection />
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
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your Name"
                  className="flex w-3/4 p-2 border border-gray-300 rounded mt-1 placeholder-gray-500 mx-5"
                  value={newAddress.name || selectedAddress.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-cyan-400 text-left my-1 mx-5"
                >
                  Address
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter Your Address"
                  className="flex w-3/4 p-2 border border-gray-300 rounded mt-1 placeholder-gray-500 mx-5"
                  // value={newAddress.name}
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
                    htmlFor="state"
                    className="block text-sm font-medium text-cyan-400 text-left my-1 mx-5"
                  >
                    Landmark
                  </label>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    placeholder="Enter Landmark"
                    className="flex w-4/5 p-2 border border-gray-300 rounded mt-1 placeholder-gray-500 mx-5"
                    value={newAddress.state}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium text-cyan-400 text-left my-1 mx-5"
                  >
                    PIN code
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    name="pincode"
                    placeholder="Enter pincode"
                    className="flex w-4/5 p-2 border border-gray-300 rounded mt-1 placeholder-gray-500 mx-5"
                    value={newAddress.pincode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-cyan-400 text-left my-1 mx-5"
                >
                  Mobile No.
                </label>
                <input
                  id="mobile"
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  className="flex w-3/4 p-2 border border-gray-300 rounded mt-1 placeholder-gray-500 mx-5"
                  value={newAddress.mobile}
                  onChange={handleInputChange}
                />
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
                    className={`w-1/5 p-2 border rounded ${
                      newAddress.addressType === "Home"
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() =>
                      setNewAddress((prev) => ({
                        ...prev,
                        addressType: "Home",
                      }))
                    }
                  >
                    Home
                  </button>
                  <button
                    type="button"
                    className={`w-1/5 p-2 border rounded ${
                      newAddress.addressType === "Office"
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() =>
                      setNewAddress((prev) => ({
                        ...prev,
                        addressType: "Office",
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
                onClick={handleDeleteAddress}
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
  );
};

export default Deliveryaddre;
