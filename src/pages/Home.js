import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Errorhandler } from './../components/ErrorHandler'
import { useMutation } from "react-query";
import useCookie from 'react-use-cookie';
import { useDispatch } from "react-redux";
import { loginUser, UserActionTypes } from "../redux/userReducer";
import TextButton from "../components/TextButton";
import { signInApi } from "../service/publicUserService";
import { ToastContainer, toast } from 'react-toastify';
import Input from "../components/Input";

function Home() {
  const [userToken, setUserToken] = useCookie('userToken', '');
  const [username, setUserName] = useCookie('username', '');
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const recordRoute = () => navigate(`/record`)
  
  const registerRoute = () => navigate(`/register`)
  
  const login = useMutation(signInApi, {
    onSettled: (response) => {
      if (response.success) {
        setUserToken(`Bearer ${response.data}`);
        setUserName(user.username);
        dispatch(loginUser({type: UserActionTypes.LOGIN, payload: {}}));    
        recordRoute();
      } else {
        Errorhandler(response, navigate, toast);
      }
      
    },
  })
  
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    login.mutateAsync({ user: user.username, password: user.password });
  };

  const validateForm = (data) => {
    return Object.values(data).some((value) => value === null || value === '');
  };
  
  const signUp = () => registerRoute()
  return (
    <div className="flex justify-center py-10">
      <div className="flex flex-col rounded-lg bg-white shadow-md p-8 max-w-md w-full h-fit">
        <h3 className="font-bold text-2xl flex flex-row justify-center mb-6 text-gray-700">Sign in</h3>
        <form className="space-y-6" onSubmit={submitForm}>
          <Input name="username" type="text" placeholder="Username" label="Username" value={user.username} onChange={handleChange} />
          <Input name="password" type="password" placeholder="Password" label="Password" value={user.password} onChange={handleChange} />
          <div className="flex justify-center">
            <TextButton disable={validateForm(user)} type="submit" label="Login" color="blue" />
          </div>
        </form>
        <span className="underline text-blue-500 cursor-pointer text-center block mt-4" onClick={() => signUp()}>Do not have an account? Sign up</span>
      </div>
    </div>
  );
}

export default Home;
