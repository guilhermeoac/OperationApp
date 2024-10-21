import React from 'react';

function Input({ label, type, placeholder, onChange, value, name, disable }) {
  return (
    <div className="flex flex-col w-full max-w-md mb-4">
      <label className="font-semibold mb-2 text-gray-800">{label}:</label>
      <input
        className="border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none py-2 px-3 transition duration-200"
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
