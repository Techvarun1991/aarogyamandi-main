import React, { useState } from "react";

const Productdescription = ({medicineDetails}) => {

  const [activeTab, setActiveTab] = useState("Highlights");

  // Create tabs dynamically from the medicineDetails object
  const tabs = [
    { name: "Highlights", content: medicineDetails.highlights },
    { name: "Description", content: medicineDetails.description },
    { name: "Indications", content: medicineDetails.indications },
    { name: "Key Components", content: medicineDetails.keyComponents },
    { name: "Direction For Use", content: medicineDetails.directionForUse },
    { name: "Storage", content: medicineDetails.storage },
    { name: "Precautions", content: medicineDetails.precautions }
  ];

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 my-5">
      <ul className="flex flex-wrap text-xs sm:text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {tabs.map((tab) => (
          <li key={tab.name} className="mr-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (tab.name !== "Disabled") setActiveTab(tab.name);
              }}
              className={`inline-block p-2 sm:p-4 rounded-t-lg ${
                activeTab === tab.name
                  ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
                  : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              } ${
                tab.name === "Disabled"
                  ? "text-gray-400 cursor-not-allowed dark:text-gray-500"
                  : ""
              }`}
              aria-current={activeTab === tab.name ? "page" : undefined}
            >
              {tab.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="p-2 sm:p-4">
        {tabs
          .filter((tab) => tab.name === activeTab)
          .map((tab) => (
            <p key={tab.name} className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              {tab.content}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Productdescription;
