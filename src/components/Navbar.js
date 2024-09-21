import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, UserActionTypes } from "../redux/userReducer";
import { setCookie } from 'react-use-cookie';
import { IoArrowBackSharp } from "react-icons/io5";
import ImageButton from "./ImageButton";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const  {currentUser} = useSelector((state) => state.userReducer);
  
  
  return (
      <div className="flex flex-row h-24 bg-black items-center">
        <div className="justify-start h-24 bg-black items-center text-white">
          <ImageButton type="button" label="Filter" img={<IoArrowBackSharp  />} color="black" onClick={() => navigate(-1)}/>
        </div>
        {currentUser?.payload && 
        <div className="flex flex-row justify-end h-24 bg-black items-center">
          <ul className="flex flex-row justify-end text-white">
            {currentUser?.type === UserActionTypes.LOGIN && <li className="">
              <span onClick={() => {
                dispatch(logoutUser(UserActionTypes.LOGOUT))
                setCookie('userToken', null)
                setCookie('username', null)
                navigate("/")
              }}>Logout</span>
            </li>}
          </ul>
        </div>}
      </div>
  );
}

export default Navbar;