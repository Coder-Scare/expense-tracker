import React, { useState, useEffect, useRef } from 'react';
// useRef holds value between renders without causing a re-render, this was used to ensure dropdown closed once clicking off it.

// Import React Icons
import { IoIosArrowDown } from 'react-icons/io';

// Define types of data
// Option Object
type Option = {
  value: string;
  key: number;
};

// SearchableDropdownProps Object
type SearchableDropdownProps = {
  options: Option[];
  onSelectedOption: (key: number) => void;
  selectedKey: number;
};

// SearchableDropdown component accepts 2 properties option and onSelectOption
// option prop is array of objects
//  onSelectOption is callback function that is called when option is selected
const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  selectedKey,
  onSelectedOption,
}) => {
  // States for search and filtered options
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  // State for whether dropdown is open or not
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // useRef hook used to reference input element so can check if click occurs outside the component
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!selectedKey) return;
    setSearchTerm(
      options?.find((o: any) => o.key === selectedKey)?.value || ''
    );
  }, [selectedKey]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // closes dropdown when clicking outside component
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    // call event listener
    document.addEventListener('click', handleClickOutside);
    // Resets event listener so it is cleared until the input field is clicked again
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Function that finds the string that is equal to that searched on in the input box and spits it up using the filter method.
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    if (value === '') {
      onSelectedOption(null);
    }

    const filtered = options.filter(
      (option) => option.value.toLowerCase().includes(value.toLowerCase())
      // if option is equal to value that was inputed then bring forth that option otherwise do nothing
    );
    setFilteredOptions(filtered);
  };

  // On option click replace the filtered option with value of actual option clicked and make search term that option to be saved
  const handleOptionClick = (option: Option) => {
    onSelectedOption(option.key);
    setSearchTerm(option.value); // Once set make it trigger another event that drops the form into 2 columns
    // Having the options as a parameter always shows the options even after an option has been selected. Allowing UX for changes
    setFilteredOptions(options);
    setIsDropdownOpen(false);
  };

  // Below opens dropdown on click
  const handleInputClick = () => {
    setIsDropdownOpen(true);
  };
  // Below makes the entire list of items show when input box is clicked regardless if it is the first time or not
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  return (
    <div ref={inputRef} className="relative cursor-pointer">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onClick={handleInputClick}
        placeholder="Select..."
        className="py-3 px-4 pl-4 pr-16 block border shadow-sm rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:ring-blue-200 w-full"
        required
      />
      <div
        className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 text-lg text-slate-500"
        onClick={handleInputClick}
      >
        <IoIosArrowDown />
      </div>
      {isDropdownOpen && (
        <ul className="absolute w-full max-h-32 overflow-y-auto">
          {filteredOptions.map((option) => (
            <li
              className="bg-white hover:bg-slate-200 z-50 py-2 pl-2 pr-4 rounded-sm"
              key={option.key}
              onClick={() => handleOptionClick(option)}
            >
              {option.value}
              {/* Cycles through all the options in the filteredOptions array and selects the option using handleOptionClick function */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
