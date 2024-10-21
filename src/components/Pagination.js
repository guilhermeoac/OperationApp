import { BiChevronsLeft, BiChevronLeft, BiChevronsRight, BiChevronRight } from "react-icons/bi";
import React from 'react';



function Pagination({filter, setPage, lastPage, setPageSize}) {
  const setFirstPage = () => setPage({ ...filter, 'pageNumber': 0 })
  const setPreviousPage = () => setPage({ ...filter, 'pageNumber':filter.pageNumber - 1 })
  const setNextPage = () => setPage({ ...filter, 'pageNumber':filter.pageNumber + 1 })
  const setLastPage = () => setPage({ ...filter, 'pageNumber':lastPage })
  const setPageNumber = (num) => setPage({ ...filter, 'pageNumber':num })
    return (
      <div className="flex flex-row justify-between pt-1">
        <button className="disabled:bg-gray-200 bg-white text-center font-semibold min-w-6 mx-0.5 border-solid border-gray-200 border-2" disabled={filter.pageNumber<1} type="button" onClick={setFirstPage} title="First">{<BiChevronsLeft />}</button>
        <button className="disabled:bg-gray-200 bg-white text-center font-semibold min-w-6 mx-0.5 border-solid border-gray-200 border-2" disabled={filter.pageNumber<1} type="button" onClick={setPreviousPage} title="Previous">{<BiChevronLeft />}</button>
        {filter.pageNumber-2 >= 0 && <span className="bg-white  text-center font-semibold min-w-6 mx-0.5 border-solid border-gray-200 border-2" onClick={() => setPageNumber(filter.pageNumber-2)}>{filter.pageNumber-1}</span>}
        {filter.pageNumber-1 >= 0 && <span className="bg-white  text-center font-semibold min-w-6 mx-0.5 border-solid border-gray-200 border-2" onClick={() => setPageNumber(filter.pageNumber-1)}>{filter.pageNumber}</span>}
        <span className="bg-white text-center font-semibold min-w-6 mx-0.5 border-solid border-blue-500 border-2" title="Current">{filter.pageNumber +1}</span>
        {filter.pageNumber+1 <= lastPage && <span className="bg-white text-center font-semibold min-w-6 mx-0.5 border-solid border-gray-200 border-2" onClick={() => setPageNumber(filter.pageNumber+1)}>{filter.pageNumber+2}</span>}
        {filter.pageNumber+2 <= lastPage && <span className="bg-white text-center font-semibold min-w-6 mx-0.5 border-solid border-gray-200 border-2" onClick={() => setPageNumber(filter.pageNumber+2)}>{filter.pageNumber+3}</span>}
        <button className="disabled:bg-gray-200 bg-white text-center font-semibold min-w-6 mx-0.5 border-solid border-gray-200 border-2" disabled={filter.pageNumber>=lastPage} type="button" onClick={setNextPage} title="Next">{<BiChevronRight />}</button>
        <button className="disabled:bg-gray-200 bg-white text-center font-semibold min-w-6 mx-0.5 border-solid border-gray-200 border-2" disabled={filter.pageNumber>=lastPage} type="button" onClick={setLastPage} title="Last">{<BiChevronsRight />}</button>
        <select 
          title="Page size"
          className="bg-white  text-center font-semibold min-w-6 mx-0.5 border-solid border-gray-200 border-2"
          id="pageSize" 
          name="pageSize" 
          defaultValue="10" 
          value={filter.pageSize} 
          onChange={(e) => setPage({ ...filter, 'pageSize': e.target.options[e.target.selectedIndex].text })}>
            <option value="5">5</option>
            <option value="10" >10</option>
            <option value="20">20</option>
            <option value="50">50</option>
        </select>
      </div>
  );
}

export default Pagination;
