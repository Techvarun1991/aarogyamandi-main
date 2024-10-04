import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import specialityService from "../../Service/DoctorService/Speciality";
import { useNavigate } from "react-router-dom";
import Location from "../../Service/DoctorService/Location";
import BASE_REST_API_URL from "../../Service/BaseUrl";

export default function ({ spl, city }) {
  //   //.log(spl,location);
  const specialityFromAnother = spl || "";
  const selectedCity = city || "";
  const [location, setLocation] = useState(selectedCity);
  const selectedLoaction=useRef(selectedCity);
  const [suggestions, setSuggestions] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [selectedspeciality, setselectedSpeciality] = useState(
    specialityFromAnother || ""
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's location and set the location state
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
            const city = response.data.city;
            //.log("response of new api", response.data);
            if (!selectedCity) {
              setLocation(city);
            }
          } catch (error) {
            //.error("Error getting user's location:", error);
          }
        },
        (error) => {
          //.error("Error getting user's location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    specialityService
      .getAllSpeciality()
      .then((response) => {
        //.log(response.data);
        setSpeciality(response.data);
      })
      .catch((error) => {
        //.log(error);
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

  // useEffect(() => {
  //   getDocByCityAndSpl();
  // }, []);

  // const getDocByCityAndSpl = () => {
  //   const payload = {
  //     city: location,
  //     specialization: selectedspeciality,
  //   };
  //   specialityService
  //     .getDoctorsByCityAndSpeciality(payload)
  //     .then((response) => {
  //       //.log(response);
  //     })
  //     .catch((error) => {
  //       //.error(error);
  //     });
  // };
  
  const handleChange = async (e) => {
    const value = e.target.value;
    setLocation(value);
    selectedLoaction.current=value;
    console.log(value,'--------------------value------------------- ')

    // Call API to get suggestions based on the input value
    try {
      Location.getSuggestions(e.target.value)
        .then((response) => {
          // //.log(response.data);
          const cities = response.data.features
            .map((feature) => feature.properties.city)
            .filter(Boolean);
          //.log(cities);
          if (cities.length > 0 && response.status == 200) {
            setSuggestions(cities);
            // getDocByCityAndSpl()
          }
        })
        .catch((error) => {
          //.log(error);
          setSuggestions([]);
        });
    } catch (error) {
      //.error("Error fetching data:", error);
    }
  };
  const handleSuggestionClick = (selectedLocation) => {
    console.log(selectedLocation,'----------selected location------------')
    console.log(location,'--------------location------------')
    setLocation(selectedLocation);
  
    setSuggestions([]);
    // getDocByCityAndSpl();
    if (spl && location) {
      navigate("/doctors", { state: { spl,location:selectedLocation } });
    }
  };

  const handleSpecialityChange = (spl) => {
    // //.log(spl);
    setselectedSpeciality(spl);
    setIsDropdownOpen(!isDropdownOpen);
    // getDocByCityAndSpl();
    if (spl && location) {
      navigate("/doctors", { state: { spl, location } });
    }
  };
  return (
    <>
      <div className="grid md:grid-cols-8 gap-4 mt-5">
        <div className="relative flex items-center border-b-2 border-blue-500 col-span-2">
          <div className="w-5 h-5 mr-2 text-blue-500 ">
            <MapPinIcon className="h-5 w-5" />
          </div>
          <div className="flex-grow relative h-11 w-full min-w-[200px] ">
            <input
              placeholder="Search"
              value={location}
              onChange={handleChange}
              className="peer h-full w-2/3   bg-transparent pt-4 pb-4 font-sans  font-bold text-blue-gray-700 text-lg outline-none transition-all border-b-2 border-transparent focus:border-gray-500 disabled:border-0 disabled:bg-blue-gray-50"
            />
          </div>
          <div className="absolute top-full left-0 w-full z-10 mt-3">
            {suggestions.map((item, index) => (
              <div
                key={index}
                className="p-2 border-b-2 bg-slate-100 border-blue-50"
                onClick={() => handleSuggestionClick(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex items-center border-b-2 border-blue-500 col-span-2 md:col-span-6 md:ml-4 mt-4 md:mt-0">
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
          <div className="absolute top-full left-0 w-full z-10">
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                id="dropdown"
                className="absolute z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 max-h-40 overflow-y-auto"
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
      {/* {!spl && !location && (
       
      )} */}
    </>
  );
}
