import { Menu } from "@headlessui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideOverMenu from "../SideBar/SideOverMenu";
import LocationFlyoutMenu from "./LocationFlyoutMenu";
import Carosole from "./Carousel";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setOpen(!open);
  };
  const handleCartNavigate = () => {
    navigate("/cart");
  };

  return (
    <>
      {" "}
      <header className="bg-gradient-to-b from-cyan-300 to-cyan-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* <div className="text-2xl font-bold text-teal-600"> */}
            <img
              className="hidden lg:block h-20 w-48" // Adjusted height here
              src="https://192.168.1.206:30002/api/documentation/doctor-documents/65e0447d27be100030e4cbf3/download"
              alt="Your Company"
            />
            {/* </div> */}
          </div>
          <div className="hidden md:flex items-center flex-grow justify-center">
            <div className="text-gray-900">
              Say Goodbye To High Medicine Prices
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="absolute inset-y-0 right-0 flex gap-x-2 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                onClick={handleCartNavigate}
                className="relative rounded-full p-1 text-black-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </button>
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button
                    onClick={toggleMenu}
                    className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-grey focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </Menu.Button>
                </div>
                <SideOverMenu open={open} setOpen={setOpen} />
              </Menu>
            </div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto  flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <div className="col-span-2 py-2 bg-white rounded-md">
            {" "}
            <LocationFlyoutMenu></LocationFlyoutMenu>
          </div>
          <div className="flex-grow flex items-center border border-gray-300 rounded overflow-hidden">
            <input
              type="text"
              className="p-2 flex-grow outline-none"
              placeholder="Search for medicine and wellness products..."
            />
            <button className="bg-teal-500 text-white p-2">Search</button>
          </div>
        </div>
        <nav className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-16 text-[#33BBC5]">
          <a href="/doctor/bycity" className="hover:underline font-bold">
            Visit Clinic
          </a>
          <a href="#" className="hover:underline font-bold">
            Video Consultation
          </a>
          <a href="/Medicine" className="hover:underline font-bold">
            Medicines
          </a>
          <a href="#" className="hover:underline font-bold">
            Labs
          </a>
        </nav>
      </header>{" "}
    </>
  );
}
