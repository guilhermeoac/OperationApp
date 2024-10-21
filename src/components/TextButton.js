import React from 'react';

function TextButton({label, type, color, disable, onClick}) {
  const buttonClass = `bg-blue-600 h-6 w-24 rounded text-white font-semibold`
  const buttondisableClass = `bg-gray-600 h-6 w-24 rounded text-white font-semibold`
  if (disable) {
    return (
      <button className={buttondisableClass} type={type} disabled={disable} title={label} onClick={onClick}>
        {label}
      </button>
  );
  }
    return (
      <button className={buttonClass} type={type} disabled={disable} title={label} onClick={onClick}>
        {label}
      </button>
  );
}

export default TextButton;
