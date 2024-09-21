
function Dropdown({items, item, setItem, title, className, id, defaultValue}) {
    return (
      <div className="flex flex-row justify-between pt-1">
        <select 
          title={title}
          className={className}
          id={id}
          name={id} 
          defaultValue={defaultValue}
          value={item.name} 
          onChange={(e) => setItem( e.target.options[e.target.selectedIndex].value)}>
            {items.map((it) =>
              <option key={it.id} value={it.id}>{it.alias ?? it.name}</option>
            )}
        </select>
      </div>
  );
}

export default Dropdown;
