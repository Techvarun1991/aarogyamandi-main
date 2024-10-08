import { Fragment, useEffect, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  MapPinIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Dialogs from "./Dialogs";
import { useNavigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "../../App";
import { useMediaQuery } from "react-responsive";
import BASE_REST_API_URL from "../../Service/BaseUrl";

const solutions = [
  {
    name: "Choose From Maps",
    icon: MapPinIcon,
  },
  {
    name: "Update Pincode",
    icon: ViewfinderCircleIcon,
  },
];

export default function LocationFlyoutMenu() {
  const revGeoCode = useRef({});
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const navigate = useNavigate();

  // Function to toggle the visibility of the SideOverMenu
  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleChooseFromMap = () => {
    navigate("/map");
  };

  useEffect(() => {
    const addString = localStorage.getItem("revGeoCode");
    if (addString) {
      const add = JSON.parse(addString);
      revGeoCode.current = add;
      setIsLoading(false);
    }
  }, []);

  const handleUseMyLocation = () => {
    localStorage.removeItem("revGeoCode");
    getCurrentLocation();
    const root = createRoot(document.getElementById("root"));
    root.render(<App />);
  };
  const getCurrentLocation = () => {
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
              `${BASE_REST_API_URL}/map/api/revGeoCode`,
              payload
            );
            revGeoCode.current = response.data;
            localStorage.setItem(
              "revGeoCodeCurrent",
              JSON.stringify(response.data)
            );
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
  };
  useEffect(() => {
    // Fetch user's location and set the location state
    const addString = localStorage.getItem("revGeoCode");
    if (!addString) {
      getCurrentLocation();
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-32 justify-center">
          <ClipLoader
          color={"#000000"}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
          
        />
        </div>
        
      ) : (
        <Popover className={`relative ${isMobile ? "ml-10" : "mx-1"}`}>
          <Popover.Button className="inline-flex focus:border-none border-white items-center gap-x-1 text-sm font-semibold text-gray-900 h-2">
            <div className="focus:border-none focus-within:border-none ">
              <div className="focus:border-none focus-within:border-none flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <div className="flex items-center">
                  <h1 className="mr-1">{revGeoCode.current.city}</h1>
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </div>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-96 bg-white rounded-lg -translate-x-1/2 px-4">
              <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  <div className="group relative flex mx-8 gap-x-6 rounded-lg bg-green-700 hover:bg-green-800 p-1 ">
                    <div className="my-2 flex h-4 w-8 flex-none items-center justify-center rounded-lg">
                      <MapPinIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex content-center">
                      <button
                        onClick={handleUseMyLocation}
                        className="font-semibold text-white text-center"
                      >
                        Use Current Location
                      </button>
                    </div>
                  </div>
                  <hr className="mt-2" />
                  {solutions.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-gray-50"
                    >
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex content-center">
                        {item.name === "Update Pincode" ? (
                          <button
                            onClick={toggleMenu}
                            className="font-semibold text-gray-900 text-center"
                          >
                            {item.name}
                          </button>
                        ) : (
                          <button
                            onClick={handleChooseFromMap}
                            className="font-semibold text-gray-900 text-center"
                          >
                            {item.name}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      )}
      <Dialogs open={open} setOpen={setOpen} />
    </>
  );
}
