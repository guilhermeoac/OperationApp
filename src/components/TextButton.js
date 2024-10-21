import React from 'react';

function TextButton({ label, type, color, disable, onClick }) {
  const buttonClass = `h-10 w-32 rounded-md text-white font-semibold transition duration-200 ${disable ? 'bg-gray-400 cursor-not-allowed' : `bg-${color}-600 hover:bg-${color}-500`}`;
  
  return (
    <button className={buttonClass} type={type} disabled={disable} title={label} onClick={onClick}>
      {label}
    </button>
  );
}

export default TextButton;
