import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import SideOverMenu from "../SideBar/SideOverMenu";
import { useState } from "react";
import LocationFlyoutMenu from "./LocationFlyoutMenu";
import { useMediaQuery } from "react-responsive";

const navigation = [
  { name: "Find Doctors", href: "#", current: false },
  { name: "Video Consultation", href: "#", current: false },
  { name: "Buy Medicines", href: "/Medicine", current: true },
  { name: "Lab Tests", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  // Function to toggle the visibility of the SideOverMenu
  const toggleMenu = () => {
    setOpen(!open);
  };
  const handleCartNavigate = ()=>{
     navigate("/Medicine/Cart")
  }
  
  

  return (
    <>
      <Disclosure as="nav" className="bg-white-800 border-b-2">
        <div className="mx-auto max-w-[90rem] px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="sm:items-stretch sm:justify-start">
              <div className="flex space-x-8 flex-shrink-0 items-center">
                
                {isMobile ? null : (
                  <img
                    className="hidden lg:block h-16 w-42"
                    src="https://192.168.1.206:30002/api/documentation/doctor-documents/65e0447d27be100030e4cbf3/download"
                    alt="Your Company"
                  />
                )}
                <LocationFlyoutMenu></LocationFlyoutMenu>
              </div>
            </div>
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

        <Disclosure.Panel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel>
      </Disclosure>
      <Disclosure as="nav" className="bg-white rounded-none border-b-2">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-12  items-center justify-center">
            <div className="flex gap-x-8 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-8 gap-x-16">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "text-teal-700 border-b-2 border-b-green-950 rounded-none text-lg font-bold"
                          : "text-black hover:border-b-2 border-b-green-950 rounded-none hover:text-teal-800  text-lg font-bold",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </>
  );
}
