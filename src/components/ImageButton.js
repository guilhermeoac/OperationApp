import React from 'react';
function ImageButton({type, img, color, onClick, disable}) {

    const buttonClass = `rounded-full bg-${color}-600 cursor-pointer fill-white h-8 w-8`
    return (
      <div className="pt-2 cursor-pointer">
        {disable == true && <button className={buttonClass} type={type} onClick={onClick} disabled>
        <div className="flex flex-row justify-center cursor-pointer text-white">{img}</div></button>}
        {!disable && <button className={buttonClass} type={type} onClick={onClick}>
        <div className="flex flex-row justify-center cursor-pointer text-white">{img}</div></button>}
      </div>
  );
}

export default ImageButton;
