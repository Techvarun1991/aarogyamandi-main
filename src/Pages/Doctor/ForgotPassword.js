import React from 'react'

const ForgotPassword = () => {
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
            <div>
              <button type="submit" className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword