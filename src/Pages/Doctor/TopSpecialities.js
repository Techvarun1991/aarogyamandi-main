import React from "react";

export default function TopSpecialities() {
  const ArrayOfSpeciality = [
    {
      name: "Cardiologist",
      image: "/images/Doctor/Cardiologist.png",
      description: "Heart disease expert",
    },
    {
      name: "Dermatologist",
      image: "/images/Doctor/dermatologist.png",
      description: "Skin care specialist",
    },
    {
      name: "Orthopedist",
      image: "/images/Doctor/orthopedistric.png",
      description: "Bone and joint doctor",
    },
    {
      name: "Gynecologist",
      image: "/images/Doctor/gynecologist.png",
      description: "Women's health expert",
    },
    {
      name: "Dietician",
      image: "/images/Doctor/dietic.png",
      description: "Nutrition expert",
    },
    {
      name: "Pediatrician",
      image: "/images/Doctor/pediatric.png",
      description: "Child health doctor",
    },
    {
      name: "Neurologist",
      image: "/images/Doctor/neurologist.png",
      description: "Brain specialist",
    },
    {
      name: "General Physician",
      image: "/images/Doctor/general physician.png",
      description: "Primary care doctor",
    },
  ];

  return (
    <>
      <div className="font-bold text-slate-600 text-xl">Top Specialities</div>
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {" "}
        {/* Added justify-center for mobile and justify-start for regular screens */}
        {ArrayOfSpeciality.slice(0, 4).map((speciality, index) => (
          <div
            key={index}
            className="w-48 max-w-sm mt-5 flex flex-col items-center shadow-md bg-white"
          >
            <div className="px-5 pb-3 mt-3">
              <a href="#">
                <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                  {speciality.name}
                </h5>
              </a>
            </div>
            <a href="#" className="flex items-center justify-center">
              <img
                className="w-36 h-36"
                src={speciality.image}
                alt={speciality.name}
              />
            </a>
            <div className="px-5 pb-3">
              <div className="text-sm font-normal tracking-tight text-gray-900 dark:text-white">
                {speciality.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {ArrayOfSpeciality.slice(4).map((speciality, index) => (
          <div
            key={index}
            className="w-48 max-w-sm mt-10 flex flex-col items-center shadow-md bg-white"
          >
            <div className="px-5 pb-3 mt-3">
              <a href="#">
                <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                  {speciality.name}
                </h5>
              </a>
            </div>
            <a href="#" className="flex items-center justify-center">
              <img
                className="w-36 h-36"
                src={speciality.image}
                alt={speciality.name}
              />
            </a>
            <div className="px-5 pb-3">
              <div className="text-sm font-normal tracking-tight text-gray-900 dark:text-white">
                {speciality.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
