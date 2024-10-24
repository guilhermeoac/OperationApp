import Table from "../components/Table";
import { useState } from 'react';
import { getRecordListApi } from "../service/recordService";

function Record() {
  const [filter, setFilter] = useState({ name: '', alias: '', unity: '', pageNumber: 0, pageSize: 10 });

  const endpoint = async (filters) => await getRecordListApi(filters);

  const columns = [
    { name: "operationType", label: "Operation", width: "80" },
    { name: "amount", label: "Cost", width: "80" },
    { name: "cost", label: "Balance", width: "30" },
    { name: "operationResult", label: "Result", width: "30" },
    { name: "date", label: "Date", width: "30" }
  ];

  return (
    <div className="flex flex-col items-center justify-start p-4 bg-gray-50 min-h-screen gap-4">
      <h3 className="font-bold text-lg">Records</h3>
      <div className="grid gap-1 justify-center w-full">
        <Table 
          columns={columns}
          endpoint={endpoint}
          filter={filter}
          handlerFilter={setFilter}
          invalidateCacheParam="record"
        />
      </div>
    </div>
  );
}

export default Record;
