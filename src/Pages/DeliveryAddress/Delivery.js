import React from 'react'

const Delivery = () => {
  return (
<div className="flex h-screen">
      {/* Left Side - Green */}
      <div className="w-1/2">
        <p className="text-black font-bold text-left mx-10 my-10">DELIVERY ADDRESS</p>
        <p className="text-cyan-400 text-left  text-lg mx-10">
          + Add New Address
        </p>
      </div>

      {/* Right Side - Blue */}
      <div className="w-1/2 bg-blue-500">
        <p className="text-white text-3xl text-center p-4">Right Side (Blue)</p>
      </div>
    </div>
  )
}

export default Delivery