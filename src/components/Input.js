function Input({ label, type, placeholder, onChange, value, name, disable }) {
  return (
    <div className="flex flex-col w-full max-w-xs mb-4">
      <label className="font-semibold mb-2 text-gray-700">{label}:</label>
      <input
        className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-3"
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