import React, { useState } from 'react';
import Input from "../components/Input";
import TextButton from "../components/TextButton";
import { useNavigate } from 'react-router-dom';
import { Errorhandler } from './../components/ErrorHandler';
import { useMutation } from 'react-query';
import { executeOperationApi, getAllOperationsApi } from "../service/operationService";
import { toast } from 'react-toastify';
import Dropdown from '../components/Dropdown';
import { useQuery, useQueryClient  } from 'react-query';
import Loading from "../components/Loading";
import Modal from 'react-modal';

function OperationForm() {
  const [operation, setOperation] = useState({ type: '', firstParam: '', secondParam: '', cost: '', result: null });
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const executeOperation = useMutation(executeOperationApi, {
    onSettled: (data) => {
      if (data.success) {
        setOperation({...operation, 'result': data.data.result});
        setOpenModal(true);
      } else {
        Errorhandler(data, navigate, toast);
      }
    },
  });

  const { isLoading, data } = useQuery(['dropdown'], async () => await getAllOperationsApi(), {
    onSettled: (data) => {
      if (!data.success) {
        Errorhandler(data, navigate, toast);
      } else {
        setOperation({ ...operation, 'type': data.data[0].type, 'cost': data.data[0].cost })
      }
    }
  });

  const submit = (e) => {
    e.preventDefault();
    executeOperation.mutateAsync({
      type: operation.type, 
      firstParam: operation.firstParam, 
      secondParam: operation.secondParam
    });
  };

  const handleChange = (e) => {
    setOperation({ ...operation, [e.target.name]: e.target.value });
  };

  const isDisabled = (operation) => {
    console.log(operation);
    const type = !(["ADDITION", "SUBTRACTION", "MULTIPLY", "DIVISION", "SQUARE_ROOT", "RANDOM_STRING"].includes(operation.type))
    let fields = false
    if(["ADDITION", "SUBTRACTION", "MULTIPLY", "DIVISION"].includes(operation.type)) {
        fields = operation.firstParam === null || operation.firstParam === '' || operation.secondParam === null || operation.secondParam === ''
    } else if (operation.type === "SQUARE_ROOT") {
        fields = operation.firstParam === null || operation.firstParam === ''
    }
    return type || fields
  }

  if (isLoading || executeOperation.isLoading) {
    return <Loading />;
  }

  const closeModal = () => {
    setOpenModal(false);
  }
  const leavePage = () => {
    queryClient.invalidateQueries({ queryKey: ['balance', 'record'] });
    navigate(`/record`);
    setOpenModal(false);
  }

  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        contentLabel="Operation Result"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-10 space-y-4 transform transition-all"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-lg font-semibold text-gray-800">Operation Result</h2>
        <div className="space-y-2">
          <div><span className="font-medium">Type:</span> {operation.type}</div>
          <div><span className="font-medium">Cost:</span> {operation.cost}</div>
          {!["RANDOM_STRING"].includes(operation.type) && (
          <div><span className="font-medium">First Param:</span> {operation.firstParam}</div>
        )}
        {!["SQUARE_ROOT", "RANDOM_STRING"].includes(operation.type) && (
          <div><span className="font-medium">Second Param:</span> {operation.secondParam}</div>
        )}
          <div><span className="font-medium">Result:</span> {operation.result}</div>
        </div>
        <div className="flex justify-end space-x-3 mt-4">
          <TextButton onClick={closeModal} label="New Operation" color="blue" />
          <TextButton onClick={leavePage} label="Back" color="gray" />
        </div>
      </Modal>
      <div className="flex justify-center pt-10">
        <div className="grid gap-6 bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h3 className="text-xl font-bold text-center text-gray-700 mb-6">Execute Operation</h3>
          <form id="operationForm" onSubmit={submit} className="space-y-4">
            <Dropdown
              items={data.data ?? []}
              item={operation}
              setItem={setOperation}
              title="Type"
              id="type"
            />
            <Input
              name="cost"
              type="text"
              placeholder="Cost"
              label="Cost"
              value={operation.cost}
              disable={true}
            />
            {!["RANDOM_STRING"].includes(operation.type) && (
              <Input
                name="firstParam"
                type="text"
                placeholder="First Parameter"
                label="First Parameter"
                value={operation.firstParam}
                onChange={handleChange}
              />
            )}
            {!["SQUARE_ROOT", "RANDOM_STRING"].includes(operation.type) && (
              <Input
                name="secondParam"
                type="text"
                placeholder="Second Parameter"
                label="Second Parameter"
                value={operation.secondParam}
                onChange={handleChange}
              />
            )}
            <div className="flex justify-center">
              <TextButton
                disable={isDisabled(operation)}
                type="submit"
                label="Execute"
                color="blue"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default OperationForm;
