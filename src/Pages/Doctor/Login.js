import React, { useState } from 'react';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/3 h-96 mx-auto my-auto flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("https://img.freepik.com/free-vector/medical-treatment-tools-composition_1284-16379.jpg?t=st=1719464414~exp=1719468014~hmac=274a29cf50c37e0b79f52e97ec775bc79c0b0346e7114bac6a2ca9fe2c73deed&w=740")' }}>
      </div>
      <div className="md:w-1/2 flex items-center">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-left">Login</h2>
          <h5 className='text-left text-xl'>to access your orders, special offers, health tips and more!</h5>
          <form>
            <div className="my-3">
              <label htmlFor="email" className="block text-md font-medium text-left text-cyan-400 mb-1 my-2">Email</label>
              <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-md font-medium text-left text-cyan-400 mb-1">Password</label>
              <input 
                type={passwordVisible ? 'text' : 'password'} 
                id="password" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility} 
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                {passwordVisible ? '🙈' : '👁️'}
              </button>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input type="checkbox" id="remember-me" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <div>
                <button type="button" className="text-sm text-red-500 hover:text-red-700 focus:outline-none">Forgot password?</button>
              </div>
            </div>
            <div>
              <button type="submit" className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

 