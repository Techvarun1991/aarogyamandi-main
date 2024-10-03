import React from "react";

const Orderstatus = () => {
  return (
    <div>
      <div className="mx-3 my-5">
        <p className="flex text-lg ">
          Order Status :<p className="text-rose-400">In Transit</p>
        </p>
        <p className="text-left">Estimated Delivery on Date :1 Jan 2025</p>
      </div>

      <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400 mx-5">
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700"></span>
          <h3 className="font-medium leading-tight text-left">Delivered</h3>    
          <p className="text-sm text-left">2 Feb</p>
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700"></span>
          <h3 className="font-medium leading-tight text-left">
            Shipping Final Mile
          </h3>
          <p className="text-sm text-left">31 Jan</p>
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700"></span>
          <h3 className="font-medium leading-tight text-left">Transit</h3>
          <p className="text-sm text-left">30 Jan</p>
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700"></span>
          <h3 className="font-medium leading-tight text-left">In Production</h3>
          <p className="text-sm text-left">28 Jan</p>
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900"></span>
          <h3 className="font-medium leading-tight text-left">Order Placed</h3>
          <p className="text-sm text-left">26 jan</p>
        </li>
      </ol>
    </div>
  );
};

export default Orderstatus;
