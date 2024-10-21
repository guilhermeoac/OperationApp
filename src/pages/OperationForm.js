import React, { useState } from 'react';
import Input from "../components/Input";
import TextButton from "../components/TextButton";
import { useNavigate } from 'react-router-dom';
import { Errorhandler } from './../components/ErrorHandler';
import { useMutation } from 'react-query';
import { executeOperationApi } from "../service/operationService";
import { toast } from 'react-toastify';

function OperationForm() {
  const [operation, setOperation] = useState({ type: '', firstParam: '', secondParam: '' });
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

  const submit = (e) => {
    e.preventDefault();
    executeOperation.mutateAsync({type: operation.type, firstParam: operation.firstParam, secondParam: operation.secondParam});
  };

  const handleChange = (e) => {
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

  return (
    <div className="flex flex-row justify-center pt-10">
  <div className="grid gap-4 auto-rows-min justify-between rounded-lg bg-white shadow-md p-8 max-w-md w-full h-fit">
    <h3 className="font-bold text-lg text-center mb-8">Execute Operation</h3>
    <form onSubmit={submit}>
      <Input
        name="type"
        type="text"
        placeholder="Type"
        label="Type"
        value={operation?.type}
        onChange={handleChange}
      />
      <h1 className="font-bold text-sm text-gray-700 mb-4">
        Allowed types: ADDITION, SUBTRACTION, MULTIPLY, DIVISION, SQUARE_ROOT, RANDOM_STRING
      </h1>
      <Input
        name="firstParam"
        type="text"
        placeholder="First Param"
        label="First Param"
        value={operation?.firstParam}
        onChange={handleChange}
      />
      <Input
        name="secondParam"
        type="text"
        placeholder="Second Param"
        label="Second Param"
        value={operation?.secondParam}
        onChange={handleChange}
      />
      <div className="flex justify-center pt-6">
        <TextButton disable={isDisabled(operation)} type="submit" label="Execute" color="blue" />
      </div>
    </form>
  </div>
</div>
  );
}

export default OperationForm;
