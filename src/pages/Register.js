import { useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';
import { signUpApi } from "../service/publicUserService";
import Input from "../components/Input";
import TextButton from "../components/TextButton";
import { useState } from 'react';

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', password: '' });
  const [message, setMessage] = useState(null);

  const savePublicForm = useMutation(signUpApi, {
    onSuccess: () => {
      navigate(`/`);
    },
    onError: (data) => {
      setMessage(data.response.data.message);
    }
  });

  const submit = (e) => {
    e.preventDefault();
    savePublicForm.mutateAsync({ username: user.username, password: user.password });
  };

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const validateForm = (data) => {
    return Object.values(data).some((value) => value === null || value === '');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-center text-gray-700">Register</h3>
        <form className="space-y-6" onSubmit={submit}>
          <Input name="username" type="text" placeholder="Username" label="Username" value={user.username} onChange={handleChange} />
          <Input name="password" type="password" placeholder="Password" label="Password" value={user.password} onChange={handleChange} />
          <div className="flex justify-center">
            <TextButton disable={validateForm(user)} type="submit" label="Register" color="blue" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;