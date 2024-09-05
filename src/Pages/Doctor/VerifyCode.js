import React, { useState, useRef } from 'react';

const VerifyCode = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Move to next input field if the current one is filled
    if (element.value !== '' && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (element, index) => {
    if (element.value === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/3 h-96 mx-auto my-auto flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("https://img.freepik.com/free-vector/medical-treatment-tools-composition_1284-16379.jpg?t=st=1719464414~exp=1719468014~hmac=274a29cf50c37e0b79f52e97ec775bc79c0b0346e7114bac6a2ca9fe2c73deed&w=740")' }}>
      </div>
      <div className="md:w-1/2 flex items-center">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-left">Verify Code</h2>
          <h5 className='text-left text-xl'>An authentication code has been sent to your e-mail.</h5>
          <form>
            <div className="my-3">
              <label htmlFor="otp" className="block text-md font-medium text-left text-cyan-400 mb-1 my-2">Enter Code</label>
              <div className="flex space-x-2">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onKeyUp={e => e.key === 'Backspace' && handleBackspace(e.target, index)}
                    ref={el => (inputs.current[index] = el)}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Verify
              </button>
            </div>
            <div className='text-gray-700 mt-5 text-center'>
              Don't receive a code?
              <button type="button" className='text-cyan-400 ml-2'>Resend Code</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
