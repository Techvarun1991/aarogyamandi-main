// import React from "react";
// import Breadcrumbs from "./Bredcrumbs";
// import { doctorConsulatation } from "./BreadCrumbsLinks";

// export default function FindDoctorBySpecialityLocationAndCity() {
//     return (
//       <div className="flex justify-center mt-8 ml-2 sm:ml-4">
//         <div className="container mx-auto border-2 px-6 md:px-10 max-w-lg md:max-w-xl"> {/* Increased container size and adjusted padding */}
//           <Breadcrumbs link={doctorConsulatation} />
//         </div>
//       </div>
//     );
//   }

import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../../Layout/Bredcrumbs";
import { doctorConsulatation } from "./BreadCrumbsLinks";
import Location from "../../Service/DoctorService/Location";
import specialityService from "../../Service/DoctorService/Speciality";

export default function FindDoctorBySpecialityLocationAndCity() {
  const [location, setLocation] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [selectedspeciality, setselectedSpeciality] = useState();
  const [speciality, setSpeciality] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // setLocation({ latitude, longitude });

          const payload = {
            latitude,
            longitude,
          };

          try {
            const response = await Location.UseMyLocation(payload).then(
              (response) => {
                setLocation(response.data.city);
              }
            );
          } catch (error) {
            console.error("Error getting location:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
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
    // <div className="flex justify-center mt-8">

    <>
      <div className="md:container md:mx-auto md:w-5/6 mt-8">
        <Breadcrumbs link={doctorConsulatation} />
      </div>
      <div className="md:container md:mx-auto border-2 md:w-5/6 mt-5">
        <div className="max-w-3xl p-6 bg-white border border-red-200 rounded-lg shadow dark:bg-gray-800 ">
          <div className="pt-2 relative mx-auto text-gray-900 border-red-700">
            <div className="grid grid-cols-2 gap-10">
              <div>
                <form>
                  <label
                    htmlFor="search"
                    className="mb-2 text-lg font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="h-6 w-6 text-gray-900"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="search"
                      value={location}
                      onChange={handleChange}
                      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:border-transparent"
                      placeholder="Search"
                      required
                    />
                    <div
                      className="text-white absolute end-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
                      onClick={getLocation}
                    >
                      <svg
                        className="h-6 w-6  text-gray-900"
                        width="24"
                        height="32"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx="12" cy="12" r=".5" fill="currentColor" />
                        <circle cx="12" cy="12" r="7" />
                        <line x1="12" y1="3" x2="12" y2="5" />
                        <line x1="3" y1="12" x2="5" y2="12" />
                        <line x1="12" y1="19" x2="12" y2="21" />
                        <line x1="19" y1="12" x2="21" y2="12" />
                      </svg>
                    </div>
                  </div>
                </form>
                {/* Display suggestions */}
                <div className="absolute w-1/2 max-w-3xl  z-10">
                  {suggestions.map((item, index) => (
                    <div
                      key={index}
                      className="p-2 border rounded-md bg-gray-100"
                      onClick={() => handleSuggestionClick(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  onClick={toggleDropdown}
                  onChange={(e) => setselectedSpeciality(e.target.value)}
                  value={selectedspeciality}
                  list="suggestions"
                  className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:border-transparent"
                  placeholder="Select speciality"
                  required
                />
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    id="dropdown"
                    className="fixed z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-3/12 dark:bg-gray-700 max-h-40 overflow-y-auto"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="search"
                    >
                      {speciality
                        .filter((item) =>
                          item.specialityName
                            .toLowerCase()
                            .includes(selectedspeciality.toLowerCase())
                        )
                        .map((item) => (
                          <li key={item.id}>
                            <a
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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

              <div className="bg-teal-300 ">3</div>
              <div className="bg-teal-300 ">4</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
