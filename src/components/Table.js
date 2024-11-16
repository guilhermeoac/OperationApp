import TableFilter from "./TableFilter";
import React, { useState } from 'react';
import { BsArrowsVertical, BsArrowDown, BsArrowUp, BsSearch } from "react-icons/bs";
import { IoIosTrash } from "react-icons/io";
import ImageButton from "./ImageButton";
import Pagination from "./Pagination";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import Loading from "./Loading";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Errorhandler } from './ErrorHandler';

import { IoAddSharp } from "react-icons/io5";

function Table({ columns, endpoint, filter, handlerFilter, invalidateCacheParam, deleteItemEndpoint }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showFilter, setShowFilter] = useState(false);
  const [selectedLine, setSelectedLine] = useState({});
  const [applyFilter, setApplyFilter] = useState(true);

  const { isLoading, data } = useQuery([invalidateCacheParam, applyFilter, filter.pageNumber, filter.sortDirection, filter.pageSize], async () => await endpoint(filter), {
    onSettled: (data) => {
      if (!data.success) {
        Errorhandler(data, navigate, toast);
      }
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    }
  });

  const deleteItem = useMutation(deleteItemEndpoint, {
    onSettled: (data) => {
      console.log(data);
      if (!data.success) {
        Errorhandler(data, navigate, toast);
      }
      queryClient.invalidateQueries({ queryKey: [invalidateCacheParam] });
    },
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
    if (columns.some(it => it.name === "date")) {
      columns = columns.filter(it => it.name !== "date");
      columns.push({ "name": "beginDate", "label": "Initial Date" }, { "name": "endDate", "label": "End Date" });
    }
    return columns;
  };

  if (isLoading || deleteItem.isLoading) {
    return <Loading />;
  }

  console.log(deleteItem);
  return (
    <div className='flex flex-row items-start'>
      <div className='flex flex-col items-center'>
        <div className="w-full max-w-6xl ">
          <div className="my-4">
            {showFilter && (
              <TableFilter 
                columns={formatFilterColumns(columns)} 
                filter={filter} 
                handlerFilter={handlerFilter} 
                setApplyFilter={setApplyFilter} 
                applyFilter={applyFilter} 
              />
            )}
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-6x1 bg-white border border-gray-200 rounded-lg shadow-md w-full'>
              <thead className='bg-gray-100 rounded-t-lg'>
                <tr>
                  {columns.map((column) => (
                    <th className='p-8 text-left border-b border-gray-300 font-semibold text-gray-700 text-sm uppercase tracking-wider' key={column.name}>
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
                    <th className='p-8 text-left border-b border-gray-300 font-semibold text-gray-700 text-sm uppercase tracking-wider' key="button">
                      <div className='flex items-center justify-between cursor-pointer'>
                        <span></span>
                      </div>
                    </th>
                </tr>
              </thead>
              <tbody>
                {data.data.empty ? (
                  <tr>
                    <td colSpan={columns.length} className='text-center p-4 text-gray-500'>No Records Found</td>
                  </tr>
                ) : (
                  data.data.content.map((item) => (
                    <tr className={`${!item.active ? 'bg-gray-200' : 'hover:bg-gray-50'}`} key={item.id}>
                      {columns.map((column) => (
                        <td className='p-4 text-center border-b border-gray-300 text-sm' key={column.name}>
                          {column.name === 'date' ? formatDate(item[column.name]) : item[column.name]}
                        </td>
                      ))}
                      <td  className='p-4 text-center border-b border-gray-300 text-sm' key="button">
                        {item.active &&
                          <ImageButton type="button" label="Delete" img={<IoIosTrash />} color="gray" onClick={() => deleteItem.mutateAsync(item.id)} />
                        }
                      </td>
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
        <ImageButton type="button" label="Execute Operation" img={<IoAddSharp />} color="blue" onClick={() => navigate("/execute-operation")} />
      </div>
    </div>
  );
}

export default Table;
