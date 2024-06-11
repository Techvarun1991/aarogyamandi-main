import React from "react";
import { FaStar } from "react-icons/fa";

const RatingAndReview = () => {
  const getStarColor = (star) => {
    if (star >= 4) return "text-green-500";
    if (star >= 2) return "text-yellow-500";
    return "text-red-500";
  };
  return (
    <div className="p-4 md:p-8 lg:p-16">
      <div className="flex">
        <p className="text-2xl text-left ml-2">Rating & Review</p>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/5 p-4">
          {[5, 4, 3, 2, 1].map((star, index) => (
            <div className="flex items-center mt-4" key={index}>
              <div className="flex items-center">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                  {star}
                </span>
                <FaStar className={`ml-1 ${getStarColor(star)}`} />
              </div>
              <div className="w-2/4 h-2 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  className="h-2 bg-yellow-300 rounded"
                  style={{ width: `${70 - index * 15}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {70 - index * 15}%
              </span>
            </div>
          ))}
        </div>

        <div className="w-full md:w-3/5 p-4">
          <div className="border-t border-gray-200 md:border-l md:border-t-0"></div>
          <div className="mt-4 md:mt-0 md:pl-8">
            <div className="flex items-center">
              <p className="text-2xl text-left ml-2">Write a Review</p>
            </div>

            <div className="mt-5">
              <div className="relative w-full">
                <textarea
                  className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
                ></textarea>
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Message
                </label>
              </div>
              <button className="bg-pink-400 px-4 py-2 mt-4">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingAndReview;
