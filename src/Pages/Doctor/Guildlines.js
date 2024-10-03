import {
  CalendarDaysIcon,
  CheckBadgeIcon,
  CurrencyRupeeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { VideoCameraIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Guildlines() {
  return (
    <div>
      <div className="flex py-2 mt-2 border-slate-550 border-b-2">
        <div className="w-1/6">
          {" "}
          <VideoCameraIcon className="h-8 w-10" color="blue" />
        </div>
        <div className="w-5/6 text-md text-blue-500 font-semibold">
          How to consult doctor in Arogya Mandi
        </div>
      </div>

      <ul className="max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400 py-2 px-2">
        <li className="flex items-center">
          <div className="w-5 h-5 mr-2 text-blue-500 ">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </div>
          <div className="text-md font-semibold"> Search for doctor</div>
        </li>
        <li className="flex items-center">
          <div className="w-5 h-5 mr-2 text-blue-500 ">
            <CalendarDaysIcon className="h-5 w-5" />
          </div>
          <div className="text-md font-semibold"> Book a slot</div>
        </li>
        <li className="flex items-center">
          <div className="w-5 h-5 mr-2 text-blue-500 ">
            <CurrencyRupeeIcon className="h-5 w-5" />
          </div>
          <div className="text-md font-semibold"> Make a payment</div>
        </li>
        <li className="flex items-center">
          <div className="w-5 h-5 mr-2 text-blue-500 ">
            <CheckBadgeIcon />
          </div>
          <div className="text-md font-semibold">
            {" "}
            Complete the consultation
          </div>
        </li>
      </ul>
    </div>
  );
}
