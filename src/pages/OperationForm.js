import React, { useState } from 'react';
import Input from "../components/Input";
import TextButton from "../components/TextButton";
import { useNavigate } from 'react-router-dom';
import { Errorhandler } from './../components/ErrorHandler';
import { useMutation } from 'react-query';
import { executeOperationApi, getAllOperationsApi } from "../service/operationService";
import { toast } from 'react-toastify';
import Dropdown from '../components/Dropdown';
import { useQuery } from 'react-query';
import Loading from "../components/Loading";

function OperationForm() {
  const [operation, setOperation] = useState({ type: '', firstParam: '', secondParam: '', cost: '' });
  const navigate = useNavigate();
  
  const executeOperation = useMutation(executeOperationApi, {
    onSettled: (data) => {
      if (data.success) {
        navigate(`/record`);
      } else {
        Errorhandler(data, navigate, toast);
      }
    },
  });

  const { isLoading, data } = useQuery(['dropdown'], async () => await getAllOperationsApi(), {
    onSettled: (data) => {
      console.log(data);
      if (!data.success) {
        Errorhandler(data, navigate, toast);
      }
    }
  });

  const submit = (e) => {
    e.preventDefault();
    executeOperation.mutateAsync({type: operation.type, firstParam: operation.firstParam, secondParam: operation.secondParam});
  };

  const handleChange = (e) => {
    console.log(operation);
    setOperation({ ...operation, [e.target.name]: e.target.value });
  };

  const isDisabled = (operation) => {
    console.log(operation);
    const type = !(["ADDITION", "SUBTRACTION", "MULTIPLY", "DIVISION", "SQUARE_ROOT", "RANDOM_STRING"].includes(operation.type))
    let fields = false
    if(["ADDITION", "SUBTRACTION", "MULTIPLY", "DIVISION"].includes(operation.type)) {
        fields = operation.firstParam == null || operation.firstParam == '' || operation.secondParam == null || operation.secondParam == ''
    } else if (operation.type == "SQUARE_ROOT") {
        fields = operation.firstParam == null || operation.firstParam == ''
    }
    return type || fields
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-row justify-center pt-10">
  <div className="grid gap-4 auto-rows-min justify-between rounded-lg bg-white shadow-md p-8 max-w-md w-full h-fit">
    <h3 className="font-bold text-lg text-center mb-8">Execute Operation</h3>
    <form onSubmit={submit}>
      <Dropdown
        items={data.data ?? []}
        item={operation}
        setItem={setOperation}
        title="Type"
        className=""
        id="type"
      ></Dropdown>
      <Input
        name="cost"
        type="text"
        placeholder="Cost"
        label="Cost"
        value={operation.cost}
        disable={true}
      />
      {!["RANDOM_STRING"].includes(operation.type) &&<Input
        name="firstParam"
        type="text"
        placeholder="First Param"
        label="First Param"
        value={operation?.firstParam}
        onChange={handleChange}
      />}
      {!["SQUARE_ROOT", "RANDOM_STRING"].includes(operation.type) && <Input
        name="secondParam"
        type="text"
        placeholder="Second Param"
        label="Second Param"
        value={operation?.secondParam}
        onChange={handleChange}
      />}
      <div className="flex justify-center pt-6">
        <TextButton disable={isDisabled(operation)} type="submit" label="Execute" color="blue" />
      </div>
    </form>
  </div>
</div>
  );
}

export default OperationForm;
