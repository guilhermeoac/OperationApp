import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Errorhandler } from './../components/ErrorHandler'
import { useMutation } from "react-query";
import useCookie from 'react-use-cookie';
import { useDispatch } from "react-redux";
import { loginUser, UserActionTypes } from "../redux/userReducer";
import TextButton from "../components/TextButton";
import { signInApi } from "../service/publicUserService";
import { ToastContainer, toast } from 'react-toastify';

function Home() {

  const [userToken, setUserToken] = useCookie('userToken', '');
  const [username, setUserName] = useCookie('username', '');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const recordRoute = () => navigate(`/record`)
  
  const registerRoute = () => navigate(`/register`)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  
  const login = useMutation(signInApi, {
    onSettled: (response) => {
      if (response.success) {
        setUserToken(`Bearer ${response.data}`);
        setUserName(watch("user"));
        dispatch(loginUser({type: UserActionTypes.LOGIN, payload: {}}));    
        recordRoute();
      } else {
        Errorhandler(response, navigate, toast);
      }
      
    },
  })

  const submitForm = (data) => login.mutateAsync(data)
  
  const signUp = () => registerRoute()
  return (
    <div className="flex flex-row justify-center pt-10">
      <div className="flex flex-col rounded-md bg-white ring-2 min-w-96">
        <form className="flex flex-col p-4 place-content-between" onSubmit={handleSubmit(submitForm)}>
          <h3 className="font-bold text-lg flex flex-row justify-center">Sign in</h3>
          <div className="pt-2 flex flex-row justify-center">
            <div className="grid grid-rows-4 w-3/6 content-around">
              <label className="pt-1">Username:</label>
              <input className="pt-1 rounded bg-slate-100" {...register("user", { required: "*This field is required" })} />
              {errors.login && <span className="font-bold text-sm text-red-600">{errors.login.message}</span>}
              <label className="pt-1" >Password:</label>
              <input className="pt-1 rounded bg-slate-100" type="password" {...register("password", { required: "*This field is required" })} />
              {errors.password && <span className="font-bold text-sm text-red-600" >{errors.password.message}</span>}
            </div>
          </div>
          <div className="pt-2 flex flex-row justify-center">
            <TextButton type="submit" label="Login" color="blue"/>
          </div>
        </form>
        <span className="underline text-cyan-500 flex flex-row justify-center" onClick={signUp}>Do not have a login? Sign up</span>
      </div>
    </div>
  );
}


export default Home;
