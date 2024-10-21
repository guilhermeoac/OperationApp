import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, UserActionTypes } from "../redux/userReducer";
import { setCookie } from 'react-use-cookie';
import { IoArrowBackSharp } from "react-icons/io5";
import ImageButton from "./ImageButton";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userReducer);

  return (
    <div className="flex justify-between items-center h-16 bg-black px-4 shadow-lg">
      <div className="flex items-center">
        <ImageButton type="button" label="Back" img={<IoArrowBackSharp />} color="white" onClick={() => navigate(-1)} />
      </div>
      {currentUser?.payload && (
        <div className="flex items-center">
          <ul className="flex items-center text-white space-x-4">
            {currentUser?.type === UserActionTypes.LOGIN && (
              <li>
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onClick={() => {
                    dispatch(logoutUser(UserActionTypes.LOGOUT));
                    setCookie('userToken', null);
                    setCookie('username', null);
                    navigate("/");
                  }}
                >
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
