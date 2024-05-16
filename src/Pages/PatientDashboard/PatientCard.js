import React from "react";

export default function PatientCard({ photo, name, gender, age }) {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex items-center mb-2">
          <img src={photo} alt={name} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-gray-500">
              {gender} | {age}
            </p>
          </div>
        </div>
        {/* Additional patient information */}
      </div>
    </>
  );
}
