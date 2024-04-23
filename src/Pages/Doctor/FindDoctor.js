import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import {
  MapPinIcon,
  PencilIcon,
  StopCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import specialityService from "../../Service/DoctorService/Speciality";
import Location from "../../Service/DoctorService/Location";
import Breadcrumbs from "../../Layout/Bredcrumbs";
import { doctorSearchByCity } from "./BreadCrumbsLinks";

export default function FindDoctor() {
  const [location, setLocation] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [selectedspeciality, setselectedSpeciality] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    specialityService
      .getAllSpeciality()
      .then((response) => {
        console.log(response.data);
        setSpeciality(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setLocation(value);

    // Call API to get suggestions based on the input value
    try {
      Location.getSuggestions(e.target.value)
        .then((response) => {
          // console.log(response.data);
          const cities = response.data.features
            .map((feature) => feature.properties.city)
            .filter(Boolean);
          console.log(cities);
          if (cities.length > 0 && response.status == 200) {
            setSuggestions(cities);
          }
        })
        .catch((error) => {
          console.log(error);
          setSuggestions([]);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSuggestionClick = (selectedLocation) => {
    setLocation(selectedLocation);
    setSuggestions([]);
  };

  const handleSpecialityChange = (spl) => {
    console.log(spl);
    setselectedSpeciality(spl);
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <div className="md:container md:mx-auto md:w-5/6  mt-8">
        <Breadcrumbs link={doctorSearchByCity} />
      </div>
      <div className="md:container md:mx-auto md:w-5/6 mt-5  grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="shadow-md md:col-span-8 p-4">
          <div className="font-bold text-slate-600 text-xl">Find Doctors</div>
          <div className="grid grid-cols-8 gap-4 mt-5">
            <div className="relative flex items-center border-b-2 border-blue-500 col-span-2">
              <div className="w-5 h-5 mr-2 text-blue-500 ">
                <MapPinIcon className="h-5 w-5" />
              </div>
              <div className="flex-grow relative h-11 w-full min-w-[200px] ">
                <input
                  placeholder="Search"
                  value={location}
                  onChange={handleChange}
                  className="peer h-full w-full bg-transparent pt-4 pb-4 font-sans  font-bold text-blue-gray-700 text-lg outline-none transition-all border-b-2 border-transparent focus:border-gray-500 disabled:border-0 disabled:bg-blue-gray-50"
                />
              </div>

              <div className="absolute top-full left-0 w-full z-10 mt-5">
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 border-b-2 border-blue-50"
                    onClick={() => handleSuggestionClick(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex items-center border-b-2 border-blue-500 col-span-6 ">
              <div className="w-5 h-5 mr-2 text-blue-500 ">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </div>
              <div className="flex-grow relative h-11 w-full min-w-[200px] ">
                <input
                  placeholder="Search for specialty"
                  className="peer h-full w-full bg-transparent pt-4 pb-4 font-sans font-bold text-blue-gray-700 text-lg outline-none transition-all border-b-2 border-transparent focus:border-gray-500 disabled:border-0 disabled:bg-blue-gray-50"
                  style={{
                    "::placeholder": {
                      fontSize: "13px",
                      color: "#A1A1AA",
                    },
                  }}
                  onClick={toggleDropdown}
                  onChange={(e) => setselectedSpeciality(e.target.value)}
                  value={selectedspeciality}
                />
              </div>
              <div className="absolute top-full left-0 w-full z-10 mt-5">
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    id="dropdown"
                    className="fixed z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-1/4 dark:bg-gray-700 max-h-40 overflow-y-auto"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="Search"
                    >
                      {speciality.map((item) => (
                        <li key={item.id}>
                          <a
                            className="block px-4 py-2 border-b-2 border-blue-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => {
                              handleSpecialityChange(item.specialityName);
                            }}
                          >
                            {item.specialityName}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3 mb-3 font-bold text-sm">Top Cities</div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center text-sm w-full text-blue-400 ">
            <div
              className="border-2  border-slate-200 hover:bg-blue-200 hover:text-black hover:cursor-pointer"
              onClick={(e) => setLocation("New Delhi")}
            >
              New Delhi
            </div>
            <div
              className="border-2  border-slate-200 hover:bg-blue-200 hover:text-black hover:cursor-pointer"
              onClick={(e) => setLocation("Mumbai")}
            >
              Mumbai
            </div>
            <div
              className="border-2  border-slate-200 hover:bg-blue-200 hover:text-black hover:cursor-pointer"
              onClick={(e) => setLocation("Chennai")}
            >
              Chennai
            </div>
            <div
              className="border-2  border-slate-200 hover:bg-blue-200 hover:text-black hover:cursor-pointer"
              onClick={(e) => setLocation("Bengaluru")}
            >
              Bengaluru
            </div>
            <div
              className="border-2  border-slate-200 hover:bg-blue-200 hover:text-black hover:cursor-pointer"
              onClick={(e) => setLocation("Kolkata")}
            >
              Kolkata
            </div>
            <div
              className="border-2  border-slate-200 hover:bg-blue-200 hover:text-black hover:cursor-pointer"
              onClick={(e) => setLocation("Hyderabad")}
            >
              Hyderabad
            </div>
            <div
              className="border-2  border-slate-200 hover:bg-blue-200 hover:text-black hover:cursor-pointer"
              onClick={(e) => setLocation("Pune")}
            >
              Pune
            </div>
          </div>
        </div>
        {/* <div className="shadow-md md:col-span-4 p-4">
        <p class="text-center">Consult a Doctor in Following Steps</p>

        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-5 mx-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <p class="mt-5">Search Doctor</p>
        </div>

        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-5 mx-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <p class="mt-5">Choose the doctor</p>
        </div>

        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-5 mx-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>

          <p class="mt-5">Book a Slot</p>
        </div>

        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-5 mx-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <p class="mt-5">Make Payment</p>
        </div>

        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-5 mx-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
            />
          </svg>

          <p class="mt-5">Consult Online during selected slot</p>
        </div>
      </div> */}
      </div>
    </>
  );
}
