import Input from "../components/Input";
import TextButton from "../components/TextButton";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import {
  useMutation
} from 'react-query'
import { executeOperationApi } from "../service/operationService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OperationForm() {
  const [operation, setOperation] = useState({type: null, firstParam: null, secondParam: null});
  const navigate = useNavigate();
  
  const executeOperation = useMutation(executeOperationApi, {
    onSettled: (data) => {
      if (data.success) {
        navigate(`/record`)
      } else {
        toast.error(data.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          });
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

  const isDisabled = (operation) => {
    console.log(operation);
    var type = !(["ADDITION", "SUBTRACTION", "MULTIPLY", "DIVISION", "SQUARE_ROOT", "RANDOM_STRING"].includes(operation.type))
    var fields = false
    if(["ADDITION", "SUBTRACTION", "MULTIPLY", "DIVISION"].includes(operation.type)) {
        fields = operation.firstParam == null || operation.firstParam == '' || operation.secondParam == null || operation.secondParam == ''
    } else if (operation.type == "SQUARE_ROOT") {
        fields = operation.firstParam == null || operation.firstParam == ''
    }
    return type || fields
  }
  
  return (
    <>
    <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"/>
    <div className="flex flex-row justify-center pt-10">
      <div className="flex flex-col justify-between rounded-md bg-white ring-2 min-w-max">
        <h3 className="font-bold text-lg text-center">Execute Operation</h3>
        <form className="p-10 flex flex-col justify-between" onSubmit={submit}>
          <Input name="type" type={"text"} placeholder={"Type"} label={"Type"} value={operation?.type} onChange={handleChange}></Input>
          <Input name="firstParam" type={"text"} placeholder={"First Param"} label={"First Param"} value={operation?.firstParam} onChange={handleChange}></Input>
          <Input name="secondParam" type={"text"} placeholder={"Second Param"} label={"Second Param"} value={operation?.secondParam} onChange={handleChange}></Input>
          <div className="flex flex-row justify-between pt-10">
            <TextButton disable={isDisabled(operation)} type="submit" label="Execute" color="blue"/>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default OperationForm;
