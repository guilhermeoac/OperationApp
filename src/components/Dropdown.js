
function Dropdown({items, item, setItem, title, className, id}) {
    return (
      <div className="flex flex-row justify-between pt-1">
        <select 
          title={title}
          className={className}
          id={id}
          name={id} 
          defaultValue={items[0]}
          value={item.type.type} 
          onChange={(e) => setItem( { ...item, 'type': e.target.options[e.target.selectedIndex].value, 'cost': items.find(it=>it.type===e.target.options[e.target.selectedIndex].value).cost})}>
            {items.map((it) =>
              <option key={it.type} value={it.type}>{it.type}</option>
            )}
        </select>
      </div>
  );
}

export default Dropdown;
