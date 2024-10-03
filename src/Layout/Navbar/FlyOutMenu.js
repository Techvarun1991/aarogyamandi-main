import React, { useState } from 'react';

const DropdownMenu = ({ title, items }) => {
  return (
    <div className="absolute left-0 mt-2 w-[600px] bg-white shadow-lg grid grid-cols-3 gap-8 p-6 z-10">
      <h3 className="font-bold text-[#007b8f] mb-2">{title}</h3>
      <ul className="text-sm text-[#007b8f] space-y-1">
        {items.map((item, index) => (
          <li key={index} className="hover:text-[#0099B1] cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default DropdownMenu;