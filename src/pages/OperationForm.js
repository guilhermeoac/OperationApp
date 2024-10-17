import Input from "../components/Input";
import TextButton from "../components/TextButton";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import {
  useMutation
} from 'react-query'
import { executeOperationApi } from "../service/operationService";

function OperationForm() {
  const [operation, setOperation] = useState({type: null, firstParam: null, secondParam: null});
  const navigate = useNavigate();
  
  const executeOperation = useMutation(executeOperationApi, {
    onSettled: (data) => {
      if ( data.success) {
        navigate(`/record`)
      } else {
        toast(data.message);
      }
    },

  })


  const submit = (e) => {
    try {
      e.preventDefault()
      executeOperation.mutateAsync({type: operation.type, firstParam: operation.firstParam, secondParam: operation.secondParam});
    } catch (error) {
      console.log(error);
    }
  }
  function handleChange(e) {
    setOperation({ ...operation, [e.target.name]: e.target.value })
  }

  const validateForm = (data) => {
    Object.values(data).some((value) => value==null || value == '')
  }
  
  return (
    <div className="flex flex-row justify-center pt-10">
      <div className="flex flex-col justify-between rounded-md bg-white ring-2 min-w-max">
        <h3 className="font-bold text-lg text-center">Execute Operation</h3>
        <form className="p-10 flex flex-col justify-between" onSubmit={submit}>
          <Input name="type" type={"text"} placeholder={"Type"} label={"Type"} value={operation?.type} onChange={handleChange}></Input>
          <Input name="firstParam" type={"text"} placeholder={"First Param"} label={"First Param"} value={operation?.firstParam} onChange={handleChange}></Input>
          <Input name="secondParam" type={"text"} placeholder={"Second Param"} label={"Second Param"} value={operation?.secondParam} onChange={handleChange}></Input>
          <div className="flex flex-row justify-between pt-10">
            <TextButton disable={validateForm(operation)} type="submit" label="Execute" color="blue"/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OperationForm;
