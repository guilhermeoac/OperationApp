import React from 'react';

function ImageButton({ type, img, color, onClick, disable, label }) {
  
  const buttonClass = `rounded-full bg-${color}-600 cursor-pointer fill-white h-8 w-8 flex items-center justify-center`;

  return (
    <div className="pt-2 cursor-pointer">
      <button className={buttonClass} type={type} onClick={onClick} disabled={disable} title={label}>
        <div className="text-white">{img}</div>
      </button>
    </div>
  );
}

export default ImageButton;
