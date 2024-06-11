import React from "react";
import ArogayaMandi from "./MicrosoftTeams-image (4).png";

const Banner = () => {
  return (
    <div className="my-10">
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row items-center justify-between bg-gradient-to-r from-cyan-400 to-white p-4 md:p-20">
        {/* First part */}
        <div className="sm:w-full md:w-2/6 lg:w-2/6 xl:w-2/6 mb-4 sm:mb-4 md:mb-0 lg:mb-0 xl:mb-0">
          <img
            src={ArogayaMandi}
            alt="Logo"
            className="w-full h-auto sm:h-24 md:h-auto lg:h-auto xl:h-auto"
          />
        </div>
        {/* Second part */}
        <div className="sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4 sm:mb-4 md:mb-0 lg:mb-0 xl:mb-0">
          <div className="text-white font-bold text-2xl">Yay! Now you can</div>
          <div className="font-bold text-2xl text-pink-500">WHATSAPP</div>
          <div className="text-xl">
            TO
            <span className="text-xl font-bold"> ORDER</span>
          </div>
        </div>
        {/* Third part */}
        <div className="sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mb-4 sm:mb-4 md:mb-0 lg:mb-0 xl:mb-0 text-center">
          <p className="text-xl">
            You can get <span className="text-xl font-bold">10% CASHBACK</span>
            {" on your first order "}
            <span className="text-xl font-bold">+FREE DELIVERY</span>
          </p>
          <div className="bg-pink-600 w-3/5 mx-auto rounded-xl">
            <p className="text-white text-center">Whatsapp +911234567890</p>
          </div>
        </div>

        {/* Fourth part */}
        <div className="sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4 sm:mb-4 md:mb-0 lg:mb-0 xl:mb-0">
          <img
            src="https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17818.jpg?t=st=1716963568~exp=1716967168~hmac=78b02689906e1929f8b5abcefe6cacec55c4fd46375d4aaccc225e5f3e70aa05&w=826"
            alt="Image"
            className="w-3/4 sm:w-full h-auto object-cover mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
