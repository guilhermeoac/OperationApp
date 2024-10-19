import Table from "../components/Table";
import { useState } from 'react'
import useCookie from 'react-use-cookie';
import { getRecordListApi } from "../service/recordService";
import { getUserByUsernameApi } from "../service/userService";
import {
  useQuery
} from 'react-query'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Errorhandler } from './../components/ErrorHandler'

function Record() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState();
  const [filter, setFilter] = useState({name: null, alias: null, unity: null, pageNumber: 0, pageSize: 10});

  
  
  useQuery(["record"], async () => {
    return await getUserByUsernameApi()
  },{
    onSettled: (data) => {
      if (data.success) {
        setBalance(data.data.balance);
      } else {
        Errorhandler(data, navigate, toast);
      }
      
    }
  }) 

  const endpoint = async (filters) => await getRecordListApi(filters)
  
  const columns = [{name: "operationType", label: "Operation", width: "80"}, {name: "amount", label: "Cost", width: "80"}, {name: "cost", label: "Balance", width: "30"}, {name: "operationResult", label: "Result", width: "30"}, {name: "date", label: "Date", width: "30"}  ];

  return (
    <div className="flex flex-col justify-around">
      <h3 className="font-bold text-lg flex flex-row justify-center rounded-md bg-white ring-2 min-w-96">Balance: {balance}</h3>
      <h3 className="font-bold text-lg flex flex-row justify-center">Records</h3>
      <div className="flex flex-row flex-nowrap justify-center p-4">
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
