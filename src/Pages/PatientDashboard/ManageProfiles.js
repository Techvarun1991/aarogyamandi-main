import PatientCard from "./PatientCard";

export default function ManageProfiles() {
  const patients = [
    {
      id: 1,
      photo: "https://192.168.1.6:8080/api/documentation/patient-documents/65c9a362681c3641eb688164/download",
      name: "John Doe",
      gender: "Male",
      age: 35,
      // Add more patient information as needed
    },
    {
      id: 2,
      photo: "https://192.168.1.6:8080/api/documentation/patient-documents/65c9a362681c3641eb688164/download",
      name: "Jane Smith",
      gender: "Female",
      age: 28,
      // Add more patient information as needed
    },
    {
      id: 3,
      photo: "https://192.168.1.6:8080/api/documentation/patient-documents/65c9a362681c3641eb688164/download",
      name: "Michael Johnson",
      gender: "Male",
      age: 45,
      // Add more patient information as needed
    },
    {
      id: 4,
      photo: "https://192.168.1.6:8080/api/documentation/patient-documents/65c9a362681c3641eb688164/download",
      name: "John Doe",
      gender: "Male",
      age: 35,
      // Add more patient information as needed
    },
    {
      id: 5,
      photo: "https://192.168.1.6:8080/api/documentation/patient-documents/65c9a362681c3641eb688164/download",
      name: "Jane Smith",
      gender: "Female",
      age: 28,
      // Add more patient information as needed
    },
    {
      id: 6,
      photo: "https://192.168.1.6:8080/api/documentation/patient-documents/65c9a362681c3641eb688164/download",
      name: "Michael Johnson",
      gender: "Male",
      age: 45,
      // Add more patient information as needed
    },
    // Add more patients as needed
  ];

  return (
    <>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {patients.map((patient, index) => (
          <PatientCard
            key={index}
            photo={patient.photo}
            name={patient.name}
            gender={patient.gender}
            age={patient.age}
          />
        ))}
      </div>
    </>
  );
}
