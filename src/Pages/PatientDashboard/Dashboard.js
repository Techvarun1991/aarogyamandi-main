import React, { useState } from 'react';
import ManageProfiles from './ManageProfiles';
import DoctorAppointments from './DoctorAppointments';
import MedicineOrders from './MedicineOrders';
import LabAppointments from './LabAppointments';
import NeedHelp from './NeedHelp';
import { BeakerIcon, ChevronRightIcon, ClipboardDocumentCheckIcon, InformationCircleIcon, PowerIcon, TruckIcon, UserGroupIcon } from '@heroicons/react/16/solid';
import LogoutDialog from '../../Layout/SideBar/LogoutDialog';

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState(0);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const options = [
    {
      name: 'Manage Profiles',
      icon: <UserGroupIcon className="w-6 h-6 my-auto" />,
      component: <ManageProfiles />
    },
    {
      name: 'Doctor Appointments',
      icon: <ClipboardDocumentCheckIcon className="w-6 h-6 my-auto" />,
      component: <DoctorAppointments />
    },
    {
      name: 'Medicine Orders',
      icon: <TruckIcon className="w-6 h-6 my-auto" />,
      component: <MedicineOrders />
    },
    {
      name: 'Lab Appointments',
      icon: <BeakerIcon className="w-6 h-6 my-auto" />,
      component: <LabAppointments />
    },
    {
      name: 'Need Help',
      icon: <InformationCircleIcon className="w-6 h-6 my-auto" />,
      component: <NeedHelp />
    },
    {
      name: 'Log Out',
      icon: <PowerIcon className="w-6 h-6 my-auto" />,
      action: () => setLogoutDialogOpen(true)
    }
  ];

  const handleMenuItemClick = (index) => {
    setActiveMenu(index);
    if (options[index].action) {
      options[index].action();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row mx-auto w-full lg:w-4/5 bg-slate-50 border-dashed border-2 border-red-700 relative">
      <div className={`lg:w-1/4 min-w-64 lg:min-w-0 ${isMenuOpen ? '' : 'hidden'} lg:block lg:relative lg:border-r lg:border-gray-200`}>
        <ul className="mt-4">
          {options.map((option, index) => (
            <li key={index} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
              <button
                className="flex justify-between shadow-sm py-4 rounded-md items-center w-full"
                onClick={() => handleMenuItemClick(index)}
              >
                <div className="flex gap-x-2 items-center">
                  {option.icon}
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {option.name}
                  </p>
                </div>
                <div className="flex items-center">
                  <ChevronRightIcon className="w-4 h-4" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-grow mx-auto">
        {/* Render the active component based on the activeMenu state */}
        {activeMenu !== null && options[activeMenu].component}
      </div>
      <LogoutDialog logoutDialogOpen={logoutDialogOpen} setLogoutDialogOpen={setLogoutDialogOpen} />
      <button
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-white p-2 rounded-full shadow-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? 'Close' : 'Open'} Menu
      </button>
    </div>
  );
};

export default Dashboard;