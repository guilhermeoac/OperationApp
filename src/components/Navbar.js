import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, UserActionTypes } from "../redux/userReducer";
import { setCookie } from 'react-use-cookie';
import { IoArrowBackSharp } from "react-icons/io5";
import ImageButton from "./ImageButton";
import { getUserByUsernameApi } from "../service/userService";
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { Errorhandler } from './../components/ErrorHandler';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userReducer);

  const { data } = useQuery(["balance", currentUser], async () => {
    return await getUserByUsernameApi();
  }, {
    onSettled: (data) => {
      if (!data.success && currentUser?.type === UserActionTypes.LOGIN) {
        Errorhandler(data, navigate, toast);
      }
    }
  });

  const handleLogout = () => {
    dispatch(logoutUser(UserActionTypes.LOGOUT));
    setCookie('userToken', null);
    setCookie('username', null);
    navigate("/");
  };

  return (
    <nav className="bg-black text-white shadow-md h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <ImageButton
          type="button"
          label="Back"
          img={<IoArrowBackSharp size={20} />}
          color="white"
          onClick={() => navigate(-1)}
        />
      </div>
      {currentUser?.payload && data?.data?.balance != null && (
        <h3 className="font-bold text-lg bg-white text-black px-4 py-2 rounded-lg shadow ring-2 ring-gray-200">
          Balance: {data?.data?.balance}
        </h3>
      )}
      {currentUser?.payload && (
        <div className="flex items-center">
          <ul className="flex space-x-6">
            {currentUser?.type === UserActionTypes.LOGIN && (
              <li>
                <button
                  className="text-white font-semibold hover:text-gray-300 transition-colors duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
