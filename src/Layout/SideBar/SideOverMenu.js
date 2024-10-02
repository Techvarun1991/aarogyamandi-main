import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  BeakerIcon,
  ChevronRightIcon,
  ClipboardDocumentCheckIcon,
  InformationCircleIcon,
  PowerIcon,
  TruckIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import LogoutDialog from "./LogoutDialog";
import { useNavigate } from "react-router-dom";

export default function SideOverMenu({ open, setOpen }) {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const toggleLogoutDialog = () => {
    setLogoutDialogOpen(!logoutDialogOpen);
  };

  const handleDashboardNavigation = (index) => {
    closeSideOverMenu();
    navigate("/Patient/Dashboard", { state: { index } });
  };
  const options = [
    {
      name: "Manage Profiles",
      icon: <UserGroupIcon className="w-6 h-6 my-auto"></UserGroupIcon>,
      index:0
    },
    {
      name: "Doctor Appointments",
      icon: (
        <ClipboardDocumentCheckIcon className="w-6 h-6 my-auto"></ClipboardDocumentCheckIcon>
      ),
      index:1
    },
    {
      name: "Medicine Orders",
      icon: <TruckIcon className="w-6 h-6 my-auto"></TruckIcon>,
      index:2
    },
    {
      name: "Lab Appointments",
      icon: <BeakerIcon className="w-6 h-6 my-auto"></BeakerIcon>,
      index:3
    },
    {
      name: "Need Help",
      icon: (
        <InformationCircleIcon className="w-6 h-6 my-auto"></InformationCircleIcon>
      ),
      index:4
    },
    {
      name: "Log Out",
      icon: <PowerIcon className="w-6 h-6 my-auto "></PowerIcon>,
    },
  ];
  // Function to toggle the visibility of the SideOverMenu
  const closeSideOverMenu =() => {
    setOpen(false);
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden ">
            <div className="absolute inset-0 overflow-hidden ">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 ">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto  max-w-sm ">
                    <div className="flex h-full flex-col bg-gradient-to-b from-cyan-300 to-cyan-50 shadow-xl ">
                      <div className="flex-1 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-[38rem]"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="">
                            <img
                              className="rounded-full w-20 h-20 border-2 mx-auto "
                              alt=""
                              src="https://192.168.1.6:8080/api/documentation/patient-documents/65c9a362681c3641eb688164/download"
                            ></img>
                          </div>
                          <div className="flex justify-between mt-2">
                            <p className="font-semibold font-sans">Nikhil</p>
                            <p className="font-thin text-sm">Male | 24</p>
                          </div>
                          <div className="">
                            <p className="font-thin text-sm">
                              varungarade1151@gmail.com
                            </p>
                          </div>
                          <div className="">
                            <ul className="divide-y divide-gray-100">
                              {options.map((option) => (
                                <li className="py-4">
                                  <button
                                    className="flex justify-between items-center w-full"
                                    onClick={
                                      option.name === "Log Out"
                                        ? toggleLogoutDialog
                                        : () => handleDashboardNavigation(option.index)
                                    }
                                  >
                                    <div>
                                      <div className="flex gap-x-2">
                                        {option.icon}
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                          {option.name}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      {" "}
                                      {/* Use items-center to vertically center the ChevronIcon */}
                                      <ChevronRightIcon className="w-4 h-4"></ChevronRightIcon>
                                    </div>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <LogoutDialog
        logoutDialogOpen={logoutDialogOpen}
        setLogoutDialogOpen={setLogoutDialogOpen}
      ></LogoutDialog>
    </>
  );
}
