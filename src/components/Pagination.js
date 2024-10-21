import { BiChevronsLeft, BiChevronLeft, BiChevronsRight, BiChevronRight } from "react-icons/bi";
import React from 'react';

function Pagination({ filter, setPage, lastPage }) {
  
  const setFirstPage = () => setPage({ ...filter, 'pageNumber': 0 });
  const setPreviousPage = () => setPage({ ...filter, 'pageNumber': Math.max(0, filter.pageNumber - 1) });
  const setNextPage = () => setPage({ ...filter, 'pageNumber': Math.min(lastPage, filter.pageNumber + 1) });
  const setLastPage = () => setPage({ ...filter, 'pageNumber': lastPage });
  const setPageNumber = (num) => setPage({ ...filter, 'pageNumber': num });

  return (
    <div className="flex items-center justify-between pt-2">
      <button className="disabled:bg-gray-200 bg-white text-center font-semibold border border-gray-200 rounded-lg p-2" disabled={filter.pageNumber < 1} onClick={setFirstPage} title="First">
        <BiChevronsLeft />
      </button>
      <button className="disabled:bg-gray-200 bg-white text-center font-semibold border border-gray-200 rounded-lg p-2" disabled={filter.pageNumber < 1} onClick={setPreviousPage} title="Previous">
        <BiChevronLeft />
      </button>

      {filter.pageNumber - 2 >= 0 && (
        <span className="bg-white text-center font-semibold border border-gray-200 rounded-lg p-2 cursor-pointer" onClick={() => setPageNumber(filter.pageNumber - 2)}>
          {filter.pageNumber - 1}
        </span>
      )}
      {filter.pageNumber - 1 >= 0 && (
        <span className="bg-white text-center font-semibold border border-gray-200 rounded-lg p-2 cursor-pointer" onClick={() => setPageNumber(filter.pageNumber - 1)}>
          {filter.pageNumber}
        </span>
      )}
      <span className="bg-blue-500 text-white text-center font-semibold rounded-lg p-2" title="Current">
        {filter.pageNumber + 1}
      </span>
      {filter.pageNumber + 1 <= lastPage && (
        <span className="bg-white text-center font-semibold border border-gray-200 rounded-lg p-2 cursor-pointer" onClick={() => setPageNumber(filter.pageNumber + 1)}>
          {filter.pageNumber + 2}
        </span>
      )}
      {filter.pageNumber + 2 <= lastPage && (
        <span className="bg-white text-center font-semibold border border-gray-200 rounded-lg p-2 cursor-pointer" onClick={() => setPageNumber(filter.pageNumber + 2)}>
          {filter.pageNumber + 3}
        </span>
      )}
      <button className="disabled:bg-gray-200 bg-white text-center font-semibold border border-gray-200 rounded-lg p-2" disabled={filter.pageNumber >= lastPage} onClick={setNextPage} title="Next">
        <BiChevronRight />
      </button>
      <button className="disabled:bg-gray-200 bg-white text-center font-semibold border border-gray-200 rounded-lg p-2" disabled={filter.pageNumber >= lastPage} onClick={setLastPage} title="Last">
        <BiChevronsRight />
      </button>
      <select 
        title="Page size"
        className="bg-white text-center font-semibold border border-gray-200 rounded-lg p-2"
        id="pageSize" 
        name="pageSize" 
        value={filter.pageSize} 
        onChange={(e) => setPage({ ...filter, 'pageSize': e.target.value })}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
}

export default Pagination;
