import Table from "../components/Table";
import { useState } from 'react';
import useCookie from 'react-use-cookie';
import { getRecordListApi } from "../service/recordService";
import { getUserByUsernameApi } from "../service/userService";
import { useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Errorhandler } from './../components/ErrorHandler';

function Record() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [filter, setFilter] = useState({ name: '', alias: '', unity: '', pageNumber: 0, pageSize: 10 });

  useQuery(["user"], async () => {
    return await getUserByUsernameApi();
  }, {
    onSettled: (data) => {
      if (data.success) {
        setBalance(data.data.balance);
      } else {
        Errorhandler(data, navigate, toast);
      }
    }
  });

  const endpoint = async (filters) => await getRecordListApi(filters);

  const columns = [
    { name: "operationType", label: "Operation", width: "80" },
    { name: "amount", label: "Cost", width: "80" },
    { name: "cost", label: "Balance", width: "30" },
    { name: "operationResult", label: "Result", width: "30" },
    { name: "date", label: "Date", width: "30" }
  ];

  return (
    <div className="flex flex-col items-center justify-start p-4 bg-gray-50 min-h-screen">
      <h3 className="font-bold text-lg bg-white p-4 rounded-md shadow-md ring-2">Balance: {balance}</h3>
      <h3 className="font-bold text-lg">Records</h3>
      <div className="flex flex-row flex-nowrap justify-center w-full">
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
