import React, { useEffect, useRef, useState } from "react";
import DoctorList from "./DoctorList";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../Layout/Bredcrumbs";
import { getDoctorConsultationSpl } from "./BreadCrumbsLinks";
import specialityService from "../../Service/DoctorService/Speciality";
import BASE_REST_API_URL from "../../Service/BaseUrl";
import {
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  MapIcon,
  MapPinIcon,
  UserCircleIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Doctors() {
  const locations = useLocation();
  const { spl, location } = locations.state || {};
  console.log(spl, location);

  // const speciality = useRef([]);
  const [speciality, setSpeciality] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const breadcrumbs = getDoctorConsultationSpl(spl);
  // useEffect(() => {
  const getDocByCityAndSpl = () => {
    const payload = {
      city: location,
      specialization: spl,
    };
    specialityService
      .getDoctorsByCityAndSpeciality(payload)
      .then((response) => {
        // console.log(response.data.doctors[0]);
        // console.log("inside the doctors main page");
        const datatoset = response.data.doctors;
        // speciality.current = datatoset;
        setSpeciality(datatoset);
        // console.log(speciality.current, "---------spl current");
      })

      .catch((error) => {
        console.error(error);
      });
  };
  // }, []);
  useEffect(() => {
    if (spl && location) {
      getDocByCityAndSpl();
    }
  }, [spl, location]);

  return (
    <>
      <div className="md:mx-auto md:w-5/6 mt-2 md:px-0 px-4 ">
        <Breadcrumbs link={breadcrumbs} />{" "}
      </div>
      <div
        className="
        "
      >
        <div className="md:mx-auto mt-4 md:w-5/6 font-bold text-slate-600 text-xl">
          Best {spl} doctor's in {location}
        </div>
        <div className="md:mx-auto md:w-5/6 mt-4 p-4 flex flex-col md:flex-row gap-4 shadow-md bg-white">
          <DoctorList spl={spl} city={location} />
        </div>
        <div className="mt-8 mx-4 md:mx-auto md:w-5/6">
          <div className="flex flex-wrap -mx-4">
            {speciality.map((item, index) => (
              <div className="w-full md:w-1/3 px-4 mb-8" key={index}>
                <a
                  href="#"
                  className="block bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="flex p-4 ">
                    <div className="border-2 border-blue-100 rounded-r-full rounded-l-full">
                      {item.profile.photoId ? (
                        <img
                          alt="Profile Picture"
                          src={`${BASE_REST_API_URL}/api/documentation/doctor-documents/${item.profile.photoId}/download`}
                          className="w-20 h-20 mr-4 rounded-full "
                        />
                      ) : (
                        <div className="w-20 h-20 mr-4 flex items-center justify-center rounded-full bg-gray-200">
                          <UserCircleIcon className="w-10 h-10 text-gray-500" />
                        </div>
                      )}
                    </div>

                    <div className="ml-2">
                      <h5 className="text-xl font-bold text-blue-500">
                        Dr. {item.profile.firstName} {item.profile.lastName}
                      </h5>
                      <p className="font-medium text-sm">
                        {item.profile.qualification
                          .map((qualification) => qualification.specialization)
                          .join(", ")}
                      </p>
                      <div className="font-normal text-sm">
                        {item.profile.experience} YRS EXP.
                      </div>
                    </div>
                  </div>

                  <div className="px-4 flex items-center">
                    <div className="w-5 h-5 mr-2">
                      <MapPinIcon className="h-5 w-5" color="gray" />
                    </div>
                    <div className="text-sm font-normal overflow-hidden whitespace-nowrap overflow-ellipsis mb-2">
                      {item.profile.addresses.slice(0, 1).map((clinic) => (
                        <span key={clinic.id}>
                          {clinic.clinicName}, {clinic.address}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div class="grid grid-cols-2">
    <div>
        <button type="button" class="text-white bg-gradient-to-r flex items-center justify-center from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <VideoCameraIcon class="mr-2" width={40} />
            <span>Book Video Consultancy</span>
        </button>
    </div>
    <div>
        <button type="button" class="text-white bg-gradient-to-r flex items-start justify-start from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  py-2.5 text-center">
            <BuildingOffice2Icon class="mr-2" width={24} />
            <span>Book Clinic Visit</span>
        </button>
    </div>
</div>

                  {/* Buttons Section */}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
