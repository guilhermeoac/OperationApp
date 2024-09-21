import TableFilter from "./TableFilter";
import { useState } from 'react';
import { BsArrowsVertical, BsArrowDown, BsArrowUp, BsSearch } from "react-icons/bs";
import ImageButton from "./ImageButton";
import Pagination from "../components/Pagination";
import { useQuery } from 'react-query'
import Loading from "./Loading";


function Table({columns, endpoint, filter, handlerFilter, invalidateCacheParam}) {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedLine, setSelectedLine] = useState({});
  const [applyFilter, setApplyFilter] = useState(true);
  const {isLoading, data} = useQuery([invalidateCacheParam, applyFilter, filter.pageNumber, filter.sortDirection, filter.pageSize], async () => await endpoint(filter)) 
  const orderStates = [ 'none', 'ASC', 'DESC']

  const nextOrder = (current, field) => {
    const index = orderStates.indexOf(current ?? 'none');
    const nextItem = (index + 1)%(orderStates.length);
    const nextOrderDirection = orderStates[nextItem];
    if('none' === nextOrderDirection) {
      handlerFilter({ ...filter, 'sortDirection': null, 'sortField': null })
    } else {
      handlerFilter({ ...filter, 'sortDirection': nextOrderDirection, 'sortField': field })
    }
  }

  if (isLoading) {
    return <Loading/>
  }
  return (
      <div className='flex flex-row justify-center p-4 min-w-max'>
        <div className="flex flex-col" >
          <div className="my-4">
            {showFilter && <TableFilter 
              columns={columns} 
              filter={filter} 
              handlerFilter={handlerFilter} 
              setApplyFilter={setApplyFilter}
              applyFilter={applyFilter} 
            />}
          </div>
          <table className='bg-white border-solid border-gray-200 table-fixed border-collapse'>
            <thead>
              <tr key="0" >
                {columns.map((column) =>
                  <th className={`p-2 text-left border-2 w-${column.width}`} key={column.name}>
                    <div className='flex flex-row justify-center' onClick={() => nextOrder(filter.sortDirection, column.name)}>
                      <label>{column.label}</label>
                      <div className='flex flex-col justify-center'>
                        {filter.sortDirection === 'ASC' && filter.sortField === column.name && <BsArrowDown />}
                        {filter.sortDirection === 'DESC' && filter.sortField === column.name && <BsArrowUp />}
                        {filter.sortField != column.name && <BsArrowsVertical />}
                      </div>
                    </div></th>
                )}
              </tr>
            </thead>
            {data.empty ? 
            <tbody>
              <span>Nenhum Registro Encontrado</span>
            </tbody> :
            <tbody>
                {data.content.map((item) =>
                  <tr className={selectedLine.id === item.id ? 'bg-cyan-50' : ''} key={item.id} onClick={() => setSelectedLine(item)}>{columns.map((column) => 
                    <td className="text-center border-2  w-6" key={column.name} >{item[column.name]}</td>
                  )}</tr>
                )}
            </tbody>}
          </table>
          <div className="flex flex-row justify-end">
            <Pagination filter={filter} setPage={handlerFilter} lastPage={data.totalPages - 1} setPageSize={handlerFilter}/>
          </div>
        </div>
        <div className='flex flex-col p-5'>
          <ImageButton type="button" label="Filter" img={<BsSearch />} color="gray" onClick={ () => setShowFilter(!showFilter)}/>
        </div>
      </div>
  );
}

export default Table;
