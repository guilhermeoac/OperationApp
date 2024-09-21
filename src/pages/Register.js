import { useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';
import { signUpApi } from "../service/publicUserService";
import Input from "../components/Input";
import TextButton from "../components/TextButton";
import { useState } from 'react'

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({user: null, password: null});
  
  const savePublicForm = useMutation(signUpApi, {
    onSuccess: () => {
      navigate(`/`)
    },
  })
  const submit = (e) => {
    e.preventDefault()
    savePublicForm.mutateAsync({user: user.username, password: user.password});
  }
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const validateForm = (data) => {
    Object.values(data).some((value) => value==null || value == '')
  }
  
  const onSubmit = (data) => savePublicForm.mutateAsync(data)
  return (
    <div>
    <div className="flex flex-row justify-center pt-10">
      <div className="flex flex-col justify-between rounded-md bg-white ring-2 min-w-max">
        <h3 className="font-bold text-lg text-center">Execute Operation</h3>
        <form className="p-10 flex flex-col justify-between" onSubmit={submit}>
          <Input name="username" type={"text"} placeholder={"Username"} label={"Username"} value={user?.user} onChange={handleChange}></Input>
          <Input name="password" type={"password"} placeholder={"Password"} label={"Password"} value={user?.password} onChange={handleChange}></Input>
          <div className="flex flex-row justify-between pt-10">
            <TextButton disable={validateForm(user)} type="submit" label="Execute" color="blue"/>
          </div>
        </form>
      </div>
    </div>
    <span onClick={onSubmit}></span>
    </div>
  );
}


export default Register;
