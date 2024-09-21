import Input from "./Input";
import TextButton from "./TextButton";


function TableFilter({columns, filter, handlerFilter, applyFilter, setApplyFilter}) {
  
  const onChangeFilter = (e) => {
    handlerFilter({ ...filter, [e.target.name]: e.target.value })
  }
  const onSubmitFilter = (e) => {
    e.preventDefault();
    setApplyFilter(!applyFilter)
  }
  return (
    <div className="bg-gray-200 rounded p-4 flex flex-row justify-start flex-wrap min-w-max">
      <form className="grid grid-cols-6" onSubmit={onSubmitFilter}>
        <div className="col-span-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 place-items-start " >
            {columns.map((column) =>
            <Input key={column.name} label={column.label} type="text" onChange={onChangeFilter} value={filter[column.name] ?? ""} name={column.name}/>)}
          </div>
        </div>
        <div className="place-self-center pl-6">
          <TextButton type="submit" label="Filter" color="blue"/>
        </div>
      </form>
    </div>
  );
}

export default TableFilter;
