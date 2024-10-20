import { useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';
import { signUpApi } from "../service/publicUserService";
import Input from "../components/Input";
import TextButton from "../components/TextButton";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Errorhandler } from './../components/ErrorHandler';

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', password: '' });

  const savePublicForm = useMutation(signUpApi, {
    onSettled: (data) => {
      if (data.success) {
        navigate(`/`);
      } else {
        Errorhandler(data, navigate, toast);
      }
    }
  });

  const submit = (e) => {
    e.preventDefault();
    savePublicForm.mutateAsync({ user: user.username, password: user.password });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    return Object.values(user).some((value) => value === null || value === '');
  };

  return (
    <div className="flex justify-center bg-gray-100 py-10">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md h-fit">
        <h3 className="text-2xl font-bold text-center text-gray-700">Register</h3>
        <form className="space-y-6" onSubmit={submit}>
          <Input name="username" type="text" placeholder="Username" label="Username" value={user.username} onChange={handleChange} />
          <Input name="password" type="password" placeholder="Password" label="Password" value={user.password} onChange={handleChange} />
          <div className="flex justify-center">
            <TextButton disable={validateForm()} type="submit" label="Register" color="blue" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
