import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, UserActionTypes } from '../../redux/userReducer';
import Navbar from '../Navbar';

import '@testing-library/jest-dom'
import { setCookie } from 'react-use-cookie';
import { IoArrowBackSharp } from 'react-icons/io5';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react-use-cookie', () => ({
  setCookie: jest.fn(),
}));

describe('Navbar Component', () => {
  const mockNavigate = jest.fn();
  const mockDispatch = jest.fn();
  
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Navbar component correctly', () => {
    useSelector.mockReturnValue({ currentUser: null });

    render(<Navbar />);
    
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('rounded-full bg-black-600 cursor-pointer fill-white h-8 w-8');
  });

  test('navigates back when back button is clicked', () => {
    useSelector.mockReturnValue({ currentUser: null });

    render(<Navbar />);
    const backButton = screen.getByRole('button');
    
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1); 
  });

  test('renders logout option when user is logged in', () => {
    useSelector.mockReturnValue({
      currentUser: {
        payload: {},
        type: UserActionTypes.LOGIN,
      },
    });

    render(<Navbar />);
    
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('logs out the user when Logout is clicked', () => {
    useSelector.mockReturnValue({
      currentUser: {
        payload: {},
        type: UserActionTypes.LOGIN,
      },
    });

    render(<Navbar />);
    const logoutButton = screen.getByText('Logout');

    fireEvent.click(logoutButton);

    expect(mockDispatch).toHaveBeenCalledWith(logoutUser(UserActionTypes.LOGOUT)); 
    expect(setCookie).toHaveBeenCalledWith('userToken', null);
    expect(setCookie).toHaveBeenCalledWith('username', null); 
    expect(mockNavigate).toHaveBeenCalledWith('/'); 
  });

  test('does not render logout option when user is not logged in', () => {
    useSelector.mockReturnValue({
      currentUser: {
        payload: null,
        type: UserActionTypes.LOGOUT,
      },
    });

    render(<Navbar />);
    
    expect(screen.queryByText('Logout')).toBeNull();
  });
});
