import React from 'react';

const CitySuggestions = ({ suggestions, onSuggestionClick }) => {
  return (
    <ul className="bg-[#202B3B] text-[#DDE0E4] rounded-lg shadow-md mt-2 max-h-60 overflow-auto">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => onSuggestionClick(suggestion.city)}
          className="cursor-pointer p-2 hover:bg-[#3A475A]"
        >
          {suggestion.city}
        </li>
      ))}
    </ul>
  );
};

export default CitySuggestions;
