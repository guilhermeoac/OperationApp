function Input({ label, type, placeholder, onChange, value, name, disable, formHookProps, errorsProps }) {
  return (
    <div className="flex flex-col w-full max-w-xs mb-4">
      <label className="font-semibold mb-2 text-gray-700">{label}:</label>
      {formHookProps ? (
        <input
          className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-3"
          type={type}
          {...formHookProps}
        />
      ) : (
        <input
          className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-3"
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
          disabled={disable}
        />
      )}
      {errorsProps && <span className="text-red-500 text-sm mt-1">{errorsProps}</span>}
    </div>
  );
}

export default Input;