// import React, { useEffect, useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import SignIn from './SignIn';
// import DashboardLayout from '../layouts/dashboard/DashboardLayout';

// const ProtectedRoute = ({ element: Element}) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Check if the user is authenticated
//     const token = localStorage.getItem('email');
//     setIsAuthenticated(!!token);
//   }, []);

//   return isAuthenticated ? (
//     <>
//     {/* <DashboardLayout/> */}
//        <Element/>
//       {/* Display the protected content */}
//     </>
//   ) : (
//     <>
//     <SignIn/>
//       {/* <Element/> */}
//     </>
//   );
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { Routes, Route, Navigate } from 'react-router-dom';
// import SignUp from './SignIn';
// import DashboardLayout from '../layouts/dashboard/DashboardLayout';

const ProtectedRoute = ({ element: Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('profileId');
    setIsAuthenticated(!!token);
    setLoading(false); // Set loading to false once checking is done
  }, []);

  return loading ? (
    // Show loading spinner or component while checking authentication
    <div className='box flex justify-center align-middle h-72'>
      <FaSpinner />
    </div>
  ) : isAuthenticated ? (
    <>
      {/* <DashboardLayout /> */}
      <Element />
    </>
  ) : (
    // <SignUp /> // Show SignUp component if not authenticated
    <Navigate to="/login" replace /> // Navigate to SignUp route if not authenticated

  );
};

export default ProtectedRoute;