import React from 'react'
import { useNavigate } from 'react-router-dom';

const PriceSection = (medicinePrice) => {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/checkout');
  };
  return (
    <div>
    <div className='text-left my-10'>
      <div>
      <p className='text-lg'>Estimated Delivery by 15 September 2024</p>
      
      </div>
      <p className='text-lg mt-5'>Amount Payable</p>
      </div>
      <div className='text-left my-3'>
      <p className='text-lg'>Additional Discount</p>
      <p className='text-lg my-4'>Total Amount</p>
      <p className='text-lg my-4'>Shipping/Delivery Charges</p>
      <p className='text-lg my-4'>Total Payable</p>
    </div>
     
    <div className='text-left text-cyan-400'>
    <p className='text-lg my-4'>Total Savings</p>
    <p className='text-lg my-4'>Total Savings</p>
    </div>

        
    <button className='my-4 w-3/5 h-10 bg-cyan-400 rounded text-gray-50' onClick={handleProceed}>PROCEED</button>

    </div>
  )
}

export default PriceSection