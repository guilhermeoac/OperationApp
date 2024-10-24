function Dropdown({ items, item, setItem, title, id }) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="font-semibold mb-2 text-gray-800 block">{title}:</label>
      <select
        id={id}
        name={id}
        value={item.type}
        onChange={(e) => setItem({
          ...item,
          type: e.target.value,
          cost: items.find(it => it.type === e.target.value).cost
        })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition duration-200"
      >
        {items.map((it) => (
          <option key={it.type} value={it.type}>
            {it.type}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
