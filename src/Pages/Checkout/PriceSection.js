import React from 'react'

const PriceSection = () => {
  return (
    <div>
    <div className='text-left'>
      <p className='text-2xl my-2'>Amount Payable</p>
      </div>
      <div className='text-left my-10'>
      <p className='text-lg my-4'>Additional Discount</p>
      <p className='text-lg my-4'>Total Amount</p>
      <p className='text-lg my-4'>Shipping/Delivery Charges</p>
      <p className='text-lg my-4'>Total Payable</p>
    </div>
     
    <div className='text-left text-cyan-400'>
    <p className='text-lg my-4'>Total Savings</p>
    <p className='text-lg my-4'>Total Savings</p>
    </div>

        
    <button className='my-4 w-2/5 h-10 bg-cyan-400 rounded text-gray-50'>Pay</button>

    </div>
  )
}

export default PriceSection