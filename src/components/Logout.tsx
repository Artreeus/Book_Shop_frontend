import React from 'react';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/features/auth/authSlice';

const Logout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    alert('Logged out successfully');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
