
function TextButton({label, type, color, disable, onClick}) {
  const buttonClass = `bg-blue-600 h-6 w-24 rounded text-white font-semibold`
    return (
      <button className={buttonClass} type={type} disabled={disable} title={label} onClick={onClick}>
        {label}
      </button>
  );
}

export default TextButton;
