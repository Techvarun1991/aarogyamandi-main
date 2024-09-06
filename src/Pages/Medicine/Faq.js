import React, { useState } from "react";

const Faq = () => {
  const faqs = [
    {
      question: "What is your return policy?",
      answer: "Our return policy allows for returns up to 30 days...",
    },
    {
      question: "How to order medicine online from Arogaya Mandi?",
      answer:
        "Ordering medicine online from Arogaya Mandi is easy and convenient.",
    },
    {
      question: "How can I track my order?",
      answer: "You can track your order by logging into your account...",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className=" ml-10 w-12/12">
      <div className="flex justify-between items-center w-full mx-auto my-10">
        <h1 className="text-xl font-bold">Frequently Asked Questions</h1>
      </div>
      <hr className="w-[96%] border-gray-300" />
      <div className="w-[96%]  mt-4">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <h3 className="text-md text-sky-400 font-semibold">
                {faq.question}
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className={`w-6 h-6 ${
                  openIndex === index ? "transform rotate-180" : ""
                }`}
              >
                <path
                  fill="currentColor"
                  d="M10 12.59l-4.95-4.95-1.41 1.41L10 15.41l6.36-6.36-1.41-1.41z"
                />
              </svg>
            </div>
            {openIndex === index && (
              <p className="mt-2 text-left">{faq.answer}</p>
            )}
            {index !== faqs.length - 1 && (
              <hr className="w-full border-gray-300 my-3" /> 
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
