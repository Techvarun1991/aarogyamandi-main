import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import {
  MapPinIcon,
  PencilIcon,
  StopCircleIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import specialityService from "../../Service/DoctorService/Speciality";
import Location from "../../Service/DoctorService/Location";
import Breadcrumbs from "../../Layout/Bredcrumbs";
import { doctorSearchByCity } from "./BreadCrumbsLinks";
import axios from "axios";
import Guildlines from "./Guildlines";
import TopSpealities from "./TopSpecialities";
import { useNavigate } from "react-router-dom";
import DoctorList from "./DoctorList";

export default function FindDoctor() {
  const [location, setLocation] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [selectedspeciality, setselectedSpeciality] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
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
              `http://192.168.1.6:8080/map/api/revGeoCode`,
              payload
            );
            const city = response.data.city;
            // console.log("response of new api", response.data);
            setLocation(city);
          } catch (error) {
            console.error("Error getting user's location:", error);
          }
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    }
  }, []);

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
    if (spl && location) {
      navigate("/doctors", { state: spl });
    }
  };
  return (
    <div className="bg-gray-100">
      <div className="md:mx-auto md:w-5/6 mt-8 md:px-0 px-4 ">
        <Breadcrumbs link={doctorSearchByCity} />
      </div>
      <div className="md:mx-auto md:w-5/6 mt-8 flex flex-col md:flex-row gap-4 ">
        <div className=" md:mr-4 mx-auto px-4 md:px-2 bg-white">
          {" "}
          {/* Added mx-auto for centering and px-4 for padding on mobile */}
          <div className="p-4">
            <div className="font-bold text-slate-600 text-xl">Find Doctors</div>
            {/* <div className="grid md:grid-cols-8 gap-4 mt-5">
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
            </div> */}
            <DoctorList />
            <div>
              {" "}
              <div className="mt-3 md:mt-3 mb-3 font-bold text-sm md:text">
                Top Cities
              </div>
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
            </div>{" "}
          </div>
        </div>
        <div className="md:w-2/6 mt-4 md:mt-0 shadow-lg mx-24 md:mx-0 bg-white hidden md:block">
          {" "}
          {/* Added hidden md:block to hide on mobile screens */}
          <Guildlines />
        </div>
      </div>
      <div className="md:mx-auto md:w-5/6 mt-3 mx-20">
        {" "}
        {/* Added mx-4 for mobile margins */}
        <TopSpealities />
      </div>
    </div>
  );
}
