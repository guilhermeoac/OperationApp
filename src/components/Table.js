import TableFilter from "./TableFilter";
import { useState } from 'react';
import { BsArrowsVertical, BsArrowDown, BsArrowUp, BsSearch } from "react-icons/bs";
import ImageButton from "./ImageButton";
import Pagination from "../components/Pagination";
import { useQuery } from 'react-query';
import Loading from "./Loading";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Errorhandler } from './ErrorHandler'

function Table({ columns, endpoint, filter, handlerFilter, invalidateCacheParam }) {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [selectedLine, setSelectedLine] = useState({});
  const [applyFilter, setApplyFilter] = useState(true);
  const { isLoading, data } = useQuery([invalidateCacheParam, applyFilter, filter.pageNumber, filter.sortDirection, filter.pageSize], async () => await endpoint(filter), {
    onSettled: (data) => {
      console.log(data);
      if (!data.success) {
        Errorhandler(data, navigate, toast);
      }
    }
  });
  const orderStates = ['none', 'ASC', 'DESC'];

  const nextOrder = (current, field) => {
    const index = orderStates.indexOf(current ?? 'none');
    const nextItem = (index + 1) % (orderStates.length);
    const nextOrderDirection = orderStates[nextItem];
    if ('none' === nextOrderDirection) {
      handlerFilter({ ...filter, 'sortDirection': null, 'sortField': null });
    } else {
      handlerFilter({ ...filter, 'sortDirection': nextOrderDirection, 'sortField': field });
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day, year].join('/');
  };

  const formatFilterColumns = (columns) => {
    console.log(columns)
    console.log(columns.some((it) => it.name == "date"))

    if (columns.some((it) => it.name == "date")) {
      columns = columns.filter((it) => it.name != "date")
      columns.push({ "name": "beginDate", "label": "Inicial date" }, { "name": "endDate", "label": "End date" })
    }
    console.log(columns)
    return columns;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='flex flex-row items-center p-4'>
      <div className='flex flex-col items-center p-4'>
        <div className="w-full max-w-6xl">
          <div className="my-4">
            {showFilter && <TableFilter columns={formatFilterColumns(columns)} filter={filter} handlerFilter={handlerFilter} setApplyFilter={setApplyFilter} applyFilter={applyFilter} />}
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-200 rounded-lg shadow-sm'>
              <thead className='bg-gray-100'>
                <tr>
                  {columns.map((column) => (
                    <th className='p-4 text-left border-b border-gray-200' key={column.name}>
                      <div className='flex items-center justify-between cursor-pointer' onClick={() => nextOrder(filter.sortDirection, column.name)}>
                        <span>{column.label}</span>
                        <div className='flex items-center'>
                          {filter.sortDirection === 'ASC' && filter.sortField === column.name && <BsArrowDown />}
                          {filter.sortDirection === 'DESC' && filter.sortField === column.name && <BsArrowUp />}
                          {filter.sortField !== column.name && <BsArrowsVertical />}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.data.empty ? (
                  <tr>
                    <td colSpan={columns.length} className='text-center p-4'>Nenhum Registro Encontrado</td>
                  </tr>
                ) : (
                  data.data.content.map((item) => (
                    <tr className={`cursor-pointer ${selectedLine.id === item.id ? 'bg-cyan-50' : 'hover:bg-gray-50'}`} key={item.id} onClick={() => setSelectedLine(item)}>
                      {columns.map((column) => (
                        <td className='p-4 text-center border-b border-gray-200' key={column.name}>
                          {column.name === 'date' ? formatDate(item[column.name]) : item[column.name]}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <Pagination filter={filter} setPage={handlerFilter} lastPage={data.data.totalPages - 1} setPageSize={handlerFilter} />
          </div>
        </div>
      </div>
      <div className='flex flex-col p-5'>
        <ImageButton type="button" label="Filter" img={<BsSearch />} color="gray" onClick={() => setShowFilter(!showFilter)} />
      </div>
    </div>
  );
}

export default Table;