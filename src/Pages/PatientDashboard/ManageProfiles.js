import { useEffect, useRef, useState } from "react";
import PatientCard from "./PatientCard";
import ManageProfileService from "../../Service/PatientService/ManageProfile";

export default function ManageProfiles() {


  const [patientData, setPatientData] = useState([]);


  useEffect(() => {
    ManageProfileService.getAllProfiles(localStorage.getItem("profileId")).then((response) => {
      console.log(response.data);
      setPatientData(response.data); // Update the state with the retrieved data from the API call
      // Update the state with the retrieved data from the API call.
    })

  }, [])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 overflow-hidden md:grid-cols-3 gap-4 mt-8 cursor-pointer">
        {patientData.map((patient, index) => (
          <div className="relative">
            {patient.primaryPatient && (
              <div className="absolute top-0 right-0 text-blue-500 border border-blue-500 rounded-2xl px-1 py-1">
                Primary
              </div>
            )}

            <PatientCard
              key={index}
              photo={'/images/Doctor/pikaso_texttoimage_men-image-.jpeg'}
              name={`${patient.firstName} ${patient.lastName}`}
              gender={patient.gender}
              age={patient.age}
              id={patient.id}
            />
          </div>
        ))}
      </div>


    </>
  );
}
