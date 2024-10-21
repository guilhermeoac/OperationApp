import Input from "./Input";
import TextButton from "./TextButton";
import React from 'react';

function TableFilter({ columns, filter, handlerFilter, applyFilter, setApplyFilter }) {
  
  const onChangeFilter = (e) => {
    handlerFilter({ ...filter, [e.target.name]: e.target.value });
  }

  const onSubmitFilter = (e) => {
    e.preventDefault();
    setApplyFilter(!applyFilter);
  }

  return (
    <div className="bg-gray-200 rounded-lg p-4 flex flex-col">
      <form className="grid grid-cols-1 md:grid-cols-6 gap-4" onSubmit={onSubmitFilter}>
        <div className="col-span-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {columns.map((column) => (
              <Input 
                key={column.name} 
                label={column.label} 
                type={["beginDate", "endDate"].includes(column.name) ? "date" : "text"} 
                onChange={onChangeFilter} 
                value={filter[column.name] ?? ""} 
                name={column.name}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <TextButton type="submit" label="Filter" color="blue" />
        </div>
      </form>
    </div>
  );
}

export default TableFilter;
