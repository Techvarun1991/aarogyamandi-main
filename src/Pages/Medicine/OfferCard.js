import React from 'react';
import LabImage from '../../Images/Lab.png'
import LabImage1 from '../../Images/Lab1.png'
import LabImage2 from '../../Images/Lab2.png'
import LabImage3 from '../../Images/Lab3.png'

const Card = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {/* First Card */}
      <div className="max-w-md mx-4 mb-8 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:h-full md:w-48" src={LabImage} alt="Comprehensive Full Body Checkup" />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Comprehensive Full Body Checkup</h2>
              <span className="text-red-500 text-lg font-bold">61% OFF</span>
            </div>
            <p className="text-gray-700">
              Measures Vitamin D & B12 levels and other essential parameters
            </p>
            <div className="flex justify-between mt-4">
              <span className="text-gray-800 text-lg font-bold">₹1899</span>
              <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-400">Start Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Card */}
      <div className="max-w-md mx-4 mb-8 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:h-full md:w-48" src={LabImage1} alt="Comprehensive Full Body Checkup" />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Comprehensive Full Body Checkup</h2>
              <span className="text-red-500 text-lg font-bold">61% OFF</span>
            </div>
            <p className="text-gray-700">
              Measures Vitamin D & B12 levels and other essential parameters
            </p>
            <div className="flex justify-between mt-4">
              <span className="text-gray-800 text-lg font-bold">₹1899</span>
              <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-blue-600">Start Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Third Card */}
      <div className="max-w-md mx-4 mb-8 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:h-full md:w-48" src={LabImage2} alt="Comprehensive Full Body Checkup" />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Comprehensive Full Body Checkup</h2>
              <span className="text-red-500 text-lg font-bold">61% OFF</span>
            </div>
            <p className="text-gray-700">
              Measures Vitamin D & B12 levels and other essential parameters
            </p>
            <div className="flex justify-between mt-4">
              <span className="text-gray-800 text-lg font-bold">₹1899</span>
              <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-blue-600">Start Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Card */}
      <div className="max-w-md mx-4 mb-8 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:h-full md:w-48" src={LabImage3} alt="Comprehensive Full Body Checkup" />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Comprehensive Full Body Checkup</h2>
              <span className="text-red-500 text-lg font-bold">61% OFF</span>
            </div>
            <p className="text-gray-700">
              Measures Vitamin D & B12 levels and other essential parameters
            </p>
            <div className="flex justify-between mt-4">
              <span className="text-gray-800 text-lg font-bold">₹1899</span>
              <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-blue-600">Start Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
