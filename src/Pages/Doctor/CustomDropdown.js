import { useState } from 'react';

const CustomDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter(
    (option) =>
      option.specialityName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:border-transparent"
        placeholder="Select speciality"
        required
      />
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md overflow-y-auto max-h-40">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option.specialityName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Usage
<CustomDropdown
  options={speciality}
  onSelect={(option) => setSelectedSpeciality(option.specialityName)}
/>
