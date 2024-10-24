import React from 'react';

function Input({ label, type, placeholder, onChange, value, name, disable }) {
  return (
    <div className="w-full">
      <label className="font-semibold mb-2 text-gray-800 block">{label}:</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed transition duration-200"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        disabled={disable}
      />
    </div>
  );
}

export default Input;
