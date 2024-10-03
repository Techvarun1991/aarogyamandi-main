import { useEffect, useRef, useState } from "react";
import PatientCard from "./PatientCard";
import ManageProfileService from "../../Service/PatientService/ManageProfile";

export default function ManageProfiles() {
  const patients = [
    {
      id: 1,
      photo: "http://192.168.1.6:8080/api/documentation/patient-documents/65c9a362681c3641eb688164/download",
      name: "John Doe",
      gender: "Male",
      age: 35,
      // Add more patient information as needed
    },
    {
      id: 2,
      photo: "http://192.168.1.6:8080/api/documentation/patient-documents/65c9a362681c3641eb688164/download",
      name: "Jane Smith",
      gender: "Female",
      age: 28,
      // Add more patient information as needed
    },
    {
      id: 3,
      photo: "http://192.168.1.6:8080/api/documentation/patient-documents/65c9a362681c3641eb688164/download",
      name: "Michael Johnson",
      gender: "Male",
      age: 45,
      // Add more patient information as needed
    },
    {
      id: 4,
      photo: "http://192.168.1.6:8080/api/documentation/patient-documents/65c9a362681c3641eb688164/download",
      name: "John Doe",
      gender: "Male",
      age: 35,
      // Add more patient information as needed
    },
    {
      id: 5,
      photo: "http://192.168.1.6:8080/api/documentation/patient-documents/65c9a362681c3641eb688164/download",
      name: "Jane Smith",
      gender: "Female",
      age: 28,
      // Add more patient information as needed
    },
    {
      id: 6,
      photo: "http://192.168.1.6:8080/api/documentation/patient-documents/65c9a362681c3641eb688164/download",
      name: "Michael Johnson",
      gender: "Male",
      age: 45,
      // Add more patient information as needed
    },
    // Add more patients as needed
  ];

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
      <div className="grid grid-cols-1 sm:grid-cols-2 overflow-hidden md:grid-cols-3 gap-4 mt-8">
        {patientData.map((patient, index) => (
          <div className="relative">
            <div className="absolute top-0 right-0 text-blue-500 border border-blue-500 rounded-2xl px-1 py-1">
              Primary
            </div>
            <PatientCard
              key={index}
              photo={'/images/Doctor/pikaso_texttoimage_men-image-.jpeg'}
              name={`${patient.firstName} ${patient.lastName}`}
              gender={patient.gender}
              age={patient.age}
            />
          </div>
        ))}
      </div>


    </>
  );
}
