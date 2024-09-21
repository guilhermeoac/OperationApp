
function Input({label, type, placeholder, onChange, value, name, disable, formHookProps, errorsProps}) {
  return (
    <div className="flex flex-row  justify-between w-72">
      <label className="font-semibold">{label}:</label>
      {formHookProps ? <input className="border-b-2 min-w-48" type={type} {...formHookProps}/> : <input
          className="focus-visible:outline-none focus-visible:bg-gray-100 border-b-2 min-w-48 border-black"
          type={type} 
          placeholder={placeholder} 
          onChange={onChange} 
          value={value}
          name={name}
          disabled={disable}
      ></input>}
      {errorsProps}
    </div>
  );
}

export default Input;
