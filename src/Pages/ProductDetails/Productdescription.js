import React, { useState } from "react";

const Productdescription = () => {

  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    {
      name: "Profile",
      content:
        "This is the profile content. It provides an overview of the user’s profile, including personal information and settings.",
    },
    {
      name: "Dashboard",
      content:
        "This is the dashboard content. It includes key metrics, performance charts, and recent activity to give an overview of the system status.",
    },
    {
      name: "Settings",
      content:
        "This is the settings content. Here, users can adjust their preferences, change passwords, and configure system settings.",
    },
    {
      name: "Contacts",
      content:
        "This is the contacts content. It lists all the user’s contacts, with options to add, edit, or remove contact information.",
    },
    {
      name: "Disabled",
      content:
        "This tab is disabled. It is not clickable and does not contain any content.",
    },
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
